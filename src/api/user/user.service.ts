import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, LogInUserResDto, UpdateUserDto, LogInUserReqDto, createUserResponseDto } from './dto/userDTO';
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

	async createUser(createUserDto: CreateUserDto): Promise<createUserResponseDto> {
		const isUser = await this.checkUserEmail(createUserDto.email)

		if (isUser) throw new HttpException("Такой пользователь уже существует", HttpStatus.BAD_REQUEST)

		const hashPassword = await this.authService.hashPassword(createUserDto.password)

		const { password, ...user } = createUserDto

		const newUser = new this.userModel({ ...user, password: hashPassword }).save()

		return newUser
	}

	async signIn(userDto: LogInUserReqDto): Promise<LogInUserResDto> {
		const user = await this.checkUserEmail(userDto.email)
		if (!user) throw new HttpException("Такого пользователя нет", HttpStatus.NOT_FOUND)

		const userPassword = await this.authService.decodePassword(userDto.password, user.password)
		if (!userPassword) throw new HttpException("Неверный пароль", HttpStatus.NOT_FOUND);

		const token = await this.authService.generateToken(user)
		return {
			user,
			access_token: token,
		};
	}

	async updateUser(_id: string, updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
		await this.userModel.findByIdAndUpdate(_id, { $set: updateUserDto }, { new: true });
		return updateUserDto
	}

	async deleteUser(_id: string): Promise<boolean> {
		await this.userModel.findByIdAndDelete(_id)
		return true
	}




}
