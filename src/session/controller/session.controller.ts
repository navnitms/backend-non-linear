import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SessionService } from '../service/session.service';
import { Session } from '../entity/session.entity';
import { CreateSessionInput } from '../model/session.model';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async createSession(
    @Body() createSessionInput: CreateSessionInput,
  ): Promise<Session> {
    return this.sessionService.createSession(
      createSessionInput.userId,
      createSessionInput.videoId,
      createSessionInput.segmentId,
    );
  }

  @Get(':id')
  async getSession(@Param('id') id: string): Promise<Session> {
    return this.sessionService.getSessionById(id);
  }
}
