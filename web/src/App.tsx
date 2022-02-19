import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Loading from './components/Loading';
import Menu from './components/Menu';
import { useMeQuery } from './generated/graphql';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [{ fetching, data, stale }, reRunQuery] = useMeQuery();
  const location = useLocation();

  useEffect(() => {
    reRunQuery();
  }, [location]);

  return (
    <Box>
      <Container p="5" maxW="container.md" display="flex" minH="100vh">
        <Grid templateColumns="1fr" templateRows="auto 1fr" gap="5" flex="100%">
          <GridItem>
            <Menu
              userName={`${data?.me.firstName} ${data?.me.lastName}`}
              loggedIn={!!data}
            />
          </GridItem>
          <GridItem>
            {fetching && <Loading />}
            {!fetching && !stale && (
              <Routes>
                <Route
                  path="/"
                  element={data ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                  path="/login"
                  element={data ? <Navigate to="/" /> : <Login />}
                />
                <Route
                  path="/register"
                  element={data ? <Navigate to="/" /> : <Register />}
                />
              </Routes>
            )}
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
