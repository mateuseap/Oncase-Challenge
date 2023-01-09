import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
  Page,
  TopBar,
  TopBarFields,
  StyledInput,
  StyledButton,
  TextContent,
  Content,
  Columns,
  TableColumn,
  ChartColumn,
} from './styles';
import { Employee } from '../../types/Employee.d';
import { EmployeesService } from '../../services/EmployeesService';
import 'react-toastify/dist/ReactToastify.css';
import DonutChart from '../../components/DonutChart';
import Table from '../../components/Table';

function Home() {
  const [newEmployee, setNewEmployee] = useState<boolean>();
  const [employee, setEmployee] = useState<Employee>({
    firstName: '',
    lastName: '',
    participation: -1,
  });
  const [employees, setEmployees] = useState<Employee[]>([]);

  async function getEmployees() {
    EmployeesService.getEmployees()
      .then(response => {
        const { data } = response;
        const allEmployees: Employee[] = data.map(tempEmployee => ({
          id: tempEmployee.id,
          firstName: tempEmployee.firstName,
          lastName: tempEmployee.lastName,
          participation: tempEmployee.participation,
        }));
        setEmployees(allEmployees);
      })
      .catch(error => {
        if (error.response) {
          console.error('Response error', error.response.status);
        } else if (error.request) {
          console.error('Request error', error.request);
        } else {
          console.error('Error', error.message);
        }
      });
  }

  async function postEmployee() {
    EmployeesService.postEmployee(employee)
      .then(() => {
        toast.success('Funcionário cadastrado com sucesso!');
        setNewEmployee(true);
      })
      .catch(error => {
        if (error.response) {
          console.error('Response error', error.response.status);
        } else if (error.request) {
          console.error('Request error', error.request);
        } else {
          console.error('Error', error.message);
        }
      });
  }

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    if (newEmployee) {
      getEmployees();
    }
  }, [newEmployee]);

  const employeeFirstNameUpdate = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEmployee({ ...employee, firstName: event.target.value });
  };

  const employeeLastNameUpdate = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEmployee({ ...employee, lastName: event.target.value });
  };

  const employeeParticipationUpdate = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setEmployee({ ...employee, participation: event.target.valueAsNumber });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postEmployee();
    setNewEmployee(false);
  };

  return (
    <>
      <ToastContainer />
      <Page>
        <TopBar>
          <TopBarFields onSubmit={handleSubmit}>
            <StyledInput
              required
              id='firstName'
              label='First name'
              variant='outlined'
              type='text'
              InputLabelProps={{
                style: { color: 'black' },
              }}
              value={employee?.firstName}
              onChange={employeeFirstNameUpdate}
            />
            <StyledInput
              required
              id='lastName'
              label='Last name'
              variant='outlined'
              type='text'
              InputLabelProps={{
                style: { color: 'black' },
              }}
              value={employee?.lastName}
              onChange={employeeLastNameUpdate}
            />
            <StyledInput
              required
              id='participation'
              label='Participation'
              variant='outlined'
              type='number'
              InputLabelProps={{
                style: { color: 'black' },
              }}
              value={
                employee?.participation !== -1 ? employee?.participation : ''
              }
              onChange={employeeParticipationUpdate}
              inputProps={{ min: 1 }}
            />
            <StyledButton
              variant='outlined'
              type='submit'
              sx={{
                color: 'white',
                backgroundColor: 'none',
                borderColor: 'white',
                ':hover': {
                  backgroundColor: '#2185a9',
                  borderColor: 'white',
                },
              }}
            >
              SEND
            </StyledButton>
          </TopBarFields>
        </TopBar>
        <TextContent>
          <h1 style={{ margin: 0 }}>DATA</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </TextContent>
        <Content>
          <Columns>
            <TableColumn>
              <Table employees={employees} />
            </TableColumn>
            <ChartColumn>
              <DonutChart employees={employees} />
            </ChartColumn>
          </Columns>
        </Content>
      </Page>
    </>
  );
}

export default Home;
