import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginUserDTO } from './dto/loginUser.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth.register.user' })
  registerUser(@Payload() data: RegisterDTO) {
    return {
      msg: 'user registered successfully',
      data,
    };
  }
  @MessagePattern({ cmd: 'auth.login.user' })
  loginUser(@Payload() data: LoginUserDTO) {
    return { msg: 'user logged in successfully', data };
  }

  @MessagePattern({ cmd: 'auth.verify.user' })
  verifyUser() {
    return 'user verified';
  }
}
