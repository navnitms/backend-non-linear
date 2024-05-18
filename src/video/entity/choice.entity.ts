import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SegmentChoice } from './segement.choice.entity';
import { AbstractEntity } from '../../common/models/abstract.entity';

@Entity()
export class Choice extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  label: string;

  @OneToMany(() => SegmentChoice, (segmentChoice) => segmentChoice.choice)
  segmentChoices: SegmentChoice[];
}
