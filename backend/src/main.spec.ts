import { NestFactory } from '@nestjs/core';
import { bootstrap } from './main';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

describe('main bootstrap', () => {
  const enableCorsMock = jest.fn<void, [unknown]>();
  const useGlobalPipesMock = jest.fn<void, [unknown]>();
  const listenMock = jest.fn<Promise<void>, [string | number]>();
  const createMock = jest.spyOn(NestFactory, 'create');

  beforeEach(() => {
    createMock.mockReset();
    enableCorsMock.mockReset();
    useGlobalPipesMock.mockReset();
    listenMock.mockReset();

    createMock.mockResolvedValue({
      enableCors: enableCorsMock,
      useGlobalPipes: useGlobalPipesMock,
      listen: listenMock,
    });

    process.env.CORS_ORIGIN = 'http://localhost:5173';
    process.env.PORT = '3000';

    listenMock.mockResolvedValue(undefined);
  });

  it('configures CORS, global pipes and listen port', async () => {
    await bootstrap();

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(enableCorsMock).toHaveBeenCalledWith({
      origin: 'http://localhost:5173',
      credentials: true,
    });
    expect(useGlobalPipesMock).toHaveBeenCalledTimes(1);
    expect(listenMock).toHaveBeenCalledWith('3000');
  });
});
