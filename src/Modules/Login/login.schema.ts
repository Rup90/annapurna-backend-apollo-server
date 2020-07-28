import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        login(email: String!, password: String!): LoginResponse
    }

    union LoginResponse = LoginSuccessResponse | LoginFaliureResponse

    type LoginSuccessResponse {
        statusCode: Int!
        response: SuccessResponse!
    }

    type LoginFaliureResponse {
        statusCode: Int!
        response: FailureResponse!
    }

    type SuccessResponse {
        user_id: String!
        role: String!
        token: String!
        expiresIn: Int!
    }

    type FailureResponse {
        message: String!
    }
`;

export default typeDefs;