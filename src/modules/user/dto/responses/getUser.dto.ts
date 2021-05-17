import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../entities/user.entity';

@ObjectType()
@Exclude()
export class GetUserDto implements Partial<User> {
  @IsNumber()
  @Expose()
  @Field()
  readonly id: number;

  @IsString()
  @Expose()
  @Field()
  readonly email: string;

  @IsString()
  @Expose()
  readonly password: string;
}
