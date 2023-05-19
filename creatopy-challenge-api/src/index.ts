import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import db from '../models';

const server = new ApolloServer({typeDefs, resolvers});

db.sequelize.sync().then(() => {
    server.listen().then(({url}:{url: string}) => {
        console.log(`Server listening at ${url}`);
    })
})



