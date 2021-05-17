import { Args, Query, Mutation } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { GetUserDto } from '../user/dto';
import { LoginResponseDto } from './dto/responses/login.response.dto';
import { AuthenticationService } from './authentication.service';
import { LoginInputDto } from './dto/inputs/login.input.dto';
import { GetUserByEmailDto } from '../user/dto/inputs/getUserByEmail.input..dto';
import { UserService } from '../user/user.service';
import { RegisterInputDto } from './dto/inputs/register.input.dto';
import { SetPasswordInputDto } from './dto/inputs/setPassword.input.dto';
import { ResetPasswordInputDto } from './dto/inputs/resetPassword.input';
import { VerifySmsInput } from './dto/inputs/verifySms.input.dto';
import { SetPasswordResponseDto } from './dto/responses/setPassword.response.dto';
import { SendSmsOptsDto } from './dto/inputs/sendSmsOpts.input.dto';
import { VerifyPasswordDto } from './dto/responses/verifyPassword.response.dto';

@Resolver()
export class AuthenticationResolver {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService
  ) { }

  @Mutation(() => GetUserDto, { nullable: true })
  async register(@Args('input') data: RegisterInputDto): Promise<GetUserDto> {
    return this.authenticationService.register(data);
  }

  @Mutation(() => LoginResponseDto)
  async login(@Args('input') credentials: LoginInputDto): Promise<LoginResponseDto> {
    return this.authenticationService.login(credentials);
  }

  @Mutation(() => SetPasswordResponseDto, { nullable: true })
  async setPasswordToUser(@Args('input') data: SetPasswordInputDto): Promise<SetPasswordResponseDto> {
    return this.authenticationService.setPasswordToUser(data);
  }

  @Mutation(() => SetPasswordResponseDto, { nullable: true })
  async resetPassword(@Args('input') data: ResetPasswordInputDto): Promise<SetPasswordResponseDto> {
    return this.authenticationService.resetPassword(data);
  }

  @Mutation(() => Boolean)
  async verifyAccount(@Args('input') input: VerifySmsInput) {
    return await this.authenticationService.verifyAccount(input);
  }

  @Mutation(() => VerifyPasswordDto)
  async verifyPasswordReset(@Args('input') input: VerifySmsInput) {
    return await this.authenticationService.verifyPasswordReset(input);
  }

  @Query(() => Boolean)
  async resendVerificationCode(
    @Args('input') data: GetUserByEmailDto,
    @Args('type') opts: SendSmsOptsDto,
  ): Promise<Boolean> {
    const user = await this.userService.getUserByEmail({ email: data.email });
    await this.authenticationService.resendVerificationCode(user, opts);
    return true;
  }
}
