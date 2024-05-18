import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserInput, UserLoginInput } from '../models/user.input';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Res() res: Response, @Body() userInput: CreateUserInput) {
    const result = await this.userService.create(userInput);
    return res.status(HttpStatus.OK).send(result);
  }

  @Post('login')
  async login(@Res() res: Response, @Body() loginInput: UserLoginInput) {
    const result = await this.userService.userLogin(loginInput);
    return res.status(HttpStatus.OK).send(result);
  }
}
