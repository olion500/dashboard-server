import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('E2E Test:: Order', () => {
  let app: INestApplication;
  const url = '/orders';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST', () => {
    const buffer = Buffer.from('test data');

    return request(app.getHttpServer())
      .post(url)
      .field('name', 'asdf')
      .expect(201);
  });

  it('GET', async () => {
    const result = await request(app.getHttpServer()).get(url).expect(200);
    console.log(JSON.stringify(result.body, null, 2));
  });
});
