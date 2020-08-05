
import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './rest-api-actions-schema';
import resolvers from './rest-api-actions.resolver';


export const RestApiOperationModule = new GraphQLModule({
  typeDefs,
  resolvers
});