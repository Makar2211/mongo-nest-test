import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			secret: `${process.env.jwt_secret}`,
			signOptions: { expiresIn: '60s' },
		})],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]

})
export class AuthModule { }
