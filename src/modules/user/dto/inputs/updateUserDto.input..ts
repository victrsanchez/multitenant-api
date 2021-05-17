import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CreateUserDto } from './createUser.input.dto';

@ObjectType()
@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) { }
