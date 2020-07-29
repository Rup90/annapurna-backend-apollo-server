import { gql } from 'apollo-server';

const typeDefs = gql`
    type Mutation {
        saveProducts(itemDetails: ItemDetails): ProductSaveResponse
    }


    input ItemDetails {
        itemName: String
        category: String
        productId: String
        quantity: String
        pricePerKg: String
        pickupDate: String
        location: String
        pickupTime: String
    }

    type ProductSaveResponse {
        statusCode: Int!
        response: String!
    }
`;

export default typeDefs;