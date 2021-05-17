//Native
import { Inject, Injectable, Scope } from '@nestjs/common';

//External libraries
import { plainToClass } from 'class-transformer';
import { Connection, Repository } from 'typeorm';

//Entities
import { User } from './entities/user.entity';

//External Modules
import { TENANT_CONNECTION } from '../tenancy/tenancy.provider';
import { GetUserDto } from './dto/responses/getUser.dto';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private readonly userRepository: Repository<User>;

  constructor(@Inject(TENANT_CONNECTION) connection: Connection) {
    this.userRepository = connection.getRepository(User);
  }

  async createUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.create({ email, password });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
