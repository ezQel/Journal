import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginResponse } from '../interfaces/login-response';
import { AuthService } from '../services/auth.service';
import { User } from 'src/user/entities/user.entity';
import { SkipAuth } from '../decorators/skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: User }): LoginResponse {
    return this.authService.login(req.user);
  }

  @Post('logout')
  logout(): Promise<void> {
    return Promise.resolve(null);
  }

  @SkipAuth()
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<LoginResponse> {
    return this.authService.signup(createUserDto);
  }
}
