import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJournalDto } from '../dtos/create-journal.dto';
import { UpdateJournalDto } from '../dtos/update-journal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Journal } from '../entities/journal.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal) private journalRepository: Repository<Journal>,
  ) {}

  create(createJournalDto: CreateJournalDto, user: User): Promise<Journal> {
    createJournalDto.user = user;
    createJournalDto.category = { id: createJournalDto.categoryId };
    return this.journalRepository.save(createJournalDto);
  }

  findUserJournals(user: User): Promise<Journal[]> {
    return this.journalRepository.find({
      where: { user },
      relations: ['category'],
      order: { createdAt: 'DESC' },
      take: 10,
      skip: 0,
      cache: true,
    });
  }

  async findById(id: number, user: User): Promise<Journal> {
    const journal = await this.journalRepository.findOne({
      where: { id, user },
      relations: ['category'],
    });

    if (!journal) throw new BadRequestException('Journal not found');

    return journal;
  }

  async update(
    id: number,
    updateJournalDto: UpdateJournalDto,
    user: User,
  ): Promise<Journal> {
    await this.findById(id, user); // Validate journal existence and ownership
    updateJournalDto.category = { id: updateJournalDto.categoryId };
    return this.journalRepository.save({ id, ...updateJournalDto });
  }

  async remove(id: number, user: User): Promise<boolean> {
    const journal = await this.findById(id, user);
    await this.journalRepository.remove(journal);
    return true;
  }
}
