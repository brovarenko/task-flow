import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = { sub: user.id, username: user.name };

    return {
      ...user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '2h',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '30d',
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user && (await compare(dto.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }

  async refreshToken(user) {
    const payload = { sub: user.id, username: user.name };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '2h',
        secret: process.env.jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
        secret: process.env.jwtRefreshTokenKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
