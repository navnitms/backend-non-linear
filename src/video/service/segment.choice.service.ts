import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { SegmentChoice } from '../entity/segement.choice.entity';

@Injectable()
export class SegmentChoiceService {
  constructor(private readonly dataSource: DataSource) {}

  async createSegmentChoice(
    segmentId: string,
    choiceId: string,
    nextSegmentId: string,
    em?: EntityManager,
  ): Promise<SegmentChoice> {
    const segmentChoiceRepo = em
      ? em.getRepository(SegmentChoice)
      : this.dataSource.getRepository(SegmentChoice);

    const segmentChoice = segmentChoiceRepo.create({
      segment: { id: segmentId },
      choice: { id: choiceId },
      nextSegment: { id: nextSegmentId },
    });
    return segmentChoiceRepo.save(segmentChoice);
  }

  async deleteSegmentChoice(
    segmentId: string,
    choiceId: string,
  ): Promise<void> {
    const segmentChoiceRepo = this.dataSource.getRepository(SegmentChoice);
    await segmentChoiceRepo.softDelete({
      segmentId: segmentId,
      choiceId: choiceId,
    });
  }
}
