import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { VideoModule } from './video/video.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [UserModule, CommonModule, VideoModule, SessionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
