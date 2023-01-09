import { Test } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Response } from 'express';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

describe('EmployeesController', () => {
  let employeesController: EmployeesController;
  let employeesService: EmployeesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService],
    }).compile();

    employeesController =
      moduleRef.get<EmployeesController>(EmployeesController);
    employeesService = moduleRef.get<EmployeesService>(EmployeesService);
  });

  describe('create', () => {
    it('should create an employee', async () => {
      const statusResponseMock = {
        send: jest.fn((x) => x),
      };
      const responseMock = {
        status: jest.fn(() => statusResponseMock),
        send: jest.fn((x) => x),
      } as unknown as Response;
      let createEmployee = new CreateEmployeeDto();
      createEmployee = {
        firstName: 'Guilherme',
        lastName: 'Morone',
        participation: 35,
      };

      jest
        .spyOn(employeesService, 'create')
        .mockImplementation(async (employee: Employee) => {
          employee.id = 130;
          return employee;
        });
      await employeesController.create(
        employeesService.createEmployeeDtoToEntity(createEmployee),
        responseMock,
      );

      expect(responseMock.status).toHaveBeenCalledWith(201);
      expect(statusResponseMock.send).toHaveBeenCalledWith(
        'Employee created successfully!',
      );
    });
  });

  describe('findAll', () => {
    it('should return all employees', async () => {
      let employees = new Array<Employee>();
      employees = [
        {
          id: 1,
          firstName: 'Mateus',
          lastName: 'Elias',
          participation: 10,
        },
        {
          id: 2,
          firstName: 'Dayane',
          lastName: 'Lira',
          participation: 20,
        },
      ];
      jest
        .spyOn(employeesService, 'findAll')
        .mockImplementation(async () => employees);

      expect(await employeesController.findAll()).toBe(employees);
    });
  });

  describe('findOne', () => {
    it('should return a specific employee', async () => {
      const statusResponseMock = {
        send: jest.fn((x) => x),
      };
      const responseMock = {
        status: jest.fn(() => statusResponseMock),
        send: jest.fn((x) => x),
      } as unknown as Response;
      let employee = new Employee();
      employee = {
        id: 1,
        firstName: 'Mateus',
        lastName: 'Elias',
        participation: 10,
      };
      jest.spyOn(employeesService, 'findOne').mockImplementation(async (id) => {
        if (id === 1) {
          return employee;
        }
        throw Error('Employee does not exist');
      });
      await employeesController.findOne(employee.id.toString(), responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.send).toHaveBeenCalledWith(
        employeesService.employeeDtoToEntity(employee),
      );
    });

    it('should return a 404 status when the employee does not exist', async () => {
      const statusResponseMock = {
        send: jest.fn((x) => x),
      };
      const responseMock = {
        status: jest.fn(() => statusResponseMock),
        send: jest.fn((x) => x),
      } as unknown as Response;
      let employee = new Employee();
      employee = {
        id: 1,
        firstName: 'Dayane',
        lastName: 'Lira',
        participation: 20,
      };
      jest.spyOn(employeesService, 'findOne').mockImplementation(async (id) => {
        if (id === 1) {
          return employee;
        }
        throw Error('Employee does not exist');
      });
      await employeesController.findOne('2', responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(404);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        message: 'Employee does not exist',
      });
    });
  });

  describe('update', () => {
    it('should update an employee', async () => {
      const statusResponseMock = {
        send: jest.fn((x) => x),
      };
      const responseMock = {
        status: jest.fn(() => statusResponseMock),
        send: jest.fn((x) => x),
      } as unknown as Response;
      let updateEmployee = new UpdateEmployeeDto();
      updateEmployee = {
        id: 180,
        firstName: 'Mateus',
        lastName: 'Andrade',
      };
      jest
        .spyOn(employeesService, 'update')
        .mockImplementation(async (id: number, employee: Employee) => {
          let existingEmployee = false;
          const employeesId = [180, 134, 872];

          for (let i = 0; i < employeesId.length; i++) {
            if (id === employeesId[i]) {
              existingEmployee = true;
              break;
            }
          }

          if (existingEmployee) {
            return employee;
          }

          throw Error('Employee does not exist');
        });
      await employeesController.update(
        updateEmployee.id.toString(),
        employeesService.updateEmployeeDtoToEntity(updateEmployee),
        responseMock,
      );

      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.send).toHaveBeenCalledWith(
        'Employee updated successfully!',
      );
    });

    it('should return a 404 status when the employee does not exist', async () => {
      const statusResponseMock = {
        send: jest.fn((x) => x),
      };
      const responseMock = {
        status: jest.fn(() => statusResponseMock),
        send: jest.fn((x) => x),
      } as unknown as Response;
      let updateEmployee = new UpdateEmployeeDto();
      updateEmployee = {
        id: 18,
        firstName: 'Mateus',
        lastName: 'Andrade',
      };
      jest
        .spyOn(employeesService, 'update')
        .mockImplementation(async (id: number, employee: Employee) => {
          let existingEmployee = false;
          const employeesId = [180, 134, 872];

          for (let i = 0; i < employeesId.length; i++) {
            if (id === employeesId[i]) {
              existingEmployee = true;
              break;
            }
          }

          if (existingEmployee) {
            return employee;
          }

          throw Error('Employee does not exist');
        });
      await employeesController.update(
        updateEmployee.id.toString(),
        employeesService.updateEmployeeDtoToEntity(updateEmployee),
        responseMock,
      );

      expect(responseMock.status).toHaveBeenCalledWith(404);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        message: 'Employee does not exist',
      });
    });
  });
});
