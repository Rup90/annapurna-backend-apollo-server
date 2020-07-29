import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './user-operations.schema';
import resolvers from './user-operations.resolver';

export const UserOperationModule = new GraphQLModule({
  typeDefs,
  resolvers
});
