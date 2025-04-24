import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { LoginUserDTO } from './loginUser.dto';

export class RegisterDTO extends LoginUserDTO {
  @IsString()
  name: string;

  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
