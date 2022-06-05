import { Controller, Post, Request, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Request() req, @Body() body) {
    return this.authService.login(body);
  }
}
