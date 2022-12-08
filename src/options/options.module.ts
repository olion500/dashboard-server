import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { OptionGroup } from './entities/option_group.entity';
import { OptionConsumeHistory } from './entities/option_consume_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option, OptionGroup, OptionConsumeHistory])],
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [OptionsService],
})
export class OptionsModule {}
