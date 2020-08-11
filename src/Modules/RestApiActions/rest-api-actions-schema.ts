import { gql } from 'apollo-server';

const typeDefs = gql`
    extend type Query {
        users: [UserDetails]
    }

    type UserDetails {
        id: String
        name: String
        phone: String
        company: CompanyDetails
    }

    type CompanyDetails {
        name: String
        bs: String
    }
`;

export default typeDefs;