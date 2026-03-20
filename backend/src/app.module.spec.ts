import { ConfigService } from '@nestjs/config';
import { AppModule, buildTypeOrmOptions } from './app.module';

describe('AppModule', () => {
  it('is defined', () => {
    expect(AppModule).toBeDefined();
  });

  it('buildTypeOrmOptions uses safe defaults', () => {
    const configService = {
      get: jest.fn((key: string, defaultValue: string) => defaultValue),
      getOrThrow: jest.fn(() => 'secret'),
    } as unknown as ConfigService;

    const options = buildTypeOrmOptions(configService);

    expect(options).toEqual({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'postgres',
      ssl: false,
      autoLoadEntities: true,
      synchronize: false,
    });
  });

  it('buildTypeOrmOptions handles sync false', () => {
    const configService = {
      get: jest.fn((key: string, defaultValue: string) =>
        key === 'DB_SYNC' ? 'false' : defaultValue,
      ),
      getOrThrow: jest.fn(() => 'secret'),
    } as unknown as ConfigService;

    const options = buildTypeOrmOptions(configService);

    expect(options.synchronize).toBe(false);
  });

  it('buildTypeOrmOptions uses DATABASE_URL and keeps certificate validation enabled', () => {
    const configService = {
      get: jest.fn((key: string, defaultValue?: string) => {
        if (key === 'DATABASE_URL') return 'postgresql://user:pass@host/db';
        if (key === 'DB_SSL') return 'true';
        return defaultValue;
      }),
      getOrThrow: jest.fn(() => 'secret'),
    } as unknown as ConfigService;

    const options = buildTypeOrmOptions(configService);

    expect(options).toEqual({
      type: 'postgres',
      url: 'postgresql://user:pass@host/db',
      ssl: { rejectUnauthorized: true },
      autoLoadEntities: true,
      synchronize: false,
    });
    expect(configService.getOrThrow).not.toHaveBeenCalled();
  });
});
