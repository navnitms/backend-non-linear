import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { CommonModule } from '../common/common.module';
import { UserController } from './controller/user.controller';
import dbModule from '../database/db.module';

@Module({
  imports: [CommonModule, dbModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
