import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from 'generated/prisma';
import { RegisterDTO } from './dto/register.dto';

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

    console.log(bcrypt.hashSync(data.password, 10));

    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const newUser = await this.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      phone: newUser.phone,
      address: newUser.address,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      accessToken: 'ABC',
    };
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
