import { Injectable } from '@nestjs/common';
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

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser, {});
  }

  async updateUserName(id: number, username: string): Promise<User> {
    const userToUpdate = await this.findOne(id);
    userToUpdate.username = username;
    return this.userRepository.save(userToUpdate);
  }

  async updatePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    console.log(oldPassword, newPassword);
    const userToUpdate = await this.findOne(id);
    return this.userRepository.save(userToUpdate);
  }
}
