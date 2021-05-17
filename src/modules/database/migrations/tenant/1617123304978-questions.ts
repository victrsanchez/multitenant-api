import { MigrationInterface, QueryRunner } from 'typeorm';
import { QuestionEnum } from 'src/modules/symptom/utils/questions.enum';

export class questions1617123304978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    {
      await queryRunner.query(
        `insert into question (id, name, type) values (1, '¿Desde cuando te ocurre?', ${QuestionEnum.WITH_OPTIONS})`
      );
      await queryRunner.query(
        `insert into question (id, name, type) values (2, '¿Cómo fue el inicio?', ${QuestionEnum.WITH_OPTIONS})`
      );
      await queryRunner.query(
        `insert into question (id, name, type) values (3, '¿Interfiere en tu día a día?', ${QuestionEnum.BOOLEAN})`
      );
      await queryRunner.query(
        `insert into question (id, name, type) values (4, '¿Realizaste algún tratamiento?', ${QuestionEnum.BOOLEAN})`
      );
      await queryRunner.query(
        `insert into question (id, name, type) values (5, '¿Te alivió?', ${QuestionEnum.BOOLEAN})`
      );
      await queryRunner.query(
        `insert into question (id, name, type) values (6, '¿Presentas algún otro síntoma?', ${QuestionEnum.TEXT})`
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
