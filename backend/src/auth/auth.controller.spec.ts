import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  const service = {
    login: jest.fn(),
  } as unknown as AuthService;

  let controller: AuthController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new AuthController(service);
  });

  it('delegates login to service', async () => {
    (service.login as jest.Mock).mockResolvedValue({ accessToken: 'token-1' });

    await expect(
      controller.login({ username: 'admin', password: 'admin123' }),
    ).resolves.toEqual({ accessToken: 'token-1' });
  });
});
