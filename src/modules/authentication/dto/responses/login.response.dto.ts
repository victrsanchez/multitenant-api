import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { GetUserDto } from 'src/modules/user/dto';

@ObjectType()
@Exclude()
export class LoginResponseDto {
  @Field()
  @IsString()
  @Expose()
  readonly jwtToken: string;

  @Field()
  @Expose()
  readonly user: GetUserDto;
}
