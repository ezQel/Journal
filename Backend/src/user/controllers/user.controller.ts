import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('update-username')
  updateUsername(
    @Request() req: { user: User },
    @Body('username') newUsername: string,
  ): Promise<User> {
    const userId = req.user.id;
    return this.userService.updateUserName(userId, newUsername);
  }
}
