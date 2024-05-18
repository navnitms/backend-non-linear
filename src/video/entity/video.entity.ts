import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Segment } from './segment.entity';
import { Session } from '../../session/entity/session.entity';
import { AbstractEntity } from '../../common/models/abstract.entity';

@Entity()
export class Video extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Segment, (segment) => segment.video)
  segments: Segment[];

  @OneToMany(() => Session, (session) => session.video)
  sessions: Session[];
}
