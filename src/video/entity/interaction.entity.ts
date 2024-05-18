import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Segment } from './segment.entity';
import { Choice } from './choice.entity';
import { AbstractEntity } from '../../common/models/abstract.entity';

@Entity()
export class Interaction extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => Segment)
  segment: Segment;

  @ManyToOne(() => Choice)
  choice: Choice;
}
