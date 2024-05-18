import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Video } from './video.entity';
import { SegmentChoice } from './segement.choice.entity';
import { AbstractEntity } from '../../common/models/abstract.entity';

@Entity()
export class Segment extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Video, (video) => video.segments)
  video: Video;

  @Column()
  url: string;

  @Column()
  segmentOrder: number;

  @OneToMany(() => SegmentChoice, (segmentChoice) => segmentChoice.segment)
  segmentChoices: SegmentChoice[];
}
