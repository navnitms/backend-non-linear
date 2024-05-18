import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test11716067251774 implements MigrationInterface {
  name = 'Test11716067251774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "choice" ("created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(0) WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying NOT NULL, CONSTRAINT "PK_5bf2e5939332f46711278a87fcd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "segment_choice" ("created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(0) WITH TIME ZONE, "segment_id" uuid NOT NULL, "choice_id" uuid NOT NULL, "next_segment_id" uuid, CONSTRAINT "PK_fa9a91d143f29634eae28b188aa" PRIMARY KEY ("segment_id", "choice_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "segment" ("created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(0) WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "segment_order" integer NOT NULL, "video_id" uuid, CONSTRAINT "PK_d648ac58d8e0532689dfb8ad7ef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(0) WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "video_id" uuid, "current_segment_id" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "video" ("created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(0) WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "interaction" ("created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(0) WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "segment_id" uuid, "choice_id" uuid, CONSTRAINT "PK_9204371ccb2c9dab5428b406413" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(0) WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_user_email" ON "user" ("email") WHERE "deleted_at" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "segment_choice" ADD CONSTRAINT "FK_ee596ff50da6e0d2892f9936ef2" FOREIGN KEY ("segment_id") REFERENCES "segment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "segment_choice" ADD CONSTRAINT "FK_295e725633d5aa58d3781e16254" FOREIGN KEY ("choice_id") REFERENCES "choice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "segment_choice" ADD CONSTRAINT "FK_464194a2afe1cb49f9c9b124ce7" FOREIGN KEY ("next_segment_id") REFERENCES "segment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "segment" ADD CONSTRAINT "FK_479fa49ed6088615d07ef93ccc4" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_565595bd2fd4c1bcf89bbfb9ef3" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_bdcd319b49930a4d2d3e1bf4902" FOREIGN KEY ("current_segment_id") REFERENCES "segment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "interaction" ADD CONSTRAINT "FK_c8eaac35e2ddd24e8b0a573c9a5" FOREIGN KEY ("segment_id") REFERENCES "segment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "interaction" ADD CONSTRAINT "FK_c08be896cc559634df647004228" FOREIGN KEY ("choice_id") REFERENCES "choice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "interaction" DROP CONSTRAINT "FK_c08be896cc559634df647004228"`,
    );
    await queryRunner.query(
      `ALTER TABLE "interaction" DROP CONSTRAINT "FK_c8eaac35e2ddd24e8b0a573c9a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_bdcd319b49930a4d2d3e1bf4902"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_565595bd2fd4c1bcf89bbfb9ef3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "segment" DROP CONSTRAINT "FK_479fa49ed6088615d07ef93ccc4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "segment_choice" DROP CONSTRAINT "FK_464194a2afe1cb49f9c9b124ce7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "segment_choice" DROP CONSTRAINT "FK_295e725633d5aa58d3781e16254"`,
    );
    await queryRunner.query(
      `ALTER TABLE "segment_choice" DROP CONSTRAINT "FK_ee596ff50da6e0d2892f9936ef2"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_user_email"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "interaction"`);
    await queryRunner.query(`DROP TABLE "video"`);
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "segment"`);
    await queryRunner.query(`DROP TABLE "segment_choice"`);
    await queryRunner.query(`DROP TABLE "choice"`);
  }
}
