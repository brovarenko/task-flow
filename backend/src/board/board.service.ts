import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
//import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  create(createBoardDto: CreateBoardDto, userId: number) {
    const { title } = createBoardDto;
    return this.prisma.board.create({
      data: {
        title,
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.board.findMany({
      where: { userId },
      include: {
        lists: {
          include: {
            tasks: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  // update(id: number, updateBoardDto: UpdateBoardDto) {
  //   return `This action updates a #${id} board`;
  // }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
