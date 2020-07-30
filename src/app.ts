import express from 'express';

import { ApolloServer } from 'apollo-server-express';

import depthLimit from 'graphql-depth-limit';

import "reflect-metadata";

import { createServer } from 'http';

import compression from 'compression';

import cors from 'cors';

import Db from './db';

import { LoginModule } from './Modules/Login/login.module';

import { UserOperationModule } from './Modules/UserOperations/user-operations.module';

import consola from 'consola';

import { RegistrationModule } from './Modules/Registration/registration.module';

const config = require('./config');

 

  // initialize the app

  const app = express();

  

  // starting apollo-express-server

  const server = new ApolloServer({

    modules: [

      LoginModule,

      RegistrationModule,

      UserOperationModule

    ],

    context: ({ req, res }) => ({ req, res }),

    validationRules: [depthLimit(7)],

    subscriptions: {

      onConnect: (connectionParams, webSocket, context) => {

        console.log(context);
        
      },
      onDisconnect: (webSocket, context) => {
        // ...
      },
    },

  });

  app.use('*', cors());

  app.use(compression());

  server.applyMiddleware({ app, path: '/graphql' });

 

  Db.setupDb(new Db()).then(() => {

    const httpServer = createServer(app);

    server.installSubscriptionHandlers(httpServer);

    httpServer.listen({ port: config.APP_PORT },

      (): void => {

        consola.success({

          message: `\n🚀GraphQL is now running on http://localhost:${config.APP_PORT}/graphql`,

          badge: true

        });

      });

  }).catch(err => {

    consola.error({

      message: `Unable to start the server \n${err.message}`,

      badge: true

    });

  })