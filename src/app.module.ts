import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstimateSheetsModule } from './estimate_sheets/estimate_sheets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from './database.configuration';
import { OptionsModule } from './options/options.module';
import { ProductsModule } from './products/products.module';
import { SeedsModule } from './seeds/seeds.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
    EstimateSheetsModule,
    OptionsModule,
    ProductsModule,
    SeedsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
