import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TenancyModule } from '../tenancy/tenancy.module';
import { TwilioModule } from '../twilio/twilio.module';
import { RoleModule } from '../role/role.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET_KEY')
      })
    }),
    TwilioModule,
    UserModule,
    PassportModule,
    TenancyModule,
    RoleModule,
    EmailModule
  ],
  providers: [AuthenticationService, AuthenticationResolver, JwtStrategy],
  exports: [AuthenticationService, JwtModule]
})
export class AuthenticationModule {}
