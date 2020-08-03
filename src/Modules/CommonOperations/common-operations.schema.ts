import { gql } from 'apollo-server';
import { Upload } from './common-operations.interface';
const typedefs = gql`

    extend type Query {
        fetchProductCategories: ProductCategoryLists
        fetchAllProducts: ProductDetails
        getUserInfo: UserInformationsResponse
    }

    type ProductCategoryLists {
        statusCode: Int
        categories: [caterory]
    }

    type caterory {
        key: String
        value: String
    }

    type ProductDetails {
        statusCode: Int
        products: [items!]!
    }

    type items {
        itemName: String
        category: String
        itemImage: String
        id: String
    }

    type UserInformationsResponse {
        statusCode: Int
        userInfo: UserInformations
    }

    type UserInformations {
        id: String
        firstName: String
        lastName: String
        email: String
        phoneNumber: String
        address: String
        role: String
        avatar: String
    }

    scalar Upload

    extend type Mutation {
        addAvatarImage(name: String!, file: Upload!): AvatarUploadResponse
        updateUserInfo(userInput: UserInfo): UserInformationsResponse
    }

    type AvatarUploadResponse {
        statusCode: Int
        avatar: String
    }

    input UserInfo {
        firstName: String
        lastName: String
        email: String
        phoneNumber: String
        address: String
        role: String
    }
`;

export default typedefs;
