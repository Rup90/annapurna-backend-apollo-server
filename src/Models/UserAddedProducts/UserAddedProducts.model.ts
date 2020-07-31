import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import UserAddedItemLists from './UserAddedProduct.interface';
import Constants from '../../contants/constants';

const UserAddedItemSchema: Schema = new Schema({
    itemName: { type: String, required: true },
    category: { type: String, enum: Constants.CATEGORY, required: true },
    quantity: { type: Number, required: true },
    pricePerKg: { type: Number, required: true },
    pickupDate: { type: String, required: true },
    location: { type: String, required: true },
    pickupTime: { type: String, required: true },
    pickupStatus: { type: String, required: true },
    u_id: { type: String, required: true },
    userComment: { type: String},
    adminComment: { type: String },
    user_firstName: { type: String},
    user_lastName: { type: String },
    productId: { type: String, required: true }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default mongoose.model<UserAddedItemLists>('FarmarAddedItemLists', UserAddedItemSchema);