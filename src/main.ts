import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //http://localhsot:8000/media/cats/aaa.png
  //prefix 는 static파일앞에 /media를 붙여준다.
  app.useStaticAssets(path.join(__dirname, 'uploads'), {
    prefix: '/media',
  });

  // swagger setup. The url starts with 'api'.
  const config = new DocumentBuilder()
    .setTitle('Dashboard')
    .setDescription('The dashboard API')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
