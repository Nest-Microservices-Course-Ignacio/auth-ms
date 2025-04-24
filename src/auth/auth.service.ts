import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
    Logger.log('Prisma Client connected', 'AuthService');
  }

  create(data: RegisterDTO) {
    return this.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
