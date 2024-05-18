import { Injectable } from '@nestjs/common';
import { get } from 'lodash';
import { configuration } from './app.config';

export interface ConfigInterface {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  get<T extends any>(key: string, defaultValue?: T): T;
}

@Injectable()
export class ConfigService implements ConfigInterface {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}

  get<T = any>(key: string, defaultValue: T = null): T {
    return get(configuration, key, defaultValue);
  }
}
