import { gql } from 'apollo-server';
import { Upload } from './common-operations.interface';
const typedefs = gql`

    extend type Query {
        fetchProductCategories: ProductCategoryLists
        fetchAllProducts: ProductDetails
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

    scalar Upload

    extend type Mutation {
        addAvatarImage(name: String!, file: Upload!): AvatarUploadResponse
    }

    type AvatarUploadResponse {
        statusCode: Int
        avatar: String
    }
`;

export default typedefs;
