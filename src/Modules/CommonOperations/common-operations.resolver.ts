
import Constants from '../../contants/constants';
import ItemLists from '../../Models/Products/ItemLists.model';
import RegisteredUsers from '../../Models/RegisteredUsers/RegisteredUsers.model';
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
    },

    Mutation: {
        addAvatarImage: async (parent: any, { name, file }: any, context: any) => {
            console.log('name ==>', name);
            const { filename, mimetype, createReadStream } = await file;
            const path = __dirname + `/../images/avatar/${filename}`;
            const userImagePath = `images/avatar/${filename}`;
            const stream = createReadStream();
            const uid = { _id: context.user_id };
            const response = {
                statusCode: 200,
                avatar: ''
            }
            console.log('userImagePath ==>', userImagePath);
            // await RegisteredUsers.findOneAndUpdate(uid, {avatar: userImagePath}, {
            //     new: true
            // }, (err, res)  => {
            //     if (err) {
            //         response.statusCode = 401;
            //     } else {
            //         response.avatar = userImagePath;
            //     }
            // });
            return {
                __typename: 'AvatarUploadResponse',
                ...response
            };
        }
    }
}