import { FC } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>    
  );
};

export default Router;
