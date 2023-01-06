import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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

function Home() {
  const [newEmployee, setNewEmployee] = useState<boolean>();
  const [employee, setEmployee] = useState<Employee>({
    firstName: '',
    lastName: '',
    participation: -1,
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [series, setSeries] = useState<number[]>(
    employees.map(tempEmployee => tempEmployee.participation),
  );
  const [labels, setLabels] = useState<string[]>();
  const [rows, setRows] = useState<Employee[]>(
    employees.map((tempEmployee, index) => ({
      id: index + 1,
      firstName: tempEmployee.firstName,
      lastName: tempEmployee.lastName,
      participation: tempEmployee.participation,
    })),
  );
  const columns: GridColDef[] = [
    { field: 'id', renderHeader: () => '', width: 5, align: 'center' },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'participation',
      headerName: 'Participation',
      width: 100,
      align: 'center',
      renderCell: params => `${params.row.participation}%`,
    },
  ];
  const options: ApexOptions = {
    series,
    labels,
    chart: {
      type: 'donut',
    },
    legend: {
      show: true,
      position: 'right',
      fontSize: '13px',
      markers: {
        width: 25,
        height: 25,
        radius: 5,
        offsetY: 8,
        offsetX: -8,
      },
      labels: {
        useSeriesColors: true,
      },
      offsetY: -19,
      itemMargin: {
        vertical: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
          size: '52%',
        },
      },
    },
  };

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

  useEffect(() => {
    const newSeries = employees.map(tempEmployee => tempEmployee.participation);
    setSeries(newSeries);

    const newLabels = employees.map(
      tempEmployee => `${tempEmployee.firstName} ${tempEmployee.lastName}`,
    );
    setLabels(newLabels);

    const newRows = employees.map((tempEmployee, index) => ({
      id: index + 1,
      firstName: tempEmployee.firstName,
      lastName: tempEmployee.lastName,
      participation: tempEmployee.participation,
    }));
    setRows(newRows);
  }, [employees]);

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
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                sx={{ height: '80%' }}
              />
            </TableColumn>
            <ChartColumn>
              <ReactApexChart options={options} series={series} type='donut' />
            </ChartColumn>
          </Columns>
        </Content>
      </Page>
    </>
  );
}

export default Home;
