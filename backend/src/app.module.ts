import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, BoardModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtService],
})
export class AppModule {}
