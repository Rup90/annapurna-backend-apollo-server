import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './common-operations.schema';
import resolvers from './common-operations.resolver';

export const CommonOperationModule = new GraphQLModule({
  typeDefs,
  resolvers
});