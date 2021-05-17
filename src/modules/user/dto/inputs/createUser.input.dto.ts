import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '../../../role/entities/role.entity';
import { Patient } from '../../../patient/entities/patient.entity';
import { Doctor } from '../../../doctor/entities/doctor.entity';

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

  @Expose()
  @Field(() => Int, { nullable: true })
  readonly patient?: Patient;

  @Expose()
  @Field(() => Int, { nullable: true })
  readonly doctor?: Doctor;

  @IsString()
  @Expose()
  @Field({ nullable: true })
  readonly verificationCode?: string;

  @IsString()
  @Expose()
  @Field({ nullable: true })
  readonly resetPasswordToken?: string;

  @Expose()
  @Field({ nullable: true })
  readonly verificationCodeExpires?: Date;

  @Expose()
  @Field({ nullable: true })
  readonly lastSmsCodeSent?: Date;

  @Expose()
  @Field({ nullable: true })
  readonly phone?: string;

  @Expose()
  @Field({ nullable: true })
  readonly codeAreaPhone?: string;

  @IsBoolean()
  @Expose()
  @Field({ nullable: true })
  readonly isConfirmed?: boolean;

  @IsBoolean()
  @Expose()
  @Field({ nullable: true })
  readonly smsTries?: number;

  @Expose()
  @Field(() => [Int], { nullable: true })
  readonly roles?: Role[];
}
