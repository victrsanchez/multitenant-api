import { MigrationInterface, QueryRunner } from "typeorm";

export class specialities1620231034945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`insert into specialty (name,image,description) values ('Odontología','https://res.cloudinary.com/djfwjbckj/image/upload/v1620231499/odontologia_t0oprx.png','Lorem Ipsum is simply dummy text of the printing and typesetting')`);
        await queryRunner.query(`insert into specialty (name,image,description) values ('Clínica','https://res.cloudinary.com/djfwjbckj/image/upload/v1620231499/clinica_jrm9na.png','industry Lorem Ipsum has been the industrys standard dummy')`);
        await queryRunner.query(`insert into specialty (name,image,description) values ('Ginecología','https://res.cloudinary.com/djfwjbckj/image/upload/v1620231500/ginecologia_rjfyps.png','text ever since the 1500s, when an unknown printer took a galley')`);
        await queryRunner.query(`insert into specialty (name,image,description) values ('Psicología','https://res.cloudinary.com/djfwjbckj/image/upload/v1620231499/psicologia_vmuzyg.png','type and scrambled it to make a type specimen book. It has survived not only five centuries')`);
        await queryRunner.query(`insert into specialty (name,image,description) values ('Pediatría','https://res.cloudinary.com/djfwjbckj/image/upload/v1620231500/pediatria_ltpuab.png','but also the leap into electronic typesetting, remaining essentially unchanged')`);
        await queryRunner.query(`insert into specialty (name,image,description) values ('Nutricionistas','https://res.cloudinary.com/djfwjbckj/image/upload/v1620231499/nutricionista_evqv0p.png','It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages')`);
        await queryRunner.query(`insert into specialty (name,image,description) values ('Cardiología','https://res.cloudinary.com/djfwjbckj/image/upload/v1620231499/odontologia_t0oprx.png','more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum')`);
        await queryRunner.query(`insert into specialty (name,image,description) values ('Oftalmología','https://res.cloudinary.com/djfwjbckj/image/upload/v1620231499/odontologia_t0oprx.png','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout')`);
        await queryRunner.query(`insert into specialty (name,image,description) values ('Urología','https://res.cloudinary.com/djfwjbckj/image/upload/v1620231499/odontologia_t0oprx.png','The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters')`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
