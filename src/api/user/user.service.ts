import { HttpException, HttpStatus,  Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, LogInUserDto } from './dto/userDTO';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private readonly authService: AuthService,
	) { }
	async checkUserEmail(email: string): Promise<any> {
		const isEmail = await this.userModel.findOne({ email: email })
		return isEmail
	}

	async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
		const isUser = await this.checkUserEmail(createUserDto.email)

		if (isUser) throw new HttpException("Такой пользователь уже существует", HttpStatus.BAD_REQUEST)

		const hashPassword = await this.authService.hashPassword(createUserDto.password)

		const { password, ...user } = createUserDto

		const newUser = new this.userModel({ ...user, password: hashPassword }).save()

		return newUser
	}

	async signIn(userDto: any): Promise<LogInUserDto> {
		const user = await this.checkUserEmail(userDto.email)
		const userPassword = await this.authService.decodePassword(userDto.password)

		if (!user) throw new HttpException("Такого пользователя нет", HttpStatus.NOT_FOUND)
		console.log()
		if (!userPassword) {
			throw new UnauthorizedException();
		}

		const token = await this.authService.generateToken(user)
		return {
			...user,
			access_token: token,
		};
	}

}
