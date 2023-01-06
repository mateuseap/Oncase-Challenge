import { Controller, Get, Post, Body, Param, Res, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiResponse({ status: 201, description: 'Create an employee' })
  @Post()
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Res() response: Response,
  ) {
    try {
      await this.employeesService.create(
        this.employeesService.createEmployeeDtoToEntity(createEmployeeDto),
      );
      response.status(201).send('Employee created successfully!');
    } catch (error) {
      if (error instanceof Error) {
        response.status(500);
      }
    }
  }

  @ApiResponse({ status: 200, description: 'Get all employees' })
  @Get()
  async findAll(@Res() response: Response) {
    const employees = await this.employeesService.findAll();
    response.status(200).send(employees);
  }

  @ApiResponse({ status: 200, description: 'Get one employee' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const employee = await this.employeesService.findOne(+id);
      response
        .status(200)
        .send(this.employeesService.employeeDtoToEntity(employee));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Employee does not exist') {
          response.status(404).send({ message: error.message });
        } else {
          response.status(500);
        }
      }
    }
  }

  @ApiResponse({ status: 200, description: 'Update one employee' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Res() response: Response,
  ) {
    try {
      await this.employeesService.update(
        +id,
        this.employeesService.updateEmployeeDtoToEntity(updateEmployeeDto),
      );
      response.status(200).send('Employee updated successfully!');
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Employee does not exist') {
          response.status(404).send({ message: error.message });
        } else {
          response.status(500);
        }
      }
    }
  }
}
