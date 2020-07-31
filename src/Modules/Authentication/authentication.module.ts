import { GraphQLModule } from '@graphql-modules/core';

import { UserOperationModule } from '../UserOperations/user-operations.module';

import consola from 'consola';

 

export const isAuthenticated = () => (next: any) => async (root: any, args: any, context: any, info: any) => {

  // console message

  consola.success({

    badge: true,

    message: `isAuth value is ${info.session.req.isAuth}`

  }); 

  

  if (!info.session.req.isAuth) {

    throw new Error('You are not authenticated!');

  } 

    return next(root, args, context, info);

};

 

export const AuthenticationModule = new GraphQLModule({ 

  resolversComposition: {

    'Mutation.saveProduct': [isAuthenticated()],

  },

  imports: [

    UserOperationModule

  ],

})