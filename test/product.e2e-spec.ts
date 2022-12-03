import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('E2E Test:: Product', () => {
  let app: INestApplication;
  const url = '/products';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST product', () => {
    const buffer = Buffer.from('test data');

    return request(app.getHttpServer())
      .post(url)
      .attach('image', buffer, 'test_file.txt')
      .field('name', '산책와펜')
      .field(
        'description',
        '귀여운 우리 아이 얼굴로 커스텀할 수 있는 산책와펜입니다.',
      )
      .expect(201);
  });

  it('GET product', async () => {
    const result = await request(app.getHttpServer()).get(url).expect(200);
    console.log(JSON.stringify(result.body, null, 2));
  });
});
