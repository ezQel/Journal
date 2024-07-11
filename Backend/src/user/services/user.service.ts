import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

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

  async updateUserName(id: number, newUsername: string): Promise<User> {
    const userToUpdate = await this.findbyId(id);
    userToUpdate.username = newUsername;
    return this.userRepository.save(userToUpdate);
  }

  async updatePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    if (oldPassword === newPassword) {
      throw new BadRequestException();
    }
    const userToUpdate = await this.findbyId(id);
    return this.userRepository.save(userToUpdate);
  }
}
