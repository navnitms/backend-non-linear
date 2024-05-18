import { MigrationInterface, QueryRunner } from 'typeorm';

export class DataDump1716072182943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO public."user"
(created_at, updated_at, deleted_at, id, "name", email, "password")
VALUES('2024-05-18 12:22:26.000', '2024-05-18 12:22:26.000', NULL, '39027000-01a8-47bb-bb72-4d6ebf13e6db'::uuid, 'test', 'test@gmail.com', '$2b$05$qVEe73dVWkKabjDv9ObTROIIu.0KPolH4O0bHZyzYqO7u3ekzCk7C')`);

    await queryRunner.query(`INSERT INTO public.video
(created_at, updated_at, deleted_at, id, title)
VALUES('2024-05-19 01:12:39.000', '2024-05-19 01:12:39.000', NULL, 'a9df0f66-4f67-4454-ada1-f0c33d9fad9a'::uuid, 'Firsst Video')`);

    await queryRunner.query(`INSERT INTO public.segment
(created_at, updated_at, deleted_at, id, url, segment_order, video_id)
VALUES('2024-05-19 01:25:19.000', '2024-05-19 01:25:19.000', NULL, '48b140b7-8aba-481e-b458-d0a38404910c'::uuid, 'https://www.youtube.com/watch?v=iinwIYt1IzM', 0, 'a9df0f66-4f67-4454-ada1-f0c33d9fad9a'::uuid)`);
    await queryRunner.query(`INSERT INTO public.segment
(created_at, updated_at, deleted_at, id, url, segment_order, video_id)
VALUES('2024-05-19 01:25:55.000', '2024-05-19 01:25:55.000', NULL, '34daf386-7d0b-450d-a9b5-faa6af063fd9'::uuid, 'https://www.youtube.com/watch?v=T94PHkuydcw&list=RDT94PHkuydcw&start_radio=1', 1, 'a9df0f66-4f67-4454-ada1-f0c33d9fad9a'::uuid)`);
    await queryRunner.query(`INSERT INTO public.segment
(created_at, updated_at, deleted_at, id, url, segment_order, video_id)
VALUES('2024-05-19 01:26:05.000', '2024-05-19 01:26:05.000', NULL, '6e7dc474-4d69-4e70-bce9-d22ee08f7d3b'::uuid, 'https://www.youtube.com/watch?v=W6-O00alJUo&list=RDW6-O00alJUo&start_radio=1', 1, 'a9df0f66-4f67-4454-ada1-f0c33d9fad9a'::uuid)`);
    await queryRunner.query(`INSERT INTO public.segment
(created_at, updated_at, deleted_at, id, url, segment_order, video_id)
VALUES('2024-05-19 01:26:17.000', '2024-05-19 01:26:17.000', NULL, 'b6fb17f8-9f60-4383-9d81-def077fdc109'::uuid, 'https://www.youtube.com/watch?v=NtCLiA2cUsY', 2, 'a9df0f66-4f67-4454-ada1-f0c33d9fad9a'::uuid)`);
    await queryRunner.query(`INSERT INTO public.segment
(created_at, updated_at, deleted_at, id, url, segment_order, video_id)
VALUES('2024-05-19 01:26:27.000', '2024-05-19 01:26:27.000', NULL, 'febc9d8f-b68f-4b14-a57f-9dc34611e654'::uuid, 'https://www.youtube.com/watch?v=Fd57NOavMWs&t=514s', 2, 'a9df0f66-4f67-4454-ada1-f0c33d9fad9a'::uuid)`);
    await queryRunner.query(`INSERT INTO public.segment
(created_at, updated_at, deleted_at, id, url, segment_order, video_id)
VALUES('2024-05-19 01:26:35.000', '2024-05-19 01:26:35.000', NULL, 'a7e2977a-c1b0-4d1f-9843-539ec31c94ab'::uuid, 'https://www.youtube.com/watch?v=zZasH6qkn8M&list=RDzZasH6qkn8M&start_radio=1', 2, 'a9df0f66-4f67-4454-ada1-f0c33d9fad9a'::uuid)`);
    await queryRunner.query(`INSERT INTO public.segment
(created_at, updated_at, deleted_at, id, url, segment_order, video_id)
VALUES('2024-05-19 01:26:43.000', '2024-05-19 01:26:43.000', NULL, '785b98dc-68bd-4c07-9a6d-16ef2869c3f2'::uuid, 'https://www.youtube.com/watch?v=_F8nyUjY-HA', 2, 'a9df0f66-4f67-4454-ada1-f0c33d9fad9a'::uuid)`);

    await queryRunner.query(`INSERT INTO public.choice
