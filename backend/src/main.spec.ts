import { INestApplication, PipeTransform } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { bootstrap } from './main';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

describe('main bootstrap', () => {
  const mockApp: Partial<INestApplication> = {};
  const enableCorsMock = jest.fn<INestApplication, [unknown]>(
    () => mockApp as INestApplication,
  );
  const useGlobalPipesMock = jest.fn<INestApplication, [...PipeTransform[]]>(
    () => mockApp as INestApplication,
  );
  const useGlobalFiltersMock = jest.fn<INestApplication, [unknown]>(
    () => mockApp as INestApplication,
  );
  const listenMock = jest.fn<Promise<void>, [string | number]>();
  const createMock = jest.spyOn(NestFactory, 'create');

  beforeEach(() => {
    createMock.mockReset();
    enableCorsMock.mockReset();
    useGlobalPipesMock.mockReset();
    useGlobalFiltersMock.mockReset();
    listenMock.mockReset();

    mockApp.enableCors =
      enableCorsMock as unknown as INestApplication['enableCors'];
    mockApp.useGlobalPipes =
      useGlobalPipesMock as unknown as INestApplication['useGlobalPipes'];
    mockApp.useGlobalFilters =
      useGlobalFiltersMock as unknown as INestApplication['useGlobalFilters'];
    mockApp.listen = listenMock as unknown as INestApplication['listen'];

    createMock.mockResolvedValue(mockApp as INestApplication);

    process.env.CORS_ORIGIN = 'http://localhost:5173';
    process.env.PORT = '3000';

    listenMock.mockResolvedValue(undefined);
  });

  it('configures CORS, global pipes and listen port', async () => {
    await bootstrap();

    expect(createMock).toHaveBeenCalledTimes(1);

    const corsConfig = enableCorsMock.mock.calls[0][0] as {
      origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => void;
      credentials: boolean;
    };

    expect(corsConfig.credentials).toBe(true);
    expect(typeof corsConfig.origin).toBe('function');

    const callback = jest.fn();
    corsConfig.origin('http://localhost:5173', callback);
    expect(callback).toHaveBeenCalledWith(null, true);

    const rejectedCallback = jest.fn();
    corsConfig.origin('https://evil.example', rejectedCallback);
    expect(rejectedCallback).toHaveBeenCalledWith(null, false);

    expect(useGlobalPipesMock).toHaveBeenCalledTimes(1);
    expect(useGlobalFiltersMock).toHaveBeenCalledTimes(1);
    expect(listenMock).toHaveBeenCalledWith('3000');
  });
});
