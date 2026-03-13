import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { Client } from 'pg';
import { App } from 'supertest/types';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';

const TEST_DB_NAME = process.env.TEST_DB_NAME ?? 'ekanpage_test';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'test';
process.env.DB_HOST = process.env.DB_HOST ?? 'localhost';
process.env.DB_PORT = process.env.DB_PORT ?? '5432';
process.env.DB_USER = process.env.DB_USER ?? 'postgres';
process.env.DB_PASSWORD = process.env.DB_PASSWORD ?? 'anir';
process.env.DB_NAME = TEST_DB_NAME;
process.env.DB_SYNC = process.env.DB_SYNC ?? 'true';
process.env.AUTH_USER = process.env.AUTH_USER ?? 'anir';
process.env.AUTH_PASSWORD = process.env.AUTH_PASSWORD ?? 'anir123';

const ensureTestDatabase = async () => {
  const adminClient = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
  });

  await adminClient.connect();

  try {
    const result = await adminClient.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [TEST_DB_NAME],
    );

    if (result.rowCount === 0) {
      await adminClient.query(`CREATE DATABASE \"${TEST_DB_NAME}\"`);
    }
  } finally {
    await adminClient.end();
  }
};

type HealthResponse = {
  status: string;
  timestamp: string;
};

type StudentResponse = {
  id: string;
  fullName: string;
  sessionsDone: number;
};

type StudentsPageResponse = {
  items: StudentResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let createdStudentId: string | null = null;
  let authToken = '';

  beforeAll(async () => {
    await ensureTestDatabase();
  });

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

    const dataSource = app.get(DataSource);
    await dataSource.query('DELETE FROM "students"');
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

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'anir', password: 'anir123' })
      .expect(201);

    expect(response.body.accessToken).toBeDefined();
    authToken = response.body.accessToken as string;
  });

  it('/students (POST) requires authentication', async () => {
    await request(app.getHttpServer())
      .post('/students')
      .send({
        fullName: 'No Auth',
        level: 'Test',
        objective: 'Test',
        sessionsDone: 0,
        sessionWeekday: 0,
        sessionTime: '10:00',
        notes: 'Test',
      })
      .expect(401);
  });

  it('/students (POST/GET/PATCH/DELETE)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'anir', password: 'anir123' })
      .expect(201);
    authToken = loginResponse.body.accessToken as string;

    const createPayload = {
      fullName: 'Eleve E2E',
      level: 'Terminale',
      objective: 'Preparation bac',
      sessionsDone: 1,
      sessionWeekday: 0,
      sessionTime: '10:00',
      nextSessionAt: '2026-03-20T18:00:00.000Z',
      notes: 'Test e2e',
    };

    const createdResponse = await request(app.getHttpServer())
      .post('/students')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createPayload)
      .expect(201);

    const createdBody = createdResponse.body as StudentResponse;
    createdStudentId = createdBody.id;
    expect(createdStudentId).toBeDefined();

    const listResponse = await request(app.getHttpServer())
      .get('/students')
      .expect(200);

    const listBody = listResponse.body as StudentsPageResponse;
    expect(Array.isArray(listBody.items)).toBe(true);
    expect(
      listBody.items.some(
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
      .set('Authorization', `Bearer ${authToken}`)
      .send({ sessionsDone: 2, notes: 'Maj e2e' })
      .expect(200);

    const patchBody = patchResponse.body as StudentResponse;
    expect(patchBody.sessionsDone).toBe(2);

    await request(app.getHttpServer())
      .delete(`/students/${createdStudentId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    createdStudentId = null;
  });

  it('/students (POST) should validate payload', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'anir', password: 'anir123' })
      .expect(201);
    authToken = loginResponse.body.accessToken as string;

    await request(app.getHttpServer())
      .post('/students')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        fullName: 'A',
        level: '',
        objective: 'X',
        sessionsDone: -1,
        sessionWeekday: 9,
        sessionTime: '25:00',
        nextSessionAt: 'not-a-date',
        notes: 'test',
      })
      .expect(400);
  });
});
