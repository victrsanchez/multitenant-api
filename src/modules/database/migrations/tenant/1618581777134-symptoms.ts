import { MigrationInterface, QueryRunner } from "typeorm";

export class symptoms1618581777134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (17,'Otros',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/dolor-de-cabeza_yuc5i1.png')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
