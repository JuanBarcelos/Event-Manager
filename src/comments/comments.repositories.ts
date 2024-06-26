import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Comments } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(
    _userId: string,
    _eventId: string,
    _requestBody: CreateCommentDto,
  ): Promise<Comments> {
    const newComment = await this.prisma.comment.create({
      data: {
        userId: _userId,
        eventId: _eventId,
        commentText: _requestBody.commentText,
      },
    });

    return newComment;
  }

  async updateComment(
    _commentId: string,
    _requestBody: UpdateCommentDto,
  ): Promise<Comments> {
    const newComment = await this.prisma.comment.update({
      where: {
        id: _commentId,
      },
      data: {
        commentText: _requestBody.commentText,
      },
    });

    return newComment;
  }

  async deleteComment(_id: string): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: _id,
      },
    });
  }
}
