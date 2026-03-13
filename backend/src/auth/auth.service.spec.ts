import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const configService = {
    get: jest.fn((key: string, fallback: string) => {
      if (key === 'AUTH_USER') return 'admin';
      if (key === 'AUTH_PASSWORD') return 'admin123';
      return fallback;
    }),
  } as unknown as ConfigService;

  const jwtService = {
    signAsync: jest.fn(),
  } as unknown as JwtService;

  let service: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService(configService, jwtService);
  });

  it('returns access token for valid credentials', async () => {
    (jwtService.signAsync as jest.Mock).mockResolvedValue('token-123');

    await expect(service.login('admin', 'admin123')).resolves.toEqual({
      accessToken: 'token-123',
    });
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: 'admin',
      username: 'admin',
    });
  });

  it('throws UnauthorizedException for invalid credentials', async () => {
    await expect(service.login('admin', 'wrong')).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
