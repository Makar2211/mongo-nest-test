import { Body, Controller, Delete, HttpCode, HttpStatus, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto, LogInUserReqDto, LogInUserResDto, UpdateUserDto, createUserResponseDto } from './dto/userDTO';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) { }
	@ApiTags('API')
	@ApiResponse({
		status: HttpStatus.CREATED,
		type: createUserResponseDto
	})
	@Post('sign-up')
	async signUp(@Body() createUserDto: CreateUserDto): Promise<createUserResponseDto> {
		return await this.userService.createUser(createUserDto)
	}


	@ApiTags('API')
	@ApiResponse({
		status: HttpStatus.OK,
		type: LogInUserResDto
	})
	@Post('sign-in')
	logInUser(@Body() loginUserDto: LogInUserReqDto): Promise<LogInUserResDto> {
		try {
			return this.userService.signIn(loginUserDto)
		} catch (error) {
			console.error('Error during sign-in:', error.message);
			throw new Error('Login failed');
		}
	}

	@ApiTags('API')
	@ApiResponse({
		status: HttpStatus.CREATED,
		type: UpdateUserDto
	})
	@UseGuards(AuthGuard('jwt'))
	@Patch('update')
	updateUser(@Body() updateUserDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {
		const user = request.user
		return this.userService.updateUser(user._id, updateUserDto)
	}


	@ApiTags('API')
	@ApiResponse({
		status: HttpStatus.NO_CONTENT,
		type: [Boolean]
	})
	@UseGuards(AuthGuard('jwt'))
	@Delete('delete')
	deleteUser(@Req() request): Promise<boolean> {
		return this.userService.deleteUser(request.user._id)
	}


}
