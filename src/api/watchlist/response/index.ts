import { IsString } from 'class-validator'
import { ApiParam, ApiProperty } from '@nestjs/swagger';

export class CreateAccetResponse {
	@ApiProperty()
	@IsString()
	user: string

	@ApiProperty()
	@IsString()
	name: string

	@ApiProperty()
	@IsString()
	assetId: string
}


export class GetAccetsResponse {
	@ApiProperty()
	@IsString()
	_id: string

	@ApiProperty()
	@IsString()
	user: string

	@ApiProperty()
	@IsString()
	name: string

	@ApiProperty()
	@IsString()
	assetId: string
}

