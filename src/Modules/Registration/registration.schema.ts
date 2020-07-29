import { gql } from "apollo-server";

 

const typeDefs = gql`

    type Mutation {

        register(userInput: RegisterInput): RegistrationResponse
    }

 

    union RegistrationResponse = RegistrationSuccessResponse | RegistrationFailureResponse

    type RegistrationSuccessResponse {

        statusCode: Int!

        response: RegistrationSuccessRes!

    }

    type RegistrationFailureResponse {

        statusCode: Int!

        response: RegistrationFailureRes!

    }


    type RegistrationSuccessRes {

        userId: String!

        firstName: String!

        lastName: String!

        role: String!

        token: String!

        refreshToken: String!

    }

    type RegistrationFailureRes {

        message: String!

    }

    input RegisterInput {

        firstName: String!

        lastName: String!

        email: String!

        password: String!

        role: String!

    }

 

`

 

export default typeDefs;

 

 