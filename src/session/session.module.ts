import { Module, forwardRef } from '@nestjs/common';
import { SessionService } from './service/session.service';
import { SessionsController } from './controller/session.controller';
import { VideoModule } from 'src/video/video.module';

@Module({
  imports: [forwardRef(() => VideoModule)],
  providers: [SessionService],
  exports: [SessionService],
  controllers: [SessionsController],
})
export class SessionModule {}
