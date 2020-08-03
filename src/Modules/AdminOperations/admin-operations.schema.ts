import { gql } from 'apollo-server';

const typedefs = gql`
    
    extend type Query {
        userAddedProducts(filteredBy: String!): UserAddedProductsDetails
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


    extend type Mutation {
        adminOperations(inputParams: AdminOperationInput!): AdminOperationResponse!
        addNewProduct(inputParams: NewProductAddParam!, image: Upload!): NewProductAddedResponse!
        updateAddedProduct(inputParams: NewProductAddParam!, image: Upload!): NewProductAddedResponse!
        deleteProduct(itemName: String! ): ProductDeletedResponse!
    }

    input AdminOperationInput {
        pickupStatus: String
        u_id: String
        productId: String
        adminComment: String
    }

    type AdminOperationResponse {
        statusCode: Int!
        message: String!
    }

    input NewProductAddParam {
        itemName: String
        category: String
    }

    type NewProductAddedResponse {
        statusCode: Int!
        itemName: String!
        message: String!
    }

    type ProductDeletedResponse {
        statusCode: Int!
        message: String!
    }
    

`;

export default typedefs;