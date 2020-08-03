import { gql } from 'apollo-server';

const typeDefs = gql`
    extend type Mutation {
        saveProduct(itemDetails: ItemDetails): ProductSaveResponse!
        updatetProduct(itemDetails: UpdateItemDetails) : UpdateResponse!
        deletetProduct(itemDetails: DeleteItemDetails): DeleteResponse!
    }

    extend type Query {
        fetchAllSavedProducts: ProductDetailsResponse!
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
        productId: String
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

    type ProductDetailsResponse {
        statusCode: Int!
        products: [ProductLists!]
    }

    type ProductLists {
        
        itemName: String
        category: String
        id: String
        quantity: String
        pricePerKg: String
        pickupDate: String
        location: String
        pickupTime: String
        pickupStatus: String
        productId: String
        userComment: String
        adminComment: String
    }

`;
export default typeDefs;