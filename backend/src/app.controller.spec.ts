import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should return "Backend du Projet EkanPage"', () => {
    expect(appController.getHello()).toBe('Backend du Projet EkanPage');
  });

  it('should return health payload', () => {
    const health = appController.getHealth();

    expect(health.status).toBe('ok');
    expect(typeof health.timestamp).toBe('string');
    expect(new Date(health.timestamp).toISOString()).toBe(health.timestamp);
    const serviceHealth = appService.getHealth();
    expect(serviceHealth.status).toBe('ok');
  });
});
