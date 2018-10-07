import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    new HttpLink({
      uri: process.env.VUE_APP_GQL_API,
      // connectToDevTools: true
    }),
  ]),
  cache: new InMemoryCache(),
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

export default apolloProvider;
