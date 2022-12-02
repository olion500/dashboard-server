import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('E2E Test:: Estimate-sheet', () => {
  let app: INestApplication;
  const url = '/estimate-sheets';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST', () => {
    return request(app.getHttpServer())
      .post(url)
      .send({
        estimateNo: 'NFN-220102',
        name: '인식표',
        estimatedAt: '2022-10-19',
        companyName: 'pet',
        companyId: '1717-45-1232',
        companyCEO: '김홍일',
        totalCost: 123000,
        url: 'https://asdf.com',
      })
      .expect(201);
  });

  it('GET', () => {
    return request(app.getHttpServer()).get(url).expect(200);
  });
});
