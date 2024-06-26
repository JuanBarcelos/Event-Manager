import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './comments.repositories';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentsRepository) {}

  async create(
    _userId: string,
    _eventId: string,
    _createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.commentRepository.createComment(
      _userId,
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
