import { Inject, Injectable } from '@nestjs/common';
import { Choice } from '../entity/choice.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CreateChoiceInput } from '../model/segment.model';
import { SegmentService } from './segment.service';
import { SegmentChoiceService } from './segment.choice.service';

@Injectable()
export class ChoiceService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(SegmentService)
    private readonly segmentService: SegmentService,
    @Inject(SegmentChoiceService)
    private readonly segmentChoiceService: SegmentChoiceService,
  ) {}

  async findChoiceById(choiceId: string): Promise<Choice> {
    const choiceRepo = this.dataSource.getRepository(Choice);
    return choiceRepo.findOneBy({ id: choiceId });
  }

  async createChoiceWithSegmentChoices(
    createChoiceInput: CreateChoiceInput,
  ): Promise<Choice> {
    return this.dataSource.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const choiceRepo = transactionalEntityManager.getRepository(Choice);
        const { label, segmentId, segmentChoices } = createChoiceInput;

        const segment = await this.segmentService.getSegmentById(
          segmentId,
          transactionalEntityManager,
        );

        const choice = choiceRepo.create({
          label,
        });
        const savedChoice = await choiceRepo.save(choice);

        for (const segmentChoice of segmentChoices) {
          await this.segmentChoiceService.createSegmentChoice(
            segment.id,
            savedChoice.id,
            segmentChoice.nextSegmentId,
            transactionalEntityManager,
          );
        }

        return savedChoice;
      },
    );
  }
}
