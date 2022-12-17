import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductOptionDto {
  @ApiProperty()
  consume: number;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  enabledOptions: number[];
}
