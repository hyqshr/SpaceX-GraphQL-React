import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: "https://spacex-production.up.railway.app/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          launchesPast: offsetLimitPagination(),
          launches: offsetLimitPagination(),
          launchpads: offsetLimitPagination(),
        },
      },
    },
  }),
});

export default client;
