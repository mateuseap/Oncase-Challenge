import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ApiTags('CreateEmployeeDto')
export class CreateEmployeeDto {
  @ApiProperty({ name: 'firstName', type: String, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @ApiProperty({ name: 'lastName', type: String, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @ApiProperty({ name: 'participation', type: Number, nullable: true })
  @IsNumber()
  participation?: number;
}
