import { Body, Controller, Post } from '@nestjs/common';
import { SystemService } from './system.service';
import { CreateKpi1Dto } from './dto/create-kpi1.dto';
import { CreateKpi2Dto } from './dto/create-kpi2.dto';
import { CreateKpi3Dto } from './dto/create-kpi3.dto';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post('/kpi1')
  sendKpi1(@Body() createKpi1Dto: CreateKpi1Dto) {
    return this.systemService.sendKpi1(createKpi1Dto);
  }

  @Post('/kpi2')
  sendKpi2(@Body() createKpi2Dto: CreateKpi2Dto) {
    return this.systemService.sendKpi2(createKpi2Dto);
  }

  @Post('/kpi3')
  sendKpi3(@Body() createKpi3Dto: CreateKpi3Dto) {
    return this.systemService.sendKpi3(createKpi3Dto);
  }
}
