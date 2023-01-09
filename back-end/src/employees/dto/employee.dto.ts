import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ApiTags('EmployeeDto')
export class EmployeeDto {
  @ApiProperty({ name: 'id', type: Number })
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @ApiProperty({ name: 'firstName', type: String, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @ApiProperty({ name: 'lastName', type: String, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @ApiProperty({ name: 'participation', type: Number })
  @IsNotEmpty()
  @IsNumber()
  participation!: number;
}
