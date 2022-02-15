import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import {
  cacheExchange,
  Cache,
  Variables,
  ResolveInfo,
} from '@urql/exchange-graphcache';
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
} from './generated/graphql';

type CacheExchangeType = {
  updates: {
    Mutation: {
      login: (
        result: LoginMutation,
        args: Variables,
        cache: Cache,
        info: ResolveInfo,
      ) => void;
      logout: (
        result: LogoutMutation,
        args: Variables,
        cache: Cache,
        info: ResolveInfo,
      ) => void;
    };
  };
};

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange<CacheExchangeType>({
      updates: {
        Mutation: {
          login: (result, args, cache, info) => {
            console.log('login');
            cache.updateQuery<MeQuery>(
              {
                query: MeDocument,
              },
              (data) => {
                if (result.login.user) {
                  return { user: result.login.user };
                }

                return data;
              },
            );
          },
          logout: (result, args, cache, info) => {
            console.log('logout');
            cache.invalidate(
              {
                __typename: 'Query',
              },
              'user',
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
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
