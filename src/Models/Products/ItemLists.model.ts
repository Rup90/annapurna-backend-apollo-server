import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import ItemLists from './ItemLists.interface';
import Constants from '../../contants/constants';

const AddItemSchema: Schema = new Schema({
    itemName: { type: String, required: true },
    category: { type: String, enum: Constants.CATEGORY, required: true },
    itemImage: { type: String }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default mongoose.model<ItemLists>('ItemLists', AddItemSchema);