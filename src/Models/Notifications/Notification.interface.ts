import { Document } from 'mongoose';

export default interface Notifications extends Document {
    id: string;
    itemName: string;
    user_id: string;
    user_firstName: string;
    user_lastName: string;
    productId: string;
}