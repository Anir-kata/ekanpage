import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const expectedUser = this.configService.get<string>('AUTH_USER', 'anir');
    const expectedPassword = this.configService.get<string>('AUTH_PASSWORD', 'anir123');

    if (username !== expectedUser || password !== expectedPassword) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = { sub: username, username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
