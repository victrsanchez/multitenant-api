import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/responses/getUser.dto';


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [GetUserDto])
  async getUsers(): Promise<GetUserDto[]> {
    return await this.userService.getAllUsers();
  }


  @Mutation(() => GetUserDto)
  async createUser(@Args('email') email: string, @Args('password') password: string): Promise<GetUserDto> {
    return this.userService.createUser(email, password);
  }

}
