import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
@ApiBearerAuth()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':eventId')
  @UseGuards(AuthGuard)
  create(
    @Request() req: request,
    @Param('eventId') eventId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(req, eventId, createCommentDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
