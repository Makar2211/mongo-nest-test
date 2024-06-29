import { Module } from '@nestjs/common';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchListModel, WatchListSchema } from './models/watchlist.model';
import { UserModule } from '../user/user.module';

@Module({
	imports: [MongooseModule.forFeature([{ name: WatchListModel.name, schema: WatchListSchema }])],
	controllers: [WatchlistController],
	providers: [WatchlistService]
})
export class WatchlistModule { }
