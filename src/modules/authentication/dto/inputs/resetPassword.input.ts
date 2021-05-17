import { Exclude, Expose } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
@Exclude()
export class ResetPasswordInputDto {
    @IsString()
    @Expose()
    @Field()
    readonly email: string;

    @IsString()
    @MinLength(8)
    @Expose()
    @Field()
    readonly password: string;

    @Field()
    @IsString()
    @Expose()
    readonly resetPasswordToken: string;
}
