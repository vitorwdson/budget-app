import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
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
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
