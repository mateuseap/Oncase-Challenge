import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

export const Page = styled.body`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: space-between;
`;

export const TopBar = styled.div`
  display: block;
  width: 100%;
  height: 20%;
  background-color: #2596be;
`;

export const TopBarFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-directon: row;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const StyledInput = styled(TextField)({
  width: '250px',
  height: '55px',
  backgroundColor: 'white',
  label: {
    color: 'black',
  },
  borderRadius: '3px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
});

export const StyledButton = styled(Button)({
  width: '110px',
  height: '55px',
});

export const TextContent = styled.div`
  display: block;
  width: 100%;
  height: 15%;
  text-align: center;
`;

export const Content = styled.div`
  display: block;
  height: 55%;
  width: 100vw;
`;

export const Columns = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

export const TableColumn = styled.div`
  height: 100%;
  width: 45%;
`;

export const ChartColumn = styled.div`
  height: 100%;
  width: 40%;
`;
