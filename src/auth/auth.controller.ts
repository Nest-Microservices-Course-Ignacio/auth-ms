import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExceptionFilter } from 'src/common/exceptions/rcp-exception.filter';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/loginUser.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller()
@UseFilters(new ExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth.register.user' })
  registerUser(@Payload() data: RegisterDTO) {
    return this.authService.register(data);
  }
  @MessagePattern({ cmd: 'auth.login.user' })
  loginUser(@Payload() data: LoginUserDTO) {
    return this.authService.loginUser(data);
  }

  @MessagePattern({ cmd: 'auth.verify.user' })
  verifyUser() {
    return 'user verified';
  }
}
