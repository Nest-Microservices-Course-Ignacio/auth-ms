import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from 'generated/prisma';
import { LoginUserDTO } from './dto/loginUser.dto';
import { RegisterDTO } from './dto/register.dto';
import { AuthUser } from './interfaces/AuthUser.interface';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  constructor(private jwtService: JwtService) {
    super();
  }

  onModuleInit() {
    this.$connect();
    Logger.log('Prisma Client connected', 'AuthService');
  }

  async register(data: RegisterDTO) {
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

  verifyToken(token: string): AuthUser {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { iat, exp, ...user } = this.jwtService.verify(token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...user,
        accessToken: this.jwtService.sign(user),
      };
    } catch (error) {
      Logger.error(error, this.constructor.name);
      throw new RpcException({
        status: 401,
        message: 'Invalid Token.',
      });
    }
  }

  async loginUser(data: LoginUserDTO): Promise<AuthUser> {
    const { email, password } = data;
    const existingUser = await this.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new RpcException({
        status: 401,
        message: 'Invalid credentials.',
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordValid) {
      throw new RpcException({
        status: 401,
        message: 'Invalid credentials.',
      });
    }
    const formattedUser = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      phone: existingUser.phone,
      address: existingUser.address,
      createdAt: existingUser.createdAt,
      updatedAt: existingUser.updatedAt,
    };

    return {
      ...formattedUser,
      accessToken: this.jwtService.sign(formattedUser),
    };
  }
}
