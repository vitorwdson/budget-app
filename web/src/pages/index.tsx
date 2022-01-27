import { FC } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useQuery } from 'urql';
import { USER_QUERY } from '../graphql/queries';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Loading from '../components/Loading';

const Router: FC = () => {
  const [{ fetching, error }] = useQuery({ query: USER_QUERY });

  if (fetching) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ !error ? <Home /> : <Navigate to = "/login" /> } />        
        <Route path='/login' element={ !error ? <Navigate to = "/" /> : <Login /> } />
        <Route path='/register' element={ !error ? <Navigate to = "/" /> : <Register /> } />
      </Routes>
    </BrowserRouter>    
  );
};

export default Router;
