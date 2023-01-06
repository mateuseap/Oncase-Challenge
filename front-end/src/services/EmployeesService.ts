import { AxiosResponse } from 'axios';
import apiBack from './api';
import { Employee } from '../types/Employee.d';

export class EmployeesService {
  static async postEmployee(
    employee: Employee,
  ): Promise<AxiosResponse<Employee>> {
    const response = await apiBack.post('employees', employee, {
      validateStatus: (status: number) => [201].includes(status),
    });
    return response;
  }

  static async getEmployees(): Promise<AxiosResponse<Employee[]>> {
    const response = await apiBack.get('employees', {
      validateStatus: (status: number) => [200].includes(status),
    });
    return response;
  }

  static async getEmployee(id: number): Promise<AxiosResponse<Employee>> {
    const response = await apiBack.get(`employees/${id}`, {
      validateStatus: (status: number) => [200].includes(status),
    });
    return response;
  }

  static async putEmployee(
    id: number,
    employee: Employee,
  ): Promise<AxiosResponse<Employee>> {
    const response = await apiBack.put(`employees/${id}`, employee, {
      validateStatus: (status: number) => [200].includes(status),
    });
    return response;
  }
}
