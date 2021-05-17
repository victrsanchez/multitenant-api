import { MigrationInterface, QueryRunner } from 'typeorm';

export class city1615297276466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`insert into city (id, name, "stateId") values (1, 'Rosario', 1);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
