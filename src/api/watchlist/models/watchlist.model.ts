import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/api/user/model/user.model';

export type WatchListDocument = HydratedDocument<WatchListModel>;

@Schema()
export class WatchListModel {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	user: User;

	@Prop()
	name: string;

	@Prop()
	assetId: string;
}

export const WatchListSchema = SchemaFactory.createForClass(WatchListModel);