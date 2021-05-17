import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
@Exclude()
export class RegisterInputDto {
  @Field()
  @IsString()
  @Expose()
  readonly email: string;

  @Field()
  @Expose()
  readonly phone: string;

  @Field({ nullable: true })
  @Expose()
  readonly deviceToken: string;

  @Field()
  @Expose()
  readonly codeAreaPhone: string;
}
