import { gql } from 'apollo-server';

const typedefs = gql`
    
    extend type Query {
        userAddedProducts(filterdBy: String!): UserAddedProductsDetails
    }

    type UserAddedProductsDetails {
        statusCode: Int
        products: [Items!]
    }

    type Items {
        id: String
        itemName: String
        category: String
        quantity: String
        pricePerKg: String
        pickupDate: String
        location: String
        pickupTime: String
        pickupStatus: String
        u_id: String
        userComment: String
        adminComment: String
        user_firstName: String
        user_lastName: String
        productId: String
    }
`;

export default typedefs;