import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EmployeesModule],
  controllers: [],
})
export class AppModule {}
