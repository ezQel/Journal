import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('update-username')
  updateUsername(@Body('username') username: string): Promise<User> {
    return this.userService.updateUserName(1, username); //TODO: Replace 1 with actual user ID
  }
}
