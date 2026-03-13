describe('main bootstrap', () => {
  const createMock = jest.fn();
  const enableCorsMock = jest.fn();
  const useGlobalPipesMock = jest.fn();
  const listenMock = jest.fn();

  beforeEach(() => {
    jest.resetModules();
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

    jest.doMock('@nestjs/core', () => ({
      NestFactory: {
        create: createMock,
      },
    }));
  });

  it('configures CORS, global pipes and listen port', async () => {
    const { bootstrap } = require('./main');

    await bootstrap();

    expect(createMock).toHaveBeenCalledTimes(2);
    expect(enableCorsMock).toHaveBeenCalledWith({
      origin: 'http://localhost:5173',
      credentials: true,
    });
    expect(useGlobalPipesMock).toHaveBeenCalledTimes(2);
    expect(listenMock).toHaveBeenCalledWith('3000');
  });
});
