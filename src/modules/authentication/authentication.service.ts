// Nest native
import { Injectable } from '@nestjs/common';

// External libraries
import { compareSync, hash } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

// External Modules
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TwilioService } from '../twilio/twilio.service';
import { ConfigService } from 'nestjs-dotenv';
import { EmailService } from '../email/email.service';
import { RoleEnum } from '../role/utils/enums/role.enum';
import { RoleService } from '../role/role.service';
import { User } from '../user/entities/user.entity';

// Dtos
import { LoginInputDto } from './dto/inputs/login.input.dto';
import { GetUserDto } from '../user/dto';
import { SendVerificationCodeSMS } from '../twilio/dto/sendVerificationCodeDto';
import { RegisterInputDto } from './dto/inputs/register.input.dto';
import { LoginResponseDto } from './dto/responses/login.response.dto';
import { SetPasswordInputDto } from './dto/inputs/setPassword.input.dto';
import { SetPasswordResponseDto } from './dto/responses/setPassword.response.dto';
import { VerifySmsInput } from './dto/inputs/verifySms.input.dto';
import { ResetPasswordInputDto } from './dto/inputs/resetPassword.input';
import { SendSmsOptsDto, SmsTypeEnum } from './dto/inputs/sendSmsOpts.input.dto';

// Errors
import {
  ExistingPasswordError,
  UserAlreadyExistsError,
  IncorrectCodeError,
  InvalidPasswordError,
  UserNotConfirmedError,
  MaxNumAttemptsExceededError,
  SmsExpiredError,
  MustWaitBeforeResendError,
  AccountAlreadyVerifiedError,
  InvalidSmsTypeError,
  PasswordIsNotSetError
} from './errors';
import { VerifyPasswordDto } from './dto/responses/verifyPassword.response.dto';


@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private jwtService: JwtService,
    private twilioService: TwilioService,
    private configService: ConfigService,
    private emailService: EmailService
  ) { }

  private async verifySmsCode(user: User, verificationCode: string): Promise<void> {
    const expirationDate = new Date(user.verificationCodeExpires);
    if (expirationDate < new Date()) throw new SmsExpiredError();
    if (user.smsTries >= parseInt(this.configService.get('MAX_NUMBER_ATTEMPTS')))
      throw new MaxNumAttemptsExceededError();
    if (user.verificationCode !== verificationCode) {
      await this.userService.updateUser(user.id, { smsTries: user.smsTries + 1 });
      throw new IncorrectCodeError();
    }
  }

  private generateToken(user: any): string {
    const payload = { email: user.email, userId: user.id, roles: user.roles.map((r) => r.name) };
    return this.jwtService.sign(payload);
  }

  // Move to utils folder
  private getTimeBeforeResend(minutes: number) {
    return minutes * 60 * 1000;
  }

  // Handle Error when there is not password in user
  async login(data: LoginInputDto): Promise<LoginResponseDto> {
    const { email, password } = data;
    const user = await this.validateUser(email, password);
    const token = this.generateToken(user);
    return {
      jwtToken: token,
      user: user
    };
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.getUserByEmail({ email });
      if (!user.password) throw new PasswordIsNotSetError();
      const validPassword = compareSync(password, user.password);
      if (!validPassword) throw new InvalidPasswordError();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async register(data: RegisterInputDto): Promise<GetUserDto> {
    try {
      const { email, codeAreaPhone, phone } = data;
      const userExists = await this.userService.isEmailAvailable({ email });
      if (userExists) throw new UserAlreadyExistsError();
      const foundRole = await this.roleService.getRoleById(RoleEnum.PATIENT);
      const roles = [];
      roles.push(foundRole);

      const dataSms: SendVerificationCodeSMS = {
        from: this.configService.get('SMS_FROM'),
        to: this.configService.get('SMS_AREA_CODE') + codeAreaPhone + phone
      };

      const opts: SendSmsOptsDto = {
        type: SmsTypeEnum.AccountVerification
      };

      const metaData = await this.twilioService.sendVerificationCodeSMS(dataSms, opts);

      const verificationCode = metaData.codeNumber;
      const date = new Date(metaData.dateCreated);
      const verificationCodeExpires = new Date(
        date.setHours(date.getHours() + parseInt(this.configService.get('SMS_EXPIRES_IN_HOURS')))
      );
      const lastSmsCodeSent = new Date();

      const createdUser = await this.userService.createUser({
        ...data,
        verificationCode,
        roles,
        verificationCodeExpires,
        lastSmsCodeSent
      });
      return plainToClass(GetUserDto, createdUser);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async verifyAccount(input: VerifySmsInput) {
    const { email, verificationCode } = input;
    const foundUser = await this.userService.getUserByEmail({ email: email });
    if (foundUser.isConfirmed) throw new AccountAlreadyVerifiedError();
    await this.verifySmsCode(foundUser, verificationCode);
    await this.userService.updateUser(foundUser.id, { verificationCode: null, isConfirmed: true, smsTries: 0 });
    return true;
  }

  async verifyPasswordReset(input: VerifySmsInput): Promise<VerifyPasswordDto> {
    try {
      const { email, verificationCode } = input;
      const foundUser = await this.userService.getUserByEmail({ email: email });
      await this.verifySmsCode(foundUser, verificationCode);
      const tokenUuid = uuidv4();
      await this.userService.updateUser(foundUser.id, { verificationCode: null, smsTries: 0, resetPasswordToken: tokenUuid });
      return { userId: foundUser.id, resetPasswordToken: tokenUuid };
    } catch (e) {
      throw new Error(e.message);
    }
  };

  async resendVerificationCode(user: GetUserDto, opts: SendSmsOptsDto) {
    if (
      !Object.values(SmsTypeEnum).includes(SmsTypeEnum.AccountVerification) ||
      !Object.values(SmsTypeEnum).includes(SmsTypeEnum.AccountVerification)
    )
      throw new InvalidSmsTypeError();

    const data: SendVerificationCodeSMS = {
      from: this.configService.get('SMS_FROM'),
      to: this.configService.get('SMS_AREA_CODE') + user.codeAreaPhone + user.phone
    };

    const lastSmsSentDate = new Date(user.lastSmsCodeSent).getTime();
    const currentDate = new Date().getTime();
    const secondsBeforReSend = this.getTimeBeforeResend(parseInt(this.configService.get('SMS_MINUTES_BEFORE_RESEND')));

    if (currentDate - lastSmsSentDate < secondsBeforReSend) throw new MustWaitBeforeResendError();

    const metaData = await this.twilioService.sendVerificationCodeSMS(data, opts);

    const verificationCode = metaData.codeNumber;
    const date = new Date(metaData.dateCreated);
    const expirationDate = new Date(
      date.setHours(date.getHours() + parseInt(this.configService.get('SMS_EXPIRES_IN_HOURS')))
    );
    const lastSmsCodeSent = new Date();

    return await this.userService.updateUser(user.id, {
      verificationCode,
      smsTries: 0,
      verificationCodeExpires: expirationDate,
      lastSmsCodeSent
    });
  }

  async setPasswordToUser(data: SetPasswordInputDto): Promise<SetPasswordResponseDto> {
    try {
      const { email, password } = data;
      const user = await this.userService.getUserByEmail({ email });
      if (!user.isConfirmed) throw new UserNotConfirmedError();
      if (user.password) throw new ExistingPasswordError();
      const hashedPassword = await hash(password, 12);
      await this.userService.updateUser(user.id, { password: hashedPassword });
      await this.emailService.sendWelcome(user.email);
      return { success: true, userId: user.id };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async resetPassword(input: ResetPasswordInputDto): Promise<SetPasswordResponseDto> {
    try {
      const { email, password, resetPasswordToken } = input;
      const foundUser = await this.userService.getUserByEmail({ email: email });
      if (!foundUser.isConfirmed) throw new UserNotConfirmedError();
      if (foundUser.resetPasswordToken !== resetPasswordToken) throw new IncorrectCodeError();
      const hashedPassword = await hash(password, 12);
      await this.userService.updateUser(foundUser.id, { password: hashedPassword, resetPasswordToken: null });
      return { success: true, userId: foundUser.id };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
