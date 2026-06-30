import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1782497108064 implements MigrationInterface {
  name = 'InitMigration1782497108064';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "films" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" double precision NOT NULL, "director" character varying NOT NULL, "tags" text NOT NULL, "image" character varying NOT NULL, "cover" character varying NOT NULL, "title" character varying NOT NULL, "about" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "daytime" character varying NOT NULL, "hall" integer NOT NULL, "rows" integer NOT NULL, "seats" integer NOT NULL, "price" double precision NOT NULL, "taken" text NOT NULL, "filmId" uuid, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_1c2f5e637713a429f4854024a76" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_1c2f5e637713a429f4854024a76"`,
    );
    await queryRunner.query(`DROP TABLE "schedules"`);
    await queryRunner.query(`DROP TABLE "films"`);
  }
}
