import { AbstractEntity } from '../../common/models/abstract.entity';
import { Segment } from '../../video/entity/segment.entity';
import { Video } from '../../video/entity/video.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Session extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => Video, (video) => video.sessions)
  video: Video;

  @ManyToOne(() => Segment)
  currentSegment: Segment;
}
