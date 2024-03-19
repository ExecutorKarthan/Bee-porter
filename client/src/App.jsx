import { Outlet } from 'react-router-dom';
import Nav from './components/index'
import Footer from './components/footer';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// Create an HTTP link for GraphQL endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
// Create an Apollo client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Concatenate authLink and httpLink to include the JWT token in the request headers
  cache: new InMemoryCache(), // Initialize an in-memory cache
});
// Main component of the application
function App() {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <Outlet />
      <Footer />
    </ApolloProvider>
  );
}

export default App; // Export the App component as default