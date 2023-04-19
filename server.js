import { ApolloServer,  } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers.js';
import PersonAPI from './datasources/person.js';
import CountryAPI from './datasources/country.js';

const port = 4000;
const server = new ApolloServer({
    typeDefs: readFileSync('./schema.gql', { encoding: 'utf8' }),
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async () => {
        return { 
            dataSources: {
                countryAPI: new CountryAPI(),
                personAPI: new PersonAPI(),
            } 
        };
    }
});

console.log(`🚀  Server ready at: ${url}`);


