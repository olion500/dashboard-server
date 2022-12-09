import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateKpi1Dto } from './dto/create-kpi1.dto';
import { CreateKpi3Dto } from './dto/create-kpi3.dto';
import { CreateKpi2Dto } from './dto/create-kpi2.dto';

@Injectable()
export class SystemService {
  private readonly KPI_API_HOST: string;

  constructor(private readonly httpService: HttpService) {
    this.KPI_API_HOST = process.env.KPI_API_HOST;
  }

  sendKpi1(createKpi1: CreateKpi1Dto) {
    this.httpService.post(
      `${this.KPI_API_HOST}/kpiLv1/kpiLv1InsertTst`,
      createKpi1,
    );
    this.httpService.post(`${this.KPI_API_HOST}/kpiLv1/save`, createKpi1);
    return 'success';
  }

  sendKpi2(createKpi2: CreateKpi2Dto) {
    this.httpService.post(
      `${this.KPI_API_HOST}/kpiLv2/kpiLv2InsertTst`,
      createKpi2,
    );
    this.httpService.post(`${this.KPI_API_HOST}/kpiLv2/save`, createKpi2);
  }

  sendKpi3(createKpi3: CreateKpi3Dto) {
    this.httpService.post(
      `${this.KPI_API_HOST}/kpiLv3/kpiLv3InsertTst`,
      createKpi3,
    );
    this.httpService.post(`${this.KPI_API_HOST}/kpiLv3/save`, createKpi3);
  }
}
