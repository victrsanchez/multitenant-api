import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Exclude()
export class SetPasswordResponseDto {

  @Field()
  @Expose()
  readonly success: boolean;

  @Field()
  @Expose()
  readonly userId: number;
}
