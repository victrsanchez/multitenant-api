//Native
import { Inject, Injectable, Scope } from '@nestjs/common';

//External libraries
import { plainToClass } from 'class-transformer';
import { Connection, Repository } from 'typeorm';

//Entities
import { User } from './entities/user.entity';

//External Modules
import { TENANT_CONNECTION } from '../tenancy/tenancy.provider';
import { RoleService } from '../role/role.service';
import { RoleEnum } from '../role/utils/enums/role.enum';

//Dtos
import { CreateUserDto } from './dto/inputs/createUser.input.dto';
import { GetUserByEmailDto } from './dto/inputs/getUserByEmail.input..dto';
import { UpdateUserDto } from './dto/inputs/updateUserDto.input.';
import { GetUserDto } from './dto/responses/getUser.dto';

//Errors
import { UserDoesNotExistError, UserMustHaveRoleError } from './errors';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private readonly userRepository: Repository<User>;

  constructor(@Inject(TENANT_CONNECTION) connection: Connection, private roleService: RoleService) {
    this.userRepository = connection.getRepository(User);
  }

  async getAllUsers(): Promise<GetUserDto[]> {
    try {
      const users = await this.userRepository.find({ active: true });
      return users.map((user) => plainToClass(GetUserDto, user));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(user: CreateUserDto): Promise<GetUserDto> {
    try {
      const createdUser = await this.userRepository.save({ ...user });
      await this.setRoleToUser(createdUser.id);
      return plainToClass(User, createdUser);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserByEmail(data: GetUserByEmailDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email: data.email, active: true } });
      if (!user) throw new UserDoesNotExistError();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async isEmailAvailable(data: GetUserByEmailDto): Promise<Boolean> {
    try {
      const userExists = await this.userRepository.findOne({ where: { email: data.email, active: true } });
      return userExists ? true : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //TODO Refactor. 2 calls get + update
  async updateUser(id: number, data: UpdateUserDto): Promise<GetUserDto> {
    try {
      const userExist = await this.userRepository.findOne({ id, active: true });
      if (!userExist) throw new Error('This user does not exist');
      await this.userRepository.update(id, data);
      const user = await this.userRepository.findOne(id);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async setRoleToUser(userId: number, roleId?: number): Promise<string> {
    try {
      if (!roleId) roleId = RoleEnum.PATIENT;
      const user = await this.userRepository.findOne(userId, {
        where: { active: true }
      });
      if (!user) throw new UserDoesNotExistError();
      const role = await this.roleService.getRoleById(roleId);
      user.roles.push(role);
      await this.userRepository.save(user);
      return 'Role set';
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getOneUserById(userId: number): Promise<GetUserDto> {
    try {
      const user = await this.userRepository.findOne(userId);
      if (!user) throw new UserDoesNotExistError();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getMe(userId: number): Promise<User> {
    try {
      const currentUser = await this.userRepository.findOne(userId)
      return currentUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUserRole(userId: number, roleId?: number): Promise<string> {
    try {
      const user = await this.userRepository.findOne(userId, {
        where: { active: true }
      });
      if (!user) throw new UserDoesNotExistError();
      if (user.roles.length == 1) throw new UserMustHaveRoleError();
      const roleToRemove = await this.roleService.getRoleById(roleId);
      user.roles = user.roles.filter((rol) => rol.id !== roleToRemove.id);
      await this.userRepository.save(user);
      return 'Role deleted for user';
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateDeviceToken(userId: number, deviceToken: string): Promise<Boolean> {
    try {
      const user = await this.userRepository.findOne(userId);
      if (!user) throw new UserDoesNotExistError();
      await this.userRepository.update(user.id, { deviceToken });
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async setDeviceToken(userId: number, deviceToken: string): Promise<boolean> {
    try {
      await this.userRepository.update(userId, { deviceToken })
      return true;
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
