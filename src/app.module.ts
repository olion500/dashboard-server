import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstimateSheetsModule } from './estimate_sheets/estimate_sheets.module';

@Module({
  imports: [ConfigModule, EstimateSheetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
