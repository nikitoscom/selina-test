import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, LoggerService } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

class TestLogger implements LoggerService {
  log(message: string) {}
  error(message: string, trace: string) {}
  warn(message: string) {}
  debug(message: string) {}
  verbose(message: string) {}
}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(new TestLogger());
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('/locations', () => {
    return request(app.getHttpServer())
      .get('/locations?country=US')
      .expect(200)
      .expect([
        { id: 2, name: 'New York', country: 'US' },
        { id: 3, name: 'Las Vegas', country: 'US' },
        { id: 4, name: 'San Francisco', country: 'US' },
      ]);
  });

  it('/activities', () => {
    return request(app.getHttpServer())
      .get('/activities?country=US')
      .expect(200)
      .expect([
        { id: 2, name: 'Las Vegas Walking Tour', locationId: 3 },
        { id: 3, name: 'New York Walking Tour', locationId: 2 },
        { id: 4, name: 'San Francisco Walking Tour', locationId: 4 },
      ]);
  });

  it('/get-top-locations', () => {
    return request(app.getHttpServer())
      .get('/get-top-locations?date=2022-02-20')
      .expect(200)
      .expect([
        { locationId: 1, total: '2' },
        { locationId: 3, total: '4' },
      ]);
  });
});
