import { Controller, Inject, Post, Get, Param, Body } from '@nestjs/common';
import { SegmentService } from '../service/segment.service';
import { Segment } from '../entity/segment.entity';
import { CreateSegmentInput } from '../model/segment.model';

@Controller('segment')
export class SegmentController {
  constructor(
    @Inject(SegmentService)
    private readonly segmentService: SegmentService,
  ) {}

  @Get('/video/:id')
  async getAllSegmentsByVideoId(
    @Param('id') videoId: string,
  ): Promise<Segment[]> {
    return this.segmentService.getSegmentsByVideoId(videoId);
  }

  @Get(':id')
  async getSegmentById(@Param('id') id: string): Promise<Segment> {
    return this.segmentService.getSegmentById(id);
  }

  @Post()
  async createSegment(
    @Body() createSegmentInput: CreateSegmentInput,
  ): Promise<Segment> {
    return this.segmentService.createSegment(createSegmentInput);
  }
}