(created_at, updated_at, deleted_at, id, "label")
VALUES('2024-05-19 02:02:32.000', '2024-05-19 02:02:32.000', NULL, '1410edb8-f6ea-4927-9d2d-7c172e820411'::uuid, 'Choose Path A')`);
    await queryRunner.query(`INSERT INTO public.choice
(created_at, updated_at, deleted_at, id, "label")
VALUES('2024-05-19 02:03:40.000', '2024-05-19 02:03:40.000', NULL, '5f149bbf-7fda-4e9c-846a-799c2f186640'::uuid, 'Choose Path A')`);
    await queryRunner.query(`INSERT INTO public.choice
(created_at, updated_at, deleted_at, id, "label")
VALUES('2024-05-19 02:04:35.000', '2024-05-19 02:04:35.000', NULL, '862fdc5f-3c51-4bb5-b186-bc5fc81da00e'::uuid, 'Choose Path B')`);
    await queryRunner.query(`INSERT INTO public.choice
(created_at, updated_at, deleted_at, id, "label")
VALUES('2024-05-19 02:05:11.000', '2024-05-19 02:05:11.000', NULL, 'bc4421d1-4a85-48e9-98de-aa4948d64cd2'::uuid, 'Choose Path B')`);
    await queryRunner.query(`INSERT INTO public.choice
(created_at, updated_at, deleted_at, id, "label")
VALUES('2024-05-19 02:06:01.000', '2024-05-19 02:06:01.000', NULL, '9b0506b2-8563-473a-890d-aa69991ba35d'::uuid, 'Choose Path B')`);

    await queryRunner.query(`INSERT INTO public.segment_choice
(created_at, updated_at, deleted_at, segment_id, choice_id, next_segment_id)
VALUES('2024-05-19 02:02:32.000', '2024-05-19 02:02:32.000', NULL, '48b140b7-8aba-481e-b458-d0a38404910c'::uuid, '1410edb8-f6ea-4927-9d2d-7c172e820411'::uuid, '34daf386-7d0b-450d-a9b5-faa6af063fd9'::uuid)`);
    await queryRunner.query(`INSERT INTO public.segment_choice
(created_at, updated_at, deleted_at, segment_id, choice_id, next_segment_id)
VALUES('2024-05-19 02:03:40.000', '2024-05-19 02:03:40.000', NULL, '48b140b7-8aba-481e-b458-d0a38404910c'::uuid, '5f149bbf-7fda-4e9c-846a-799c2f186640'::uuid, '6e7dc474-4d69-4e70-bce9-d22ee08f7d3b'::uuid)`);
    await queryRunner.query(`INSERT INTO public.segment_choice
(created_at, updated_at, deleted_at, segment_id, choice_id, next_segment_id)
VALUES('2024-05-19 02:04:35.000', '2024-05-19 02:04:35.000', NULL, '34daf386-7d0b-450d-a9b5-faa6af063fd9'::uuid, '862fdc5f-3c51-4bb5-b186-bc5fc81da00e'::uuid, 'b6fb17f8-9f60-4383-9d81-def077fdc109'::uuid)`);
    await queryRunner.query(`INSERT INTO public.segment_choice
(created_at, updated_at, deleted_at, segment_id, choice_id, next_segment_id)
VALUES('2024-05-19 02:05:11.000', '2024-05-19 02:05:11.000', NULL, '34daf386-7d0b-450d-a9b5-faa6af063fd9'::uuid, 'bc4421d1-4a85-48e9-98de-aa4948d64cd2'::uuid, 'febc9d8f-b68f-4b14-a57f-9dc34611e654'::uuid)`);
    await queryRunner.query(`INSERT INTO public.segment_choice
(created_at, updated_at, deleted_at, segment_id, choice_id, next_segment_id)
VALUES('2024-05-19 02:06:01.000', '2024-05-19 02:06:01.000', NULL, '6e7dc474-4d69-4e70-bce9-d22ee08f7d3b'::uuid, '9b0506b2-8563-473a-890d-aa69991ba35d'::uuid, '785b98dc-68bd-4c07-9a6d-16ef2869c3f2'::uuid)`);
  }

  public async down(): Promise<void> {}
}
