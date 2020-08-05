import RegisteredUserModel from '../../Models/RegisteredUsers/RegisteredUsers.model';
import authGuard from '../../middleware/authGuard';
import { PubSub } from 'graphql-subscriptions';
import {NotificationType} from '../../contants/constants';
import FarmarAddedItemListsModel from '../../Models/UserAddedProducts/UserAddedProducts.model';
import NotificationModel from '../../Models/Notifications/Notification.model';
const pubsub = new PubSub();
export default {
    Mutation: {
        saveProduct: async (parent: any, args: any, context: any, info: any) => {
            const {
                itemName, category, pricePerKg, location,
                productId, quantity, pickupDate, pickupTime
            } = args.itemDetails;
            const { user_id } = info.session.req;
            const user: any  = await RegisteredUserModel.findById({_id: user_id });
            const item = {
                itemName: itemName,
                category: category,
                productId: productId,
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
                itemName: itemName,
                user_firstName: user.firstName,
                user_lastName: user.lastName,
                user_id: user_id,
                productId: productId
            }
            user['itemsAdded'].push(item);
            user.save();
            const notficationPaylod = {
                ...item,
                u_id: user_id,
                productId: productId,
                user_firstName: user.firstName,
                user_lastName: user.lastName
            };
            const farmerItem = new FarmarAddedItemListsModel(notficationPaylod);
            farmerItem.save();

            const notification = new NotificationModel(notificationPayload);
            notification.save();
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
            const { user_id } = info.session.req;
            await RegisteredUserModel.findOneAndUpdate({_id: user_id, itemsAdded: {$elemMatch: {itemName: itemName}}},
                {$set: {'itemsAdded.$.quantity': quantity,
                        'itemsAdded.$.pricePerKg': pricePerKg,
                        'itemsAdded.$.pickupDate': pickupDate,
                        'itemsAdded.$.pickupTime': pickupTime,
                        'itemsAdded.$.location': location,
                        'itemsAdded.$.adminComment': args.itemDetails?.adminComment,
                        'itemsAdded.$.userComment': args.itemDetails?.userComment
                    }}, {
                            new: true,
                            upsert: true,
                            rawResult: true
                          });
            const filter = {
                u_id: user_id,
                productId: productId
            };
            console.log(filter);
            await FarmarAddedItemListsModel.findOneAndUpdate(filter, {
                $set: {
                    userComment: args.itemDetails?.userComment,
                    quantity: quantity,
                    pricePerKg: pricePerKg,
                    pickupDate: pickupDate,
                    pickupTime: pickupTime,
                    location: location
                }
            });
            const user = await RegisteredUserModel.findById(user_id);
            return {
                __typename: 'UpdateResponse',
                statusCode: 200,
                response: "Item updated successfully"
            }
        },

        deletetProduct: async (parent: any, args: any, context: any, info: any) => {
            try {
                const { user_id } = info.session.req;
                console.log(args.itemDetails.productId);
                const user: any = await RegisteredUserModel.updateOne({ _id: user_id }, { $pull: { itemsAdded: { productId: args.itemDetails.productId } }}, 
                { safe: true, multi:true }, function(err, obj) {
                    //do something smart
                });
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
            const { user_id } = info.session.req;

            const user: any = await RegisteredUserModel.findById(user_id);
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