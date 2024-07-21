import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { SkipAuth } from '../decorators/skip-auth.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginResponse } from '../interfaces/login-response';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: User }): LoginResponse {
    return this.authService.login(req.user);
  }

  @Post('logout')
  async logout(@Request() req): Promise<boolean> {
    await this.tokenService.revokeToken(req.user.jti);
    return true;
  }

  @SkipAuth()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<LoginResponse> {
    return this.authService.registerUser(createUserDto);
  }
}
