import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Exclude()
export class VerifyPasswordDto {

    @Field()
    @Expose()
    readonly userId: number;

    @Field()
    @Expose()
    readonly resetPasswordToken: string;
}
