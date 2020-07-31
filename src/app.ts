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

import { CommonOperationModule } from './Modules/CommonOperations/common-operations.module';

import { AdminOperationModule } from './Modules/AdminOperations/admin-operations.module';
import { AuthenticationModule } from './Modules/Authentication/authentication.module';


import consola from 'consola';

import  logger  from './utils/logger';
const isAuth = require('./middleware/authenticationGuard');
const config = require('./config');


  // initialize the app

  const app = express();

  // check JWT token [Middleware]
  app.use(isAuth); 

  // starting apollo-express-server

  const server = new ApolloServer({

    modules: [

      LoginModule,

      RegistrationModule,

      CommonOperationModule,

      AdminOperationModule,

      AuthenticationModule

    ],

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
    }

  });

  app.use('*', cors());

  app.use(compression());

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