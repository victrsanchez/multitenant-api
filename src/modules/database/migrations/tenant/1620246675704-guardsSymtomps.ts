import { MigrationInterface, QueryRunner } from "typeorm";

export class guardsSymtomps1620246675704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const guards = await queryRunner.query('SELECT * FROM guard');
        const symptoms = await queryRunner.query('SELECT * FROM symptom');

        guards.forEach(guard => {
            symptoms.forEach(symptom => {
                let query = `INSERT INTO guards_symptoms ("guardId", "symptomId") VALUES (${guard.id},${symptom.id});`;
                this.insertInTo(queryRunner, query);
            });
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    public async insertInTo(queryRunner: QueryRunner, query: string) {
        await queryRunner.query(query);
    }

}
