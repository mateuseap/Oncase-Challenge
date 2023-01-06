import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

@ApiTags('UpdateEmployeeDto')
export class UpdateEmployeeDto {
  @ApiProperty({
    name: 'firstName',
    type: String,
    maxLength: 200,
    nullable: true,
  })
  @IsString()
  firstName?: string;

  @ApiProperty({
    name: 'lastName',
    type: String,
    maxLength: 200,
    nullable: true,
  })
  @IsString()
  lastName?: string;

  @ApiProperty({ name: 'participation', type: Number, nullable: true })
  @IsNumber()
  participation?: number;
}
