import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Links } from './types/enum';
import Home from './pages/Home/index';

function RoutesMap() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Links.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesMap;
