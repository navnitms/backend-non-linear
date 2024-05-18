import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SessionService } from 'src/session/service/session.service';
import { DataSource, EntityManager } from 'typeorm';
import { Interaction } from '../entity/interaction.entity';
import { ChoiceService } from './choice.service';
import { CreateInteractionInput } from '../model/interaction.model';

@Injectable()
export class InteractionService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(SessionService)
    private readonly sessionService: SessionService,
    @Inject(ChoiceService)
    private readonly choiceService: ChoiceService,
  ) {}

  async processInteraction(
    createInteractionInput: CreateInteractionInput,
  ): Promise<Interaction> {
    return this.dataSource.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const interactionsRepository =
          transactionalEntityManager.getRepository(Interaction);
        const { sessionId, choiceId, userId } = createInteractionInput;
        const session = await this.sessionService.getSessionById(sessionId);

        if (!session) {
          throw new NotFoundException('Session Not Found');
        }

        const segment = session.currentSegment;
        const choice = await this.choiceService.findChoiceById(choiceId);

        if (!segment || !choice) {
          throw new NotFoundException();
        }

        // Log the interaction
        const interaction = interactionsRepository.create({
          userId,
          segment,
          choice,
        });
        await interactionsRepository.save(interaction);

        // Find the next segment based on the choice
        const segmentChoice = segment.segmentChoices.find(
          (sc) => sc.choiceId === choiceId,
        );
        if (segmentChoice && segmentChoice.nextSegment) {
          // Update the session with the next segment
          await this.sessionService.updateSession(
            sessionId,
            segmentChoice.nextSegment.id,
            transactionalEntityManager,
          );

          //   return segmentChoice.nextSegment;
          return interaction;
        } else {
          throw new NotFoundException();
        }
      },
    );
  }
}
