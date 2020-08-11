import express from 'express';

require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';

import depthLimit from 'graphql-depth-limit';

import "reflect-metadata";

import { createServer } from 'http';

import compression from 'compression';

import cors from 'cors';

import Db from './db';

import { LoginModule } from './Modules/Login/login.module';

import { RegistrationModule } from './Modules/Registration/registration.module';

import { AdminOperationModule } from './Modules/AdminOperations/admin-operations.module';

import { AuthenticationModule } from './Modules/Authentication/authentication.module';

import { RestApiOperationModule } from './Modules/RestApiActions/rest-api-actions.module';

import { DummyRestAPI } from './Modules/RestApiActions/rest-api-actions-datasource';

import consola from 'consola';

import  logger  from './utils/logger';

import CustomError from './utils/custom-error-handler';
import customErrorHandler from './utils/custom-error-handler';
import { formatError } from 'graphql';

const isAuth = require('./middleware/authenticationGuard');
const config = require('./config');
const path = require('path');


  // initialize the app

  const app = express();

  // check JWT token [Middleware]
  app.use(isAuth); 

  // starting apollo-express-server

  // const dummyRest = new DummyRestAPI();


  const server = new ApolloServer({

    modules: [

      LoginModule,

      RegistrationModule,

      AdminOperationModule,

      AuthenticationModule,

      RestApiOperationModule

    ],

    dataSources: () => ({
        dummyApi: new DummyRestAPI()
    }),
    
    context: ({ req, res }) => ({ req, res }),

    validationRules: [depthLimit(7)],

    subscriptions: {

      onConnect: (connectionParams, webSocket, context) => {

      },
      onDisconnect: (webSocket, context) => {
        // ...
      },
    },

    uploads: {
      maxFileSize: 10000000, // 10 MB
      maxFiles: 20
    },

    // formatError: (err: any) => {
    //   // Don't give the specific errors to the client.
    //   // if (err.message.startsWith("You are: ")) {
    //   //   return new Error('Internal server error');
    //   // }
      
    //   // const error = customErrorHandler(err.extensions);
    //   const test = {};
    //   console.log('error ==>', err);
    //   // Otherwise return the original error.  The error can also
    //   // be manipulated in other ways, so long as it's returned.
    //   return test;
    // }

  });

  app.use('*', cors());

  app.use(compression());

  app.use('/images', express.static(path.join(__dirname, './images')));

  server.applyMiddleware({ app, path: '/graphql' });

 

  Db.setupDb(new Db()).then(() => {

    const httpServer = createServer(app);

    server.installSubscriptionHandlers(httpServer);

    httpServer.listen({ port: process.env.PORT },

      (): void => {

        logger.log('info', `Express server listening on port ${process.env.PORT}`);

      });

  }).catch(err => {

    consola.error({

      message: `Unable to start the server \n${err.message}`,

      badge: true

    });

  })