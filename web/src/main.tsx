import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createClient, Provider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import exchanges from './cache/exchanges';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges,
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Provider value={client}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById('root'),
);
