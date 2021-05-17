import { Exclude, Expose } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
@Exclude()
export class SetPasswordInputDto {
  @IsString()
  @Expose()
  @Field()
  readonly email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Expose()
  @Field()
  readonly password: string;
}
