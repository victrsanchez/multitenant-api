import { MigrationInterface, QueryRunner } from 'typeorm';

export class firstTenant1613587374208 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const name = process.env.DB_TENANT_NAME;
    const host = process.env.DB_TENANT_HOST;
    const port = process.env.DB_TENANT_PORT;
    const username = process.env.DB_TENANT_USER;
    const password = process.env.DB_TENANT_PASSWORD;
    const description = process.env.DB_TENANT_DESCRIPTION;
    const type = process.env.DB_TENANT_TYPE;

    await queryRunner.query(
      `insert into tenant (name, host, port, username, password, description, type) values ('${name}', '${host}', '${port}', '${username}', '${password}', '${description}', '${type}');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
