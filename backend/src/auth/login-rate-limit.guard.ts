import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class LoginRateLimitGuard implements CanActivate {
  private readonly attemptsByClient = new Map<string, number[]>();

  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const clientKey = this.getClientKey(request);
    const maxAttempts = Number(
      this.configService.get<string>('AUTH_RATE_LIMIT_MAX', '5'),
    );
    const windowMs = Number(
      this.configService.get<string>('AUTH_RATE_LIMIT_WINDOW_MS', '60000'),
    );
    const now = Date.now();
    const attempts = (this.attemptsByClient.get(clientKey) ?? []).filter(
      (timestamp) => now - timestamp < windowMs,
    );

    if (attempts.length >= maxAttempts) {
      this.attemptsByClient.set(clientKey, attempts);
      throw new HttpException(
        'Trop de tentatives de connexion',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    attempts.push(now);
    this.attemptsByClient.set(clientKey, attempts);
    return true;
  }

  private getClientKey(request: Request): string {
    const forwardedFor = request.headers['x-forwarded-for'];

    if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
      return forwardedFor.split(',')[0].trim();
    }

    if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
      return forwardedFor[0];
    }

    return request.ip || 'unknown-client';
  }
}