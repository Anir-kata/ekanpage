import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginRateLimitGuard } from './login-rate-limit.guard';

const makeContext = (
  headers: Record<string, string | string[]> = {},
  ip = '1.2.3.4',
) => {
  const mockRequest = { headers, ip } as unknown as Request;
  return {
    switchToHttp: () => ({ getRequest: () => mockRequest }),
  } as unknown as ExecutionContext;
};

const makeConfig = (max = '5', windowMs = '60000') =>
  ({
    get: (key: string, fallback: string) => {
      if (key === 'AUTH_RATE_LIMIT_MAX') return max;
      if (key === 'AUTH_RATE_LIMIT_WINDOW_MS') return windowMs;
      return fallback;
    },
  }) as unknown as ConfigService;

describe('LoginRateLimitGuard', () => {
  it('allows a request under the rate limit', () => {
    const guard = new LoginRateLimitGuard(makeConfig('3'));
    expect(guard.canActivate(makeContext())).toBe(true);
  });

  it('throws TOO_MANY_REQUESTS when the limit is reached', () => {
    const guard = new LoginRateLimitGuard(makeConfig('2'));
    const ctx = makeContext();
    guard.canActivate(ctx);
    guard.canActivate(ctx);
    expect(() => guard.canActivate(ctx)).toThrow(
      new HttpException(
        'Trop de tentatives de connexion',
        HttpStatus.TOO_MANY_REQUESTS,
      ),
    );
  });

  it('uses the first IP from a string x-forwarded-for header', () => {
    const guard = new LoginRateLimitGuard(makeConfig('3'));
    const ctx = makeContext({ 'x-forwarded-for': '10.0.0.1, 10.0.0.2' });
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('uses the first element of an array x-forwarded-for header', () => {
    const guard = new LoginRateLimitGuard(makeConfig('3'));
    const ctx = makeContext({ 'x-forwarded-for': ['10.0.0.5', '10.0.0.6'] });
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('falls back to request.ip when no forwarded-for header', () => {
    const guard = new LoginRateLimitGuard(makeConfig('3'));
    const ctx = makeContext({}, '192.168.1.1');
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('falls back to unknown-client when no ip is available', () => {
    const guard = new LoginRateLimitGuard(makeConfig('3'));
    const mockRequest = { headers: {}, ip: undefined } as unknown as Request;
    const ctx = {
      switchToHttp: () => ({ getRequest: () => mockRequest }),
    } as unknown as ExecutionContext;
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('blocks the correct client key independently (x-forwarded-for)', () => {
    const guard = new LoginRateLimitGuard(makeConfig('1'));
    const ctx = makeContext({ 'x-forwarded-for': '10.0.0.1' });
    guard.canActivate(ctx);
    expect(() => guard.canActivate(ctx)).toThrow(HttpException);
  });
});
