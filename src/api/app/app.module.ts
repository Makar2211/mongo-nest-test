import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { WatchlistModule } from '../watchlist/watchlist.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			load: [configuration]
		}),
		MongooseModule.forRoot(process.env.MONGO_URL),
		UserModule,
		AuthModule,
		WatchlistModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
