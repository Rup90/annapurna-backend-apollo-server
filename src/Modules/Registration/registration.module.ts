import { GraphQLModule } from "@graphql-modules/core";

import typeDefs from "./registration.schema";

import resolvers from "./registration.resolver";

 

export const RegistrationModule = new GraphQLModule({

    typeDefs,

    resolvers

});

 