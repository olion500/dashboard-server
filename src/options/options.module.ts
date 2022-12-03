import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { OptionGroup } from './entities/option_group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option, OptionGroup])],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
