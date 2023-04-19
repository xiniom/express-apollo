import {RESTDataSource} from 'apollo-datasource-rest';
import dotenv from 'dotenv';
dotenv.config();

export default class PersonAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.PERSON_API_URL;
    }

    async getAllPersons() {
        const response = await this.get('persons');
        return Array.isArray(response)
            ? response.map(person => this.personReducer(person))
            : [];
    }

    personReducer(person) {
        return {
            id: person.id || "0",
            name: person.name || '',
            age: person.age || 0,
        };
    }
}
