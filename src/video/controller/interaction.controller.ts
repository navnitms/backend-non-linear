import { Controller, Post, Body } from '@nestjs/common';
import { Interaction } from '../entity/interaction.entity';
import { InteractionService } from '../service/interaction.service';
import { CreateInteractionInput } from '../model/interaction.model';

@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @Post()
  async createInteraction(
    @Body() createInteractionInput: CreateInteractionInput,
  ): Promise<Interaction> {
    return this.interactionService.processInteraction(createInteractionInput);
  }
}
