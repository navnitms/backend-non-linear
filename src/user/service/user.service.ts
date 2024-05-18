import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';
import { User } from '../entity/user.entity';
import { v4 } from 'uuid';
import { CreateUserInput, UserLoginInput } from '../models/user.input';
import { compare, hash } from '../../common/utils/password.util';
import { generateAccessToken } from 'src/common/utils/authentication.helper';
import { TokenResponse } from 'src/common/models/token';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async create(userInput: CreateUserInput) {
    const { name, email, password } = userInput;
    const hashPassword = await hash(password);

    const user: DeepPartial<User> = {
      name,
      email,
      id: v4(),
      password: hashPassword,
    };

    const saveduser = await this.dataSource.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const userRepository = transactionalEntityManager.getRepository(User);
        const userRecord = await userRepository.findOneBy({
          email: user.email,
        });
        if (userRecord) {
          throw new BadRequestException('Email already exist');
        }
        await userRepository.save(user);
        return user;
      },
    );
    return saveduser;
  }

  async userLogin(userDetails: UserLoginInput): Promise<TokenResponse> {
    const userRepository = this.dataSource.getRepository(User);

    const userRecord = await userRepository.findOneBy({
      email: userDetails.email,
    });

    if (!userRecord) {
      throw new NotFoundException('Incorrect Email Or Password');
    }
    const verification = await compare(
      userDetails.password,
      userRecord.password,
    );
    if (!verification) {
      throw new NotFoundException('Incorrect Email Or Password');
    }
    const token = await this.getNewToken(userRecord);
    return token;
  }

  async getNewToken(userRecord: User): Promise<TokenResponse> {
    const token = await generateAccessToken({
      email: userRecord.email,
      id: userRecord.id,
    });

    const tokenResponse: TokenResponse = { token, userId: userRecord.id };
    return tokenResponse;
  }
}
