import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { GetUserByEmailDto } from './dto/inputs/getUserByEmail.input..dto';
import { GetUserDto } from './dto/responses/getUser.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../authentication/guards/gql-auth.guard';
import { UpdateUserDto } from './dto/inputs/updateUserDto.input.';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @UseGuards(GqlAuthGuard)
  @Query(() => [GetUserDto])
  async getUsers(): Promise<GetUserDto[]> {
    return await this.userService.getAllUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => GetUserDto)
  async updateUser(@Args('userId') id: number, @Args('input') data: UpdateUserDto): Promise<GetUserDto> {
    return await this.userService.updateUser(id, { ...data });
  }

  @Query(() => GetUserDto)
  async getUserByEmail(@Args('input') data: GetUserByEmailDto): Promise<GetUserDto> {
    return await this.userService.getUserByEmail(data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => GetUserDto)
  async getOneUser(@Args('userId') userId: number): Promise<GetUserDto> {
    return await this.userService.getOneUserById(userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async setRoleToUser(
    @Args('userId') userId: number,
    @Args('roleId', { nullable: true }) roleId: number
  ): Promise<string> {
    return await this.userService.setRoleToUser(userId, roleId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  getMe(@CurrentUser() user: { userId: number }) {
    return this.userService.getMe(user.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async deleteUserRole(
    @Args('userId') userId: number,
    @Args('roleId', { nullable: true }) roleId?: number
  ): Promise<string> {
    return await this.userService.deleteUserRole(userId, roleId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async setDeviceToken(
    @CurrentUser() user: { userId: number },
    @Args('deviceToken') deviceToken: string,
  ): Promise<boolean> {
    return await this.userService.setDeviceToken(user.userId, deviceToken);
  }
}
