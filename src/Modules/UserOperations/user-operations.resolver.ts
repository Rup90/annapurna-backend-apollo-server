import RegisteredUserModel from '../../Models/RegisteredUsers/RegisteredUsers.model';
import authGuard from '../../middleware/authGuard';
export default {
    Mutation: {
        saveProducts: async (parent: any, args: any, context: any, info: any) => {
            const {
                itemName, category, pricePerKg, location,
                productId, quantity, pickupDate, pickupTime
            } = args.itemDetails;
            // const user  = await RegisteredUserModel.findOne({email: })

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
            return {
                __typename: 'ProductSaveResponse',
                statusCode: 200,
                response: "Item added successfully"
            }
            // user['itemsAdded'].push(item);
            // user.save();
            // const notficationPaylod = {
            //     ...item,
            //     u_id: ctx.user_id,
            //     itemId: itemInput.id,
            //     user_firstName: user.firstName,
            //     user_lastName: user.lastName
            // };
            // const farmerItem = new FarmarAddedItemLists(notficationPaylod);
            // farmerItem.save();
        }
    }
}