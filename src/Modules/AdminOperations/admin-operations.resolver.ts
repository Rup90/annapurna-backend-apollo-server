
import FarmarAddedItemLists from '../../Models/UserAddedProducts/UserAddedProducts.model';
import RegisteredUserModel from '../../Models/RegisteredUsers/RegisteredUsers.model';
import { ValidationError } from '../../contants/constants';
import { createWriteStream } from 'fs';
import ItemLists from '../../Models/Products/ItemLists.model';
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
    },

    Mutation: {
        adminOperations: async (parent: any, args: any, context: any, info: any) => {

            const { u_id, productId, adminComment, pickupStatus } = args.inputParams;
            await FarmarAddedItemLists.find()
            .where('u_id').equals(u_id)
            .where('productId').equals(productId)
            .update({$set:
                {
                    pickupStatus: pickupStatus,
                    adminComment: adminComment
                }
            });

            await RegisteredUserModel.findOneAndUpdate({_id: u_id, itemsAdded: {$elemMatch: {id: productId}}},
            {$set: {'itemsAdded.$.pickupStatus': pickupStatus,
                'itemsAdded.$.adminComment': adminComment
            }}, {
                    new: true,
                    upsert: true,
                    rawResult: true
                  });
            return {
                __typename: 'AdminOperationResponse',
                statusCode: 200,
                message: 'Successfully updated'
            }
        },

        addNewProduct: async (parent: any, args: any, context: any, info: any) => {
            console.log('args ==>', args);
            const { filename, mimetype, createReadStream } = await args.image;
            const { itemName, category } = args.inputParams;
            const path = __dirname + `/../../images/products/${filename}`;
            const userImagePath = `images/products/${filename}`;
            const file = createReadStream().pipe(createWriteStream(path));
            const itemAdded = await ItemLists.findOne({ itemName: itemName });
            if(itemAdded) {
                return {
                    __typename: 'NewProductAddedResponse',
                    statusCode: 200,
                    message: ValidationError.ITEM_ALREADY_ADDED
                }
            } else {
                const item = new ItemLists({
                    itemName: itemName,
                    category: category,
                    itemImage: userImagePath
                });
                item.save();
                return {
                    __typename: 'NewProductAddedResponse',
                    statusCode: 200,
                    message: 'Item added Successfully'
                }
            }
        },

        updateAddedProduct: async (parent: any, args: any, context: any, info: any) => {
            const { filename, mimetype, createReadStream } = await args.image;
            const { itemName, category } = args.inputParams;
            const path = __dirname + `/../../images/products/${filename}`;
            const userImagePath = `images/products/${filename}`;
            const file = createReadStream().pipe(createWriteStream(path));
            await ItemLists.find().where('itemName').equals(itemName)
                    .update({$set: {
                        itemImage: userImagePath
                    }
                });
            return {
                __typename: 'NewProductAddedResponse',
                statusCode: 200,
                message: 'Item added Successfully'
            }
        }
    }
}