import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Employee } from '../../types/Employee.d';

interface TableProps {
  employees: Employee[];
}

function Table({ employees }: TableProps) {
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

  useEffect(() => {
    const newRows = employees.map((tempEmployee, index) => ({
      id: index + 1,
      firstName: tempEmployee.firstName,
      lastName: tempEmployee.lastName,
      participation: tempEmployee.participation,
    }));
    setRows(newRows);
  }, [employees]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      sx={{ height: '80%' }}
    />
  );
}

export default Table;
