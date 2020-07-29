import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import Db from './db';
import { LoginModule } from './Modules/Login/login.module';
import { UserOperationModule } from './Modules/UserOperations/user-operations.module';
import authGuard from './middleware/authGuard';

  const app = express();
  const server = new ApolloServer({
    modules: [LoginModule, UserOperationModule],
    context: ({ req, res }) => {
      // const token = req.headers.authorization || '';
      // const response = authGuard(token);
      // // if (!response) throw new AuthenticationError('you must be logged in'); 
      // return response;
      return req
    },
    validationRules: [depthLimit(7)],
  });
  app.use('*', cors());
  app.use(compression());
  server.applyMiddleware({ app, path: '/graphql' });

  Db.setupDb(new Db()).then(() => {
    const httpServer = createServer(app);
    httpServer.listen({ port: 3000 },
      (): void => console.log(`\n🚀GraphQL is now running on http://localhost:3000/graphql`));
  }).catch(err => {
    console.log('Error ==>', err);
  })