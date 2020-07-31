import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './admin-operations.schema';
import resolvers from './admin-operations.resolver';

export const AdminOperationModule = new GraphQLModule({
  typeDefs,
  resolvers
});