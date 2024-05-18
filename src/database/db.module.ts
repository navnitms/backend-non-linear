import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { ConfigService } from '../common/config/config.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DbConfig } from './models/db.model';

export default TypeOrmModule.forRootAsync({
  imports: [CommonModule],
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const { type, database, username, password, host, port } =
      config.get<DbConfig>('db');
    return {
      type,
      host,
      port,
      database,
      username,
      password,
      entities: [`${__dirname}/../**/entity/**{.ts,.js}`],
      synchronize: false,
      logging: ['query', 'error'],
      namingStrategy: new SnakeNamingStrategy(),
      ssl: false,
    };
  },
} as TypeOrmModuleOptions);
