import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import Notifications from './Notification.interface';
import Constants from '../../contants/constants';

const NotificationSchema: Schema = new Schema({
    itemName: { type: String, required: true },
    user_id: { type: String, required: true },
    user_firstName: { type: String},
    user_lastName: { type: String },
    productId: { type: String, required: true }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default mongoose.model<Notifications>('Notifications', NotificationSchema);