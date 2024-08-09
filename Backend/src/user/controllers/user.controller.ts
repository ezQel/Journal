import { Body, Controller, Get, Put, Request } from '@nestjs/common';
import { UpdatePasswordDto } from 'src/auth/dtos/update-password.dto';
import { UpdateUsernameDto } from '../dtos/update-username.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@Request() req: { user: User }): Promise<User> {
    const userId = req.user.id;
    return this.userService.getProfile(userId);
  }

  @Put('update-username')
  updateUsername(
    @Request() req: { user: User },
    @Body() updateUsernameDto: UpdateUsernameDto,
  ): Promise<User> {
    const userId = req.user.id;
    return this.userService.updateUserName(userId, updateUsernameDto.username);
  }

  @Put('change-password')
  changePassword(
    @Request() req: { user: User },
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<boolean> {
    const userId = req.user.id;
    return this.userService.updatePassword(
      userId,
      updatePasswordDto.currentPassword,
      updatePasswordDto.newPassword,
    );
  }
}
