import { Body, Controller, Post, Request } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('update-username')
  updateUsername(
    @Request() req: { user: User },
    @Body('username') newUsername: string,
  ): Promise<User> {
    const userId = req.user.id;
    return this.userService.updateUserName(userId, newUsername);
  }

  @Post('change-password')
  changePassword(
    @Request() req: { user: User },
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ): Promise<boolean> {
    const userId = req.user.id;
    return this.userService.updatePassword(
      userId,
      currentPassword,
      newPassword,
    );
  }
}
