import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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

function Home() {
  const rows = [
    { id: 1, firstName: 'Mateus', lastName: 'Elias', participation: 10 },
    { id: 2, firstName: 'Dayane', lastName: 'Lira', participation: 20 },
    { id: 3, firstName: 'José', lastName: 'Carlos', participation: 30 },
    { id: 4, firstName: 'Sarah', lastName: 'Melo', participation: 20 },
    { id: 5, firstName: 'Maria', lastName: 'Teresa', participation: 15 },
    { id: 6, firstName: 'Guilherme', lastName: 'Morone', participation: 5 },
  ];
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
  const series = [10, 20, 30, 20, 15, 5];
  const options: ApexOptions = {
    labels: [
      'Mateus Elias',
      'Dayane Lira',
      'José Carlos',
      'Sarah Melo',
      'Maria Teresa',
      'Guilherme Morone',
    ],
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

  return (
    <Page>
      <TopBar>
        <TopBarFields>
          <StyledInput
            id='firstName'
            label='First name'
            variant='outlined'
            type='text'
            InputLabelProps={{
              style: { color: 'black' },
            }}
          />
          <StyledInput
            id='lastName'
            label='Last name'
            variant='outlined'
            type='text'
            InputLabelProps={{
              style: { color: 'black' },
            }}
          />
          <StyledInput
            id='participation'
            label='Participation'
            variant='outlined'
            type='number'
            InputLabelProps={{
              style: { color: 'black' },
            }}
          />
          <StyledButton
            variant='outlined'
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
  );
}

export default Home;
