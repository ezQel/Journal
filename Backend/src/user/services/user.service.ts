import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findbyId(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  findbyUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(user: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser, {});
  }

  async updateUserName(userId: number, newUsername: string): Promise<User> {
    const userToUpdate = await this.findbyId(userId);
    userToUpdate.username = newUsername;
    return this.userRepository.save(userToUpdate);
  }

  async updatePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    if (currentPassword === newPassword) return true;

    const userToUpdate = await this.findbyId(userId);

    if (!userToUpdate)
      throw new InternalServerErrorException('Could not find user to update');

    const currentPasswordIsCorrect = await bcrypt.compare(
      currentPassword,
      userToUpdate.password,
    );

    if (!currentPasswordIsCorrect)
      throw new ForbiddenException('You entered the wrong password');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userToUpdate.password = hashedPassword;

    await this.userRepository.save(userToUpdate);
    return true;
  }
}
