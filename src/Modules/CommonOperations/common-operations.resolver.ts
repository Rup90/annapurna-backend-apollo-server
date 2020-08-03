
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
        },

        getUserInfo: async(parent: any, args: any, context: any, info: any) => {
            
            const { user_id } = info.session.req;
            const user = await RegisteredUsers.findById(user_id);
            return {
                __typename: 'UserInformationsResponse',
                statusCode: 200,
                userInfo: user
            }
        }
    },

    Mutation: {
        addAvatarImage: async (parent: any, { name, file }: any, context: any) => {
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
        },

        updateUserInfo: async (parent: any, args: any, context: any) => {
            const { email, firstName, lastName, phoneNumber, address, role} = args.userInput;
            const filter = {email: email};
            const updatedInfo = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                address: address,
                role: role
            };
            const user = await RegisteredUsers.findOneAndUpdate(filter, updatedInfo, {
                new: true
            });
            return {
                __typename: 'UserInformationsResponse',
                statusCode: 200,
                userInfo: user
            }
        }
    }
}