import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth.register.user' })
  registerUser(@Payload() data: any) {
    return {
      msg: 'user registered successfully',
      data,
    };
  }
  @MessagePattern({ cmd: 'auth.login.user' })
  loginUser() {
    return { msg: 'user logged in successfully' };
  }

  @MessagePattern({ cmd: 'auth.verify.user' })
  verifyUser() {
    return 'user verified';
  }
}
