import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '../../../role/entities/role.entity';
import { Patient } from '../../../patient/entities/patient.entity';
import { Doctor } from '../../../doctor/entities/doctor.entity';
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
  readonly password?: string;

  @Expose()
  @Field(() => Doctor, { nullable: true })
  readonly doctor?: Doctor;

  @Expose()
  @Field(() => Patient, { nullable: true })
  readonly patient?: Patient;

  @IsString()
  @Expose()
  readonly phone?: string;

  @IsString()
  @Expose()
  readonly codeAreaPhone?: string;

  @IsString()
  @Expose()
  readonly lastSmsCodeSent?: Date;

  @IsBoolean()
  @Expose()
  @Field({ nullable: true })
  readonly isConfirmed?: boolean;

  @Expose()
  @Field(() => [Role])
  readonly roles?: Role[];
}
