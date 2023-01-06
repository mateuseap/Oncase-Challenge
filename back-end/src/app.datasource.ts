import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Employee } from './employees/entities/employee.entity';
import { CreateEmployee1672996126957 } from './database/migrations/1672996126957-CreateEmployee';

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('TYPEORM_HOST'),
  port: configService.get('TYPEORM_PORT'),
  username: configService.get('TYPEORM_USERNAME'),
  password: configService.get('TYPEORM_PASSWORD'),
  database: configService.get('TYPEORM_DATABASE'),
  synchronize: false,
  logging: false,
  entities: [Employee],
  migrations: [CreateEmployee1672996126957],
});
