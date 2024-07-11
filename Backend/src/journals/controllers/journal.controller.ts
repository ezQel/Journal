import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CreateJournalDto } from '../dtos/create-journal.dto';
import { UpdateJournalDto } from '../dtos/update-journal.dto';
import { JournalService } from '../services/journal.service';

@Controller('journals')
export class JournalController {
  constructor(private readonly journalsService: JournalService) {}

  @Post()
  create(@Request() req, @Body() createJournalDto: CreateJournalDto) {
    const user = req.user;
    delete user.jti;
    return this.journalsService.create(createJournalDto, user);
  }

  @Get()
  findAll(@Request() req) {
    const user = req.user;
    delete user.jti;
    return this.journalsService.findUserJournals(user);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    const user = req.user;
    delete user.jti;
    return this.journalsService.findById(id, user);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateJournalDto: UpdateJournalDto,
  ) {
    const user = req.user;
    delete user.jti;
    return this.journalsService.update(id, updateJournalDto, user);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    const user = req.user;
    delete user.jti;
    return this.journalsService.remove(id, user);
  }
}
