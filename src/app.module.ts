import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstimateSheetsModule } from './estimate_sheets/estimate_sheets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from './database.configuration';
import { OptionsModule } from './options/options.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
    EstimateSheetsModule,
    OptionsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
