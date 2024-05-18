import { Controller, Get, Param, Post, Body, Inject } from '@nestjs/common';
import { Video } from '../entity/video.entity';
import { VideoService } from '../service/video.service';
import { CreateVideoInput } from '../model/video.model';

@Controller('video')
export class VideoController {
  constructor(
    @Inject(VideoService)
    private readonly videosService: VideoService,
  ) {}

  @Get()
  async getAllVideos(): Promise<Video[]> {
    return this.videosService.getAllVideos();
  }

  @Get(':id')
  async getVideoById(@Param('id') id: string): Promise<Video> {
    return this.videosService.getVideoById(id);
  }

  @Post()
  async createVideo(
    @Body() createVideoInput: CreateVideoInput,
  ): Promise<Video> {
    return this.videosService.createVideo(createVideoInput);
  }
}
