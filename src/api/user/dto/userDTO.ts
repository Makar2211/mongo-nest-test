import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { WatchListDto } from 'src/api/watchlist/dto/watchListDto';

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	firstName: string;


	@ApiProperty()
	@IsString()
	lastName: string;


	@ApiProperty()
	@IsEmail()
	email: string;


	@ApiProperty()
	@IsNotEmpty()
	password: string
}

export class createUserResponseDto {


	@ApiProperty()
	@IsString()
	firstName: string;


	@ApiProperty()
	@IsString()
	lastName: string;


	@ApiProperty()
	@IsEmail()
	email: string;


	@ApiProperty()
	@IsNotEmpty()
	password: string

	@ApiProperty()
	@IsArray()
	watchlist: WatchListDto[]
}

export class LogInUserReqDto {


	@ApiProperty()
	@IsEmail()
	email: string;


	@ApiProperty()
	@IsNotEmpty()
	password: string

}


class UserResponse {
	@ApiProperty()
	@IsString()
	_id: string

	@ApiProperty()
	@IsString()
	firstName: string;


	@ApiProperty()
	@IsString()
	lastName: string;


	@IsEmail()
	@ApiProperty()
	email: string;


	@IsNotEmpty()
	@ApiProperty()
	password: string
}
export class LogInUserResDto {
	@ApiProperty()
	user: UserResponse

	@ApiProperty()
	@IsString()
	access_token: string;
}

export class UpdateUserDto {
	@ApiProperty()
	@IsString()
	firstName: string;


	@ApiProperty()
	@IsString()
	lastName: string;


	@IsEmail()
	@ApiProperty()
	email: string;

}

