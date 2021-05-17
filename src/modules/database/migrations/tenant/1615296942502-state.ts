import { MigrationInterface, QueryRunner } from 'typeorm';

export class state1615296942502 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`insert into state (id, name, "countryId") values (1, 'Santa fe', 1);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
