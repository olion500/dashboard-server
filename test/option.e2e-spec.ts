import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('E2E Test:: Estimate-sheet', () => {
  let app: INestApplication;
  const url = '/options';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST group', () => {
    return request(app.getHttpServer())
      .post(url)
      .send({
        name: '펠트색상',
      })
      .expect(201);
  });

  it('POST option', () => {
    return request(app.getHttpServer())
      .post(`${url}/1`)
      .send({
        name: '검은색',
        image: 'www.naver.com',
      })
      .expect(201);
  });

  it('PATCH option', () => {
    return request(app.getHttpServer())
      .patch(`${url}/1`)
      .send({
        count: 10,
      })
      .expect(200);
  });

  it('GET group', async () => {
    const result = await request(app.getHttpServer()).get(url).expect(200);
    console.log(JSON.stringify(result.body, null, 2));
  });
});
