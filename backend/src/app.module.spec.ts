import { ConfigService } from '@nestjs/config';
import { AppModule, buildTypeOrmOptions } from './app.module';

describe('AppModule', () => {
  it('is defined', () => {
    expect(AppModule).toBeDefined();
  });

  it('buildTypeOrmOptions uses fallback values and sync true', () => {
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
      synchronize: true,
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

  it('buildTypeOrmOptions uses DATABASE_URL and enables ssl when requested', () => {
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
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: true,
    });
    expect(configService.getOrThrow).not.toHaveBeenCalled();
  });
});
