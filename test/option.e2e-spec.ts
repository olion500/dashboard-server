import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('E2E Test:: Options', () => {
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

  it('POST option', async () => {
    const buffer = Buffer.from('test data');
    const response = await request(app.getHttpServer()).get(url);
    const id = response.body[0].id;

    return request(app.getHttpServer())
      .post(`${url}/${id}`)
      .attach('image', buffer, 'test_file.txt')
      .field('name', '검은색')
      .expect(201);
  });

  it('PATCH option', async () => {
    const response = await request(app.getHttpServer()).get(url);
    const id = response.body[0].id;

    return request(app.getHttpServer())
      .patch(`${url}/${id}`)
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
