import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

class CreateAuthDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: CreateAuthDto) {
    return this.authService.login(body.username, body.password);
  }
}
