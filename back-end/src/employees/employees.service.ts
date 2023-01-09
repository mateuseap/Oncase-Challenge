import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../app.datasource';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeDto } from './dto/employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  employeeDtoToEntity(employeeDto: EmployeeDto): Employee {
    const employee = new Employee();

    employee.firstName = employeeDto.firstName;
    employee.lastName = employeeDto.lastName;
    employee.participation = employeeDto.participation;

    return employee;
  }

  createEmployeeDtoToEntity(createEmployeeDto: CreateEmployeeDto): Employee {
    const employee = new Employee();

    employee.firstName = createEmployeeDto.firstName;
    employee.lastName = createEmployeeDto.lastName;
    employee.participation = createEmployeeDto.participation;

    return employee;
  }

  updateEmployeeDtoToEntity(updateEmployeeDto: UpdateEmployeeDto): Employee {
    const employee = new Employee();

    employee.id = updateEmployeeDto.id;
    employee.firstName = updateEmployeeDto.firstName;
    employee.lastName = updateEmployeeDto.lastName;
    employee.participation = updateEmployeeDto.participation;

    return employee;
  }

  async create(employee: Employee) {
    employee = await AppDataSource.manager.save(employee);

    return employee;
  }

  async findAll() {
    const employees = await AppDataSource.getRepository(Employee).find({
      order: {
        participation: 'ASC',
      },
    });

    return employees;
  }

  async findOne(id: number) {
    const employee = await AppDataSource.getRepository(Employee).findOneBy({
      id,
    });

    if (employee) {
      return employee;
    }

    throw Error('Employee does not exist');
  }

  async update(id: number, employee: Employee) {
    let existingEmployee = await AppDataSource.getRepository(
      Employee,
    ).findOneBy({ id });

    if (existingEmployee) {
      existingEmployee.firstName = employee.firstName;
      existingEmployee.lastName = employee.lastName;
      existingEmployee.participation = employee.participation;

      existingEmployee = await AppDataSource.manager.save(
        Employee,
        existingEmployee,
      );

      return existingEmployee;
    }

    throw Error('Employee does not exist');
  }
}
