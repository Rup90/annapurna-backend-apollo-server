import { gql } from 'apollo-server';

const typeDefs = gql`
    extend type Mutation {
        saveProduct(itemDetails: ItemDetails): ProductSaveResponse!
        updatetProduct(itemDetails: UpdateItemDetails) : UpdateResponse!
        deletetProduct(itemDetails: DeleteItemDetails): DeleteResponse!
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

    type Subscription {
        itemAdded: ItemAddedNotification
    }

    type ItemAddedNotification {
        itemName: String
        user_firstName: String
        user_lastName: String
        user_id: String
        id: String
    }

     input UpdateItemDetails {

        itemName: String
        category: String
        productId: String
        quantity: String
        pricePerKg: String
        pickupDate: String
        location: String
        pickupTime: String
        adminComment: String
        userComment: String
        id: String
    }

    type UpdateResponse {
        statusCode: Int
        response: String
    }

    input DeleteItemDetails {
        productId: String
    }

    type DeleteResponse {
        statusCode: Int!
        response: String
    }

`;
export default typeDefs;