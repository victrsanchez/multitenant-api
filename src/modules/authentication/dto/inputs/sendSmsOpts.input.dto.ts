import { Exclude, Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum SmsTypeEnum {
    AccountVerification = 'ACCOUNT_VERIFICATION',
    PasswordReset = 'PASSWORD_RESET',
}

registerEnumType(SmsTypeEnum, {
    name: 'Type'
});

@InputType()
@Exclude()
export class SendSmsOptsDto {

    @Expose()
    @Field(() => SmsTypeEnum)
    readonly type: SmsTypeEnum;
}


