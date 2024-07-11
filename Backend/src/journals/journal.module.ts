import { Module } from '@nestjs/common';
import { JournalService } from './services/journal.service';
import { JournalController } from './controllers/journal.controller';
import { Journal } from './entities/journal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [JournalController],
  imports: [TypeOrmModule.forFeature([Journal])],
  providers: [JournalService],
})
export class JournalModule {}
