import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './login.schema';
import resolvers from './login.resolver';

export const LoginModule = new GraphQLModule({
  typeDefs,
  resolvers
});
