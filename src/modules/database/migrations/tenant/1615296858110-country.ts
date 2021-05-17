import { MigrationInterface, QueryRunner } from 'typeorm';

export class country1615296858110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`insert into country (id, name) values (1, 'Argentina');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
