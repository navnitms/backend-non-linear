import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';
import { Segment } from '../entity/segment.entity';
import { CreateSegmentInput, UpdateSegmentInput } from '../model/segment.model';
import { v4 } from 'uuid';
import { VideoService } from './video.service';

@Injectable()
export class SegmentService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(VideoService)
    private readonly videoService: VideoService,
  ) {}

  async createSegment(
    createSegmentInput: CreateSegmentInput,
  ): Promise<Segment> {
    const segmentRepo = this.dataSource.getRepository(Segment);

    const video = await this.videoService.getVideoById(
      createSegmentInput.videoId,
    );
    const segment: DeepPartial<Segment> = {
      id: v4(),
      video,
      url: createSegmentInput.url,
      segmentOrder: createSegmentInput.segmentOrder,
    };
    return segmentRepo.save(segment);
  }

  async getSegmentById(id: string, em?: EntityManager): Promise<Segment> {
    const segmentRepo = em
      ? em.getRepository(Segment)
      : this.dataSource.getRepository(Segment);

    const segment = await segmentRepo.findOne({
      where: { id },
      relations: [
        'segmentChoices',
        'segmentChoices.choice',
        'segmentChoices.nextSegment',
      ],
    });
    if (!segment) {
      throw new NotFoundException(`Segment with ID ${id} not found`);
    }
    return segment;
  }

  async getSegmentsByVideoId(videoId: string): Promise<Segment[]> {
    const segmentRepo = this.dataSource.getRepository(Segment);
    return segmentRepo.find({
      where: { video: { id: videoId } },
      relations: [
        'segmentChoices',
        'segmentChoices.choice',
        'segmentChoices.nextSegment',
      ],
      order: { segmentOrder: 'ASC' },
    });
  }

  async updateSegment(
    segmentId: string,
    updateSegmentInput: UpdateSegmentInput,
  ): Promise<Segment> {
    return this.dataSource.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const segmentRepo = transactionalEntityManager.getRepository(Segment);
        await segmentRepo.update(segmentId, updateSegmentInput);
        return this.getSegmentById(segmentId, transactionalEntityManager);
      },
    );
  }

  async deleteSegmentById(segmentId: string): Promise<void> {
    const segmentRepo = this.dataSource.getRepository(Segment);
    await segmentRepo.softDelete(segmentId);
  }
}
