import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployee1673253958195 implements MigrationInterface {
  name = 'CreateEmployee1673253958195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" SERIAL NOT NULL, "firstName" character varying(200) NOT NULL, "lastName" character varying(200) NOT NULL, "participation" integer NOT NULL, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "employee"`);
  }
}
