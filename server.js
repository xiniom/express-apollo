import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers.js';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DUMMY);
const port = 4000;
const path = '/graphql';
const app = express();  

const server = new ApolloServer({
    typeDefs: gql(readFileSync('./schema.gql', { encoding: 'utf8' })),
    resolvers,
});
  
server.start().then(res => {
    server.applyMiddleware({ app, path });
    app.listen({ port }, () => console.log(`GraphQL Server running at http://localhost:${port}/graphql`));
});
 

