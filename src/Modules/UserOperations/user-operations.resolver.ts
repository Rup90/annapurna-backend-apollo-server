import RegisteredUserModel from '../../Models/RegisteredUsers/RegisteredUsers.model';
import authGuard from '../../middleware/authGuard';
import { PubSub } from 'graphql-subscriptions';
import {NotificationType} from '../../contants/constants';
import FarmarAddedItemListsModel from '../../Models/AdminApprovalProducts/Admin-approval-item.model';
const pubsub = new PubSub();
export default {
    Mutation: {
        saveProduct: async (parent: any, args: any, context: any, info: any) => {
            const {
                itemName, category, pricePerKg, location,
                productId, quantity, pickupDate, pickupTime
            } = args.itemDetails;
            const user: any  = await RegisteredUserModel.findById({_id: context.user_id })
            const item = {
                itemName: itemName,
                category: category,
                id: productId,
                quantity: quantity,
                pricePerKg: pricePerKg,
                pickupDate: pickupDate,
                location: location,
                pickupTime: pickupTime,
                pickupStatus: 'Pending',
                userComment: '',
                adminComment: '',
            };

            const notificationPayload = {
                itemName: 'String',
                user_firstName: 'String',
                user_lastName: 'String',
                user_id: 'String',
                id: 'String'
            }
            user['itemsAdded'].push(item);
            user.save();
            const notficationPaylod = {
                ...item,
                u_id: context.user_id,
                productId: productId,
                user_firstName: user.firstName,
                user_lastName: user.lastName
            };
            const farmerItem = new FarmarAddedItemListsModel(notficationPaylod);
            farmerItem.save();
            pubsub.publish(NotificationType.AddItems, { itemAdded: notificationPayload });
            return {
                __typename: 'ProductSaveResponse',
                statusCode: 200,
                response: "Item added successfully"
            }
        },

        updatetProduct: async (parent: any, args: any, context: any, info: any) => {
            const {
                itemName, category, pricePerKg, location, id, 
                productId, quantity, pickupDate, pickupTime, adminComment
            } = args.itemDetails;
            console.log(adminComment);
            // await RegisteredUserModel.findOneAndUpdate({_id: ctx.user_id, itemsAdded: {$elemMatch: {itemName: itemName}}},
            //     {$set: {'itemsAdded.$.quantity': quantity,
            //             'itemsAdded.$.pricePerKg': pricePerKg,
            //             'itemsAdded.$.pickupDate': pickupDate,
            //             'itemsAdded.$.pickupTime': pickupTime,
            //             'itemsAdded.$.location': location,
            //             'itemsAdded.$.adminComment': args.userInput?.adminComment,
            //             'itemsAdded.$.userComment': args.userInput?.userComment
            //         }}, {
            //                 new: true,
            //                 upsert: true,
            //                 rawResult: true
            //               });
            // const filter = {
            //     u_id: ctx.user_id,
            //     itemId: itemInput.id
            // };
            // await FarmarAddedItemLists.findOneAndUpdate(filter, {
            //     $set: {
            //         userComment: itemInput?.userComment
            //     }
            // });
            // const user = await RegisteredUserModel.findById(ctx.user_id);
            return {
                __typename: 'UpdateResponse',
                statusCode: 200,
                response: "Item updated successfully"
            }
        },

        deletetProduct: async (parent: any, args: any, context: any, info: any) => {
            try {

                const user: any = await RegisteredUserModel.updateOne({ _id: context.user_id }, { $pull: { itemsAdded: { productId: args.itemDetails.productId } }}, 
                { safe: true, multi:true }, function(err, obj) {
                    //do something smart
                });
                console.log(user);
                return {
                        __typename: 'DeleteResponse',
                        statusCode: 200,
                        response: "Item deleted successfully"
                    }
                
            } catch (error) {
                console.log('err0r =>', error);
                return {
                    __typename: 'DeleteResponse',
                    statusCode: 422,
                    response: "Something is wrong. Please try again."
                }
                
            }
        }

    },

    Subscription: {
        itemAdded: {
          // Additional event labels can be passed to asyncIterator creation
          subscribe: async (parent: any, args: any, context: any, info: any) => {
            const asyncIterator = pubsub.asyncIterator([NotificationType.AddItems]);
            return asyncIterator;
          }
        }
    },

    Query: {

        fetchAllSavedProducts: async (parent: any, args: any, context: any, info: any) => {
            console.log('context ==>', context.user_id);
            const user: any = await RegisteredUserModel.findById(context.user_id);
            if (user) {
                return {
                    __typename: 'ProductDetailsResponse',
                    statusCode: 200,
                    products: user['itemsAdded']
                }
            } else {
                return {
                    __typename: 'ProductDetailsResponse',
                    statusCode: 200,
                    products: []
                }
            }
        }
    }
}