import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

type HealthResponse = {
  status: string;
  timestamp: string;
};

type StudentResponse = {
  id: string;
  fullName: string;
  sessionsDone: number;
};

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let createdStudentId: string | null = null;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/health (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/health')
      .expect(200);

    const body = response.body as HealthResponse;
    expect(body.status).toBe('ok');
  });

  it('/students (POST/GET/PATCH/DELETE)', async () => {
    const createPayload = {
      fullName: 'Eleve E2E',
      level: 'Terminale',
      objective: 'Preparation bac',
      sessionsDone: 1,
      nextSessionAt: '2026-03-20T18:00:00.000Z',
      notes: 'Test e2e',
    };

    const createdResponse = await request(app.getHttpServer())
      .post('/students')
      .send(createPayload)
      .expect(201);

    const createdBody = createdResponse.body as StudentResponse;
    createdStudentId = createdBody.id;
    expect(createdStudentId).toBeDefined();

    const listResponse = await request(app.getHttpServer())
      .get('/students')
      .expect(200);

    const listBody = listResponse.body as StudentResponse[];
    expect(Array.isArray(listBody)).toBe(true);
    expect(
      listBody.some(
        (student: StudentResponse) => student.id === createdStudentId,
      ),
    ).toBe(true);

    const oneResponse = await request(app.getHttpServer())
      .get(`/students/${createdStudentId}`)
      .expect(200);

    const oneBody = oneResponse.body as StudentResponse;
    expect(oneBody.fullName).toBe('Eleve E2E');

    const patchResponse = await request(app.getHttpServer())
      .patch(`/students/${createdStudentId}`)
      .send({ sessionsDone: 2, notes: 'Maj e2e' })
      .expect(200);

    const patchBody = patchResponse.body as StudentResponse;
    expect(patchBody.sessionsDone).toBe(2);

    await request(app.getHttpServer())
      .delete(`/students/${createdStudentId}`)
      .expect(200);
    createdStudentId = null;
  });

  it('/students (POST) should validate payload', async () => {
    await request(app.getHttpServer())
      .post('/students')
      .send({
        fullName: 'A',
        level: '',
        objective: 'X',
        sessionsDone: -1,
        nextSessionAt: 'not-a-date',
        notes: 'test',
      })
      .expect(400);
  });
});
