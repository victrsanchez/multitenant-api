import { MigrationInterface, QueryRunner } from 'typeorm';
import { PracticeEnum } from '../../../practice/enums/practice.enum';

export class practice1618409154472 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into practice (id, name, code, price, description) values (${PracticeEnum.ONLINE_CONSULTATION}, 'Consulta online' , '420198', 800, 'Consulta online para telemedicina')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
