import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './pages';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  }
});

ReactDOM.render(
  <Provider value={client}>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
