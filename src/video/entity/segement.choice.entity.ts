import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Choice } from './choice.entity';
import { Segment } from './segment.entity';
import { AbstractEntity } from '../../common/models/abstract.entity';

@Entity()
export class SegmentChoice extends AbstractEntity {
  @PrimaryColumn()
  segmentId!: string;

  @PrimaryColumn()
  choiceId!: string;

  @ManyToOne(() => Segment, (segment) => segment.segmentChoices)
  segment: Segment;

  @ManyToOne(() => Choice, (choice) => choice.segmentChoices)
  choice: Choice;

  @ManyToOne(() => Segment)
  nextSegment: Segment;
}
