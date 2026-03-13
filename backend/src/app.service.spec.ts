import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('returns hello world', () => {
    expect(service.getHello()).toBe('Hello World!');
  });

  it('returns health payload with ISO timestamp', () => {
    const health = service.getHealth();

    expect(health.status).toBe('ok');
    expect(typeof health.timestamp).toBe('string');
    expect(new Date(health.timestamp).toISOString()).toBe(health.timestamp);
  });
});
