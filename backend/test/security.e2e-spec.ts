import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { Client } from 'pg';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';

const TEST_DB_NAME = process.env.TEST_DB_NAME ?? 'ekanpage_test';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'test';
process.env.DB_HOST = process.env.DB_HOST ?? 'localhost';
process.env.DB_PORT = process.env.DB_PORT ?? '5432';
process.env.DB_USER = process.env.DB_USER ?? 'postgres';
process.env.DB_PASSWORD = process.env.DB_PASSWORD ?? 'anir';
process.env.DB_NAME = TEST_DB_NAME;
process.env.DB_SYNC = 'true';
process.env.AUTH_USER = process.env.AUTH_USER ?? 'test-admin';
process.env.AUTH_PASSWORD = process.env.AUTH_PASSWORD ?? 'test-admin-password';
process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'test-jwt-secret';
process.env.AUTH_RATE_LIMIT_MAX = '5';
process.env.AUTH_RATE_LIMIT_WINDOW_MS = '60000';

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
      try {
        await adminClient.query(`CREATE DATABASE "${TEST_DB_NAME}"`);
      } catch (err: unknown) {
        if ((err as { code?: string }).code !== '42P04') throw err;
      }
    }
  } finally {
    await adminClient.end();
  }
};

describe('Security (e2e)', () => {
  let app: INestApplication<App>;
  let authToken = '';
  let createdStudentId = '';

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

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: process.env.AUTH_USER, password: process.env.AUTH_PASSWORD })
      .expect(201);

    authToken = loginResponse.body.accessToken as string;

    const createResponse = await request(app.getHttpServer())
      .post('/students')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        fullName: 'Eleve securite',
        level: 'Terminale',
        objective: 'Protection API',
        sessionsDone: 0,
        sessionWeekday: 1,
        sessionTime: '18:00',
        notes: 'test security',
      })
      .expect(201);

    createdStudentId = createResponse.body.id as string;
  });

  afterEach(async () => {
    await app.close();
  });

  it('requires authentication for student listing and detail routes', async () => {
    await request(app.getHttpServer()).get('/students').expect(401);

    await request(app.getHttpServer())
      .get(`/students/${createdStudentId}`)
      .expect(401);
  });

  it('rate limits repeated login attempts from the same client', async () => {
    const clientIp = '203.0.113.10';

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await request(app.getHttpServer())
        .post('/auth/login')
        .set('x-forwarded-for', clientIp)
        .send({ username: 'wrong-user', password: 'wrong-password' })
        .expect(401);
    }

    await request(app.getHttpServer())
      .post('/auth/login')
      .set('x-forwarded-for', clientIp)
      .send({ username: 'wrong-user', password: 'wrong-password' })
      .expect(429);
  });
});