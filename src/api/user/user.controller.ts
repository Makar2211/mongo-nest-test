import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto, LogInUserDto } from './dto/userDTO';
import { UserService } from './user.service';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) { }

	@ApiResponse({
		status: 201,
		type: CreateUserDto
	})
	@Post('sign-up')
	async signUp(@Body() createUserDto: CreateUserDto) {
		return await this.userService.createUser(createUserDto)
	}


	@ApiResponse({
		status: HttpStatus.OK,
		type: LogInUserDto
	})
	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	logInUser(@Body() loginUserDto: any): Promise<LogInUserDto> {
		try {
			return this.userService.signIn(loginUserDto)
		} catch (error) {
			console.error('Error during sign-in:', error.message);
			throw new Error('Login failed');
		}
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('protected')
	async protectedRoute(@Request() req) {
		return { message: 'This is a protected route', user: req.body };
	}

}
