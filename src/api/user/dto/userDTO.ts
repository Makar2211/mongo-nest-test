import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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

export class LogInUserDto {

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

	@ApiProperty()
	@IsString()
	access_token: string;
}