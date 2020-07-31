import { gql } from 'apollo-server';

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
`;

export default typedefs;