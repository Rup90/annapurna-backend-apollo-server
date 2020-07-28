import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import Db from './db';
import { LoginModule } from './Modules/Login/login.module';

  const app = express();
  const server = new ApolloServer({
    modules: [LoginModule],
    context: ({ req, res }) => ({ req, res }),
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