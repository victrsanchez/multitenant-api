import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '../../role/entities/role.entity';
import { Patient } from '../../patient/entities/patient.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  codeAreaPhone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: false })
  isConfirmed?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  verificationCode: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  resetPasswordToken: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  verificationCodeExpires: Date;

  @Field({ nullable: true, defaultValue: new Date() })
  @Column({ nullable: true })
  lastSmsCodeSent: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  deviceToken?: string;

  @Field(() => [Role], { nullable: true })
  @ManyToMany(() => Role, (role) => role.users, { eager: true, nullable: true })
  @JoinTable({ name: 'user_roles' })
  roles?: Role[];

  @Field()
  @Column({ default: true })
  active: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 0 })
  smsTries: number;

  @Field(() => Doctor, { nullable: true })
  @OneToOne(() => Doctor, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  doctor?: Doctor;

  @Field(() => Patient, { nullable: true })
  @OneToOne(() => Patient, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  patient?: Patient;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
