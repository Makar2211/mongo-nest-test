import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { WatchListModel } from 'src/api/watchlist/models/watchlist.model';

import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop()
	firstName: string;

	@Prop()
	lastName: string;

	@Prop({ unique: true })
	email: string;

	@Prop()
	password: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: WatchListModel.name }] })
	watchlist: WatchListModel[]
}

export const UserSchema = SchemaFactory.createForClass(User);