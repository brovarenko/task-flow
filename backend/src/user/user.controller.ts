import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  // async getUserProfile(@Param('id') id: number) {
  async getUserProfile(@Request() req) {
    console.log(req.user.sub);
    return await this.userService.findById(req.user.sub);
  }
}
