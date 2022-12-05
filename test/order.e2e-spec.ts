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

  it('POST', async () => {
    const buffer = Buffer.from('test data');
    const response = await request(app.getHttpServer()).get('/products');
    const productId = response.body[0].id;

    return request(app.getHttpServer())
      .post(url)
      .attach('image', buffer, 'test_file.txt')
      .attach('image', buffer, 'test_file2.txt')
      .field('name', '김다혜')
      .field('phone', '010-1234-5432')
      .field('purchase_site', '네이버자사몰')
      .field('product_id', productId)
      .field('options', 1)
      .field('options', 2)
      .expect(201);
  });

  it('GET', async () => {
    const result = await request(app.getHttpServer()).get(url).expect(200);
    console.log(JSON.stringify(result.body, null, 2));
  });
});
