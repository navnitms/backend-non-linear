import { configuration } from '../config/app.config';
import * as jwt from 'jsonwebtoken';
import { TokenInput } from '../models/token';
import { BadRequestException } from '@nestjs/common';

export async function generateAccessToken(userDetails: TokenInput) {
  const expiresIn = configuration.jwt.jwtExpiry || 60 * 60;
  const { secret } = configuration.jwt;

  const dataStoredInToken = {
    ...userDetails,
  };
  return jwt.sign(dataStoredInToken, secret, { expiresIn });
}

export async function validateAuthToken(token: string) {
  try {
    const { secret } = configuration.jwt;
    const reqAuthToken = token;
    const verificationResponse: any = jwt.verify(reqAuthToken, secret);
    const user = { ...verificationResponse } as TokenInput;
    return user;
  } catch (error) {
    throw new BadRequestException('Invalid Token');
  }
}
