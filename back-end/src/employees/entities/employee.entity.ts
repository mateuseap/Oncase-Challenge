import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('Employee')
@Entity({ name: 'employee' })
export class Employee {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id!: number;

  @ApiProperty({ name: 'firstName', type: String, maxLength: 200 })
  @Column({ name: 'firstName', length: 200 })
  firstName!: string;

  @ApiProperty({ name: 'lastName', type: String, maxLength: 200 })
  @Column({ name: 'lastName', length: 200 })
  lastName!: string;

  @ApiProperty({ name: 'participation', type: Number })
  @Column({ name: 'participation' })
  participation!: number;
}
