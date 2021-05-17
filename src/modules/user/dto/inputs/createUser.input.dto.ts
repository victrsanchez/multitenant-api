import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
@Exclude()
export class CreateUserDto {
  @IsString()
  @Expose()
  @Field()
  readonly email: string;

  @IsString()
  @Expose()
  @Field({ nullable: true })
  readonly password?: string;
}
