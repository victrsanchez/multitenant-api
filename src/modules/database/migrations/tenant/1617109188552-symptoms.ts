import { MigrationInterface, QueryRunner } from "typeorm";

export class symptoms1617109188552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (1,'Cefalea',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/dolor-de-cabeza_yuc5i1.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (2,'Dolor Abdominal/Diarrea',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/diarrea_sf7u3s.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (3,'Dolor de garganta',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155919/dolor-de-garganta_xck8qz.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (4,'Estado Gripal',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/estado-gripal_wtyefo.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (5,'Osteomialgias',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/dolor-de-cuerpo_e6n9jl.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (6,'Fiebre',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/fiebre_n1wnos.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (7,'Otalgia',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/dolor-de-oido_tdwl3f.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (8,'Tos',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/tos_rhf0is.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (9,'Vomitos',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/vomitos_xs4xw5.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (10,'Erupción cutanea',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/erupcion-cutanea_vcby4a.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (11,'Dolor en columna',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/dolor-de-columna_xtaoxt.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (12,'Dolor Rodilla',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/dolor-de-rodilla_yudgak.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (13,'Dolor tobillo',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/dolor-de-tobillo_at4hvo.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (14,'Dolor Hombro',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/dolor-de-hombro_lpmmlu.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (15,'Dolor en Manos y Muñecas',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/dolor-de-manos_yfrssv.png')`);
        await queryRunner.query(`insert into symptom (id,name,"isFrequent",image) values (16,'Dolor en Caderas',true,'https://res.cloudinary.com/djfwjbckj/image/upload/v1617155918/dolor-de-caderas_l880hd.png')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
