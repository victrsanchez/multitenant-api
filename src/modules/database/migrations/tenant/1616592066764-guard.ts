import { MigrationInterface, QueryRunner } from 'typeorm';

export class guard1616592066764 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`insert into guard (name) values ('clínica');`);
    await queryRunner.query(`insert into guard (name) values ('pediátrica');`);
    await queryRunner.query(`insert into guard (name) values ('traumatológica');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
