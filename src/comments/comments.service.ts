import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './comments.repositories';
import { Request } from 'express';
import { AppService } from 'src/app.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly appService: AppService,
  ) {}

  async create(
    _request: Request,
    _eventId: string,
    _createCommentDto: CreateCommentDto,
  ) {
    const user = await this.appService.decodedRequestToken(_request);
    const comment = await this.commentRepository.createComment(
      user.id,
      _eventId,
      _createCommentDto,
    );

    return comment;
  }

  async update(_id: string, _updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.updateComment(
      _id,
      _updateCommentDto,
    );

    return comment;
  }

  async remove(_id: string): Promise<void> {
    await this.commentRepository.deleteComment(_id);
  }
}
