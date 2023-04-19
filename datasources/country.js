import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core/core.cjs";
import { HttpLink } from "@apollo/client/link/http/http.cjs";

import dotenv from 'dotenv';
dotenv.config();

const query = gql`
    query ExampleQuery {
        countries {
            name
            code
            currency
        }
    }
`;

/**
 * CountryAPI is a data source which connects to a public GraphQL API to get a list of countries
 * we use apollo-client to connect to the API
 */
export default class CountryAPI {
    //constructor() {
    //    super();
    //}

    async getAllCountries() {
        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link: new HttpLink({
                uri: process.env.COUNTRY_API_URL,
            }),
        });
        const data = await client.query({query});
        return Array.isArray(data.data.countries)
            ? data.data.countries.map(country => this.countryReducer(country))
            : [];
    }

    countryReducer(country) {
        return {
            name: country.name || '',
            code: country.code || '',
            currency: country.currency || '',
        };
    }

}