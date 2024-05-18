import { Body, Controller, Post } from '@nestjs/common';
import { ChoiceService } from '../service/choice.service';
import { Choice } from '../entity/choice.entity';
import { CreateChoiceInput } from '../model/segment.model';

@Controller('choice')
export class ChoiceController {
  constructor(private readonly choiceService: ChoiceService) {}

  @Post()
  async createChoice(
    @Body()
    createChoiceInput: CreateChoiceInput,
  ): Promise<Choice> {
    return this.choiceService.createChoiceWithSegmentChoices(createChoiceInput);
  }
}
