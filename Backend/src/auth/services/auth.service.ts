import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { LoginResponse } from '../interfaces/login-response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<LoginResponse> {
    let user: User;

    try {
      user = await this.userService.create(createUserDto);
    } catch (err) {
      throw new ConflictException('Username is already taken');
    }

    return this.login(user);
  }

  login(user: User): LoginResponse {
    const payload = { username: user.username, sub: user.id };
    return { accessToken: this.jwtService.sign(payload, { jwtid: uuidv4() }) };
  }

  async validateUser(username: string, password: string): Promise<User> {
    username = username.toLowerCase();
    const user = await this.userService.findbyUsername(username);

    if (!user) return null;

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (passwordIsCorrect) {
      delete user.password;
      return user;
    }

    return null;
  }
}
