
import Constants from '../../contants/constants';
import ItemLists from '../../Models/Products/ItemLists.model';
export default {

    Query: {
        fetchProductCategories: async() => {
            const categories = Constants.CATEGORY;
            const category: any = [];
            await categories.forEach(elem => {
                const categoryObj = {
                    key: elem,
                    value: elem
                };
                category.push(categoryObj);
            });

            return {
                __typename: 'ProductCategoryLists',
                statusCode: 200,
                categories: category
            }
        },

        fetchAllProducts: async() => {
            const itemAdded = await ItemLists.find();

            if (itemAdded) {
                return {
                    __typename: 'ProductDetails',
                    statusCode: 200,
                    products: itemAdded
                }
            } else {
                return {
                    __typename: 'ProductDetails',
                    statusCode: 200,
                    products: []
                }
            }
        }
    }
}