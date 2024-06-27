import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			global: true,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('jwt_secret'),
				signOptions: { expiresIn: '30d' },
			}),
		}),
		ConfigModule,
		UserModule,],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
