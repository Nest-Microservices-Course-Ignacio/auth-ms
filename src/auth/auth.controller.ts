import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginUserDTO } from './dto/loginUser.dto';
import { ExceptionFilter } from 'src/common/exceptions/rcp-exception.filter';

@Controller()
@UseFilters(new ExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth.register.user' })
  registerUser(@Payload() data: RegisterDTO) {
    return this.authService.create(data);
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
