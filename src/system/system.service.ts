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
    // for test server
    this.httpService.post(
      `${this.KPI_API_HOST}/kpiLv1/kpiLv1InsertTst`,
      createKpi1,
    );

    // for production server
    // NOTE: The server only takes singe body.
    const data = createKpi1.KPILEVEL1 as any[];
    for (const body of data) {
      this.httpService.post(`${this.KPI_API_HOST}/kpiLv1/save`, body);
    }
    return 'success';
  }

  sendKpi2(createKpi2: CreateKpi2Dto) {
    // for test server
    this.httpService.post(
      `${this.KPI_API_HOST}/kpiLv2/kpiLv2InsertTst`,
      createKpi2,
    );

    // for production server
    // NOTE: The server only takes singe body.
    const data = createKpi2.KPILEVEL2 as any[];
    for (const body of data) {
      this.httpService.post(`${this.KPI_API_HOST}/kpiLv2/save`, body);
    }
    return 'success';
  }

  sendKpi3(createKpi3: CreateKpi3Dto) {
    // for test server
    this.httpService.post(
      `${this.KPI_API_HOST}/kpiLv3/kpiLv3InsertTst`,
      createKpi3,
    );

    // for production server
    // NOTE: The server only takes singe body.
    const data = createKpi3.KPILEVEL3 as any[];
    for (const body of data) {
      this.httpService.post(`${this.KPI_API_HOST}/kpiLv3/save`, body);
    }
    return 'success';
  }
}
