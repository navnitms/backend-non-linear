import { Module, forwardRef } from '@nestjs/common';
import { VideoService } from './service/video.service';
import { SegmentService } from './service/segment.service';
import { SegmentChoiceService } from './service/segment.choice.service';
import { VideoController } from './controller/video.controller';
import { SegmentController } from './controller/segment.controller';
import { ChoiceController } from './controller/choice.controller';
import { ChoiceService } from './service/choice.service';
import { InteractionService } from './service/interaction.service';
import { InteractionController } from './controller/interaction.controller';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [forwardRef(() => SessionModule)],
  providers: [
    VideoService,
    SegmentService,
    SegmentChoiceService,
    ChoiceService,
    InteractionService,
  ],
  exports: [VideoService, SegmentService],
  controllers: [
    VideoController,
    SegmentController,
    ChoiceController,
    InteractionController,
  ],
})
export class VideoModule {}
