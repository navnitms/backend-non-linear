import { Inject, Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';
import { Session } from '../entity/session.entity';
import { v4 } from 'uuid';
import { VideoService } from 'src/video/service/video.service';
import { SegmentService } from 'src/video/service/segment.service';

@Injectable()
export class SessionService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(VideoService)
    private readonly videoService: VideoService,
    @Inject(SegmentService)
    private readonly segmentService: SegmentService,
  ) {}

  // Improve: take segmentId from segmentOrder 0
  async createSession(
    userId: string,
    videoId: string,
    segmentId: string,
  ): Promise<Session> {
    const savedSession = await this.dataSource.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const sessionsRepository =
          transactionalEntityManager.getRepository(Session);
        const video = await this.videoService.getVideoById(
          videoId,
          transactionalEntityManager,
        );

        const segment = await this.segmentService.getSegmentById(
          segmentId,
          transactionalEntityManager,
        );

        const newSession: DeepPartial<Session> = {
          id: v4(),
          userId: userId,
          video: video,
          currentSegment: segment,
        };

        return sessionsRepository.save(newSession);
      },
    );
    return savedSession;
  }

  async deleteSession(sessionId: string): Promise<void> {
    const sessionsRepository = this.dataSource.getRepository(Session);
    await sessionsRepository.softDelete(sessionId);
  }

  async getSessionById(id: string): Promise<Session | undefined> {
    const session = await this.dataSource.getRepository(Session).findOne({
      where: { id },
      relations: [
        'currentSegment',
        'currentSegment.segmentChoices',
        'currentSegment.segmentChoices.nextSegment',
      ],
    });
    return session;
  }
  async updateSession(
    sessionId: string,
    nextSegmentId: string,
    em?: EntityManager,
  ): Promise<Session> {
    const sessionsRepository = em
      ? em.getRepository(Session)
      : this.dataSource.getRepository(Session);

    const oldSession = await sessionsRepository.findOne({
      where: { id: sessionId },
      relations: ['video'],
    });

    const newSegment = await this.segmentService.getSegmentById(nextSegmentId);

    // Update the existing session with the new segment
    oldSession.currentSegment = newSegment;

    // Save the updated session
    const updatedSession = await sessionsRepository.save(oldSession);

    return updatedSession;
  }
}
