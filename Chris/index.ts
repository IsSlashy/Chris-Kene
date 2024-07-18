// index.ts
import { ApolloServer, gql } from 'apollo-server-micro';
import mongoose from 'mongoose';
import { VercelRequest, VercelResponse } from '@vercel/node';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const handler = server.createHandler({ path: '/api/graphql' });

const MONGO_URI = 'your-mongodb-uri';

let isConnected = false;

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!isConnected) {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
  }
  return handler(req, res);
};
