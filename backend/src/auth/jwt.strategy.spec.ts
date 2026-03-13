import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  it('validates payload shape', () => {
    const configService = {
      get: jest.fn(() => 'secret'),
    } as unknown as ConfigService;

    const strategy = new JwtStrategy(configService);
    expect(strategy.validate({ sub: 'anir', username: 'anir' })).toEqual({
      userId: 'anir',
      username: 'anir',
    });
  });
});
