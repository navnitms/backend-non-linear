import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';
import { Video } from '../entity/video.entity';
import { v4 } from 'uuid';
import { CreateVideoInput, UpdateVideoInput } from '../model/video.model';

@Injectable()
export class VideoService {
  constructor(private readonly dataSource: DataSource) {}

  async createVideo(createVideoInput: CreateVideoInput): Promise<Video> {
    const videoRepo = this.dataSource.getRepository(Video);
    const newVideo: DeepPartial<Video> = {
      id: v4(),
      title: createVideoInput.title,
    };
    return videoRepo.save(newVideo);
  }

  async getVideoById(videoId: string, em?: EntityManager): Promise<Video> {
    const videoRepo = em
      ? em.getRepository(Video)
      : this.dataSource.getRepository(Video);

    const video = await videoRepo.findOne({
      where: { id: videoId },
      relations: ['segments'],
    });
    if (!video) {
      throw new NotFoundException(`Video with ID ${videoId} not found`);
    }
    return video;
  }

  async getAllVideos(): Promise<Video[]> {
    const videoRepo = this.dataSource.getRepository(Video);
    return videoRepo.find({ relations: ['segments'] });
  }

  async updateVideo(
    id: string,
    updateVideoInput: UpdateVideoInput,
  ): Promise<Video> {
    return this.dataSource.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const videoRepo = transactionalEntityManager.getRepository(Video);
        await videoRepo.update(id, updateVideoInput);
        return this.getVideoById(id, transactionalEntityManager);
      },
    );
  }

  async deleteVideo(id: number): Promise<void> {
    const videoRepo = this.dataSource.getRepository(Video);
    await videoRepo.softDelete(id);
  }
}
