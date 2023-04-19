import { data } from './data.js';
export const resolvers = {
    Query: {
        person: (parent, args, context, info) => {
            console.log(args)
            const res =  data.persons.find(person => person.id === args.id);
            console.log(res);
            return res;
        },
        persons: (parent, args, {dataSources}, info) => {
            return dataSources.personAPI.getAllPersons();
        },
        post: (parent, args, context, info) => {
            return data.posts.find(post => post.id === args.id);
        },
        posts: (parent, args, context, info) => {
            return data.posts;
        },
        countries: (parent, args, {dataSources}, info) => {
            return dataSources.countryAPI.getAllCountries();
        },
    },
    Person: {
        posts: (parent, args, context, info) => {
            return data.posts.filter(post => post.author === parent.id);
        }
    },
    Post: {
        author: (parent, args, context, info) => {
            return data.persons.find(person => person.id === parent.author);
        }
    },
}
