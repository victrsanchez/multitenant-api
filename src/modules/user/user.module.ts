import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { TenancyModule } from '../tenancy/tenancy.module';
import { RoleModule } from '../role/role.module';
@Module({
  imports: [TenancyModule, RoleModule],
  providers: [UserService, UserResolver],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
