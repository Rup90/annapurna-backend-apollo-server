
import FarmarAddedItemLists from '../../Models/UserAddedProducts/UserAddedProducts.model';
export default {
    Query: {
        userAddedProducts: async (parent: any, args: any, context: any, info: any) => {
            const filter = args.filterdBy;
            const allItems = await FarmarAddedItemLists.find().where('pickupStatus').equals(filter);
            if (allItems.length > 0) {
                return await {
                    __typename: 'UserAddedProductsDetails',
                    statusCode: 200,
                    products: allItems
                }
            } else {
                return await {
                    __typename: 'UserAddedProductsDetails',
                    statusCode: 200,
                    products: []
                }
            }
        }
    }
}