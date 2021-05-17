import { MigrationInterface, QueryRunner } from 'typeorm';
import { RoleEnum } from 'src/modules/role/utils/enums/role.enum';

export class roles1614695109908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into role (id, name, description) values (${RoleEnum.ADMIN}, 'admin', 'admin role');`
    );
    await queryRunner.query(
      `insert into role (id, name, description) values (${RoleEnum.DOCTOR}, 'doctor', 'doctor role');`
    );
    await queryRunner.query(
      `insert into role (id, name, description) values (${RoleEnum.PATIENT}, 'patient', 'patient role');`
    );
    await queryRunner.query(
      `insert into role (id, name, description) values (${RoleEnum.SUPERADMIN}, 'superadmin', 'super admin role');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
