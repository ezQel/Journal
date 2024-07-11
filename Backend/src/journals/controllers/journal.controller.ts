import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JournalService } from '../services/journal.service';
import { CreateJournalDto } from '../dtos/create-journal.dto';
import { UpdateJournalDto } from '../dtos/update-journal.dto';

@Controller('journals')
export class JournalController {
  constructor(private readonly journalsService: JournalService) {}

  @Post()
  create(@Body() createJournalDto: CreateJournalDto) {
    return this.journalsService.create(createJournalDto);
  }

  @Get()
  findAll() {
    return this.journalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJournalDto: UpdateJournalDto) {
    return this.journalsService.update(+id, updateJournalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journalsService.remove(+id);
  }
}
