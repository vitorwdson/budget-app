import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import { useMeQuery } from './generated/graphql';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [{ fetching, error }] = useMeQuery();

  if (fetching) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!error ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!error ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={!error ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
