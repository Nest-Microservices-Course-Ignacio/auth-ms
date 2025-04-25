import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { RegisterDTO } from './dto/register.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
    Logger.log('Prisma Client connected', 'AuthService');
  }

  async create(data: RegisterDTO) {
    const userExists = await this.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userExists) {
      throw new RpcException({
        status: 409,
        message: `User with email ${data.email} already exists`,
      });
    }

    const newUser = await this.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password /*TODO: encrypt password */,
      },
    });
    return { ...newUser, accessToken: 'ABC' };
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
