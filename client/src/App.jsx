import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Nav />
    <Outlet />
    </ApolloProvider>
  );
}

export default App
