import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        login(email: String!, password: String!): LoginResponse
    }

    type LoginResponse {
        user_id: String!
        role: String!
        token: String!
        expiresIn: Int!
    }
`;

export default typeDefs;