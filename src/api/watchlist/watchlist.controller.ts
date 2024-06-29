import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDto } from './dto/watchListDto';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccetResponse, GetAccetsResponse } from './response';

@Controller('watchlist')
export class WatchlistController {
	constructor(private readonly watchListService: WatchlistService) { }
	@ApiTags('Watch List')
	@ApiResponse({
		status: HttpStatus.OK,
		type: CreateAccetResponse
	})
	@UseGuards(AuthGuard('jwt'))
	@Post('create-accet')
	createAsset(@Body() createAssetDto: WatchListDto, @Req() request): Promise<CreateAccetResponse> {
		const user = request.user
		return this.watchListService.createAsset(user, createAssetDto)
	}

	@ApiTags('Watch List')
	@ApiResponse({
		status: HttpStatus.CREATED,
		type: [GetAccetsResponse]
	})
	@UseGuards(AuthGuard('jwt'))
	@Get('get-all')
	getAssets(@Req() request) {
		const { _id } = request.user

		return this.watchListService.getAllAssets(_id)
	}

	@ApiTags('Watch List')
	@ApiParam({
		name: "id",
		type: [String]
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: [Boolean]
	})
	@UseGuards(AuthGuard('jwt'))
	@Patch('update/:id')
	updateAccet(@Body() updateAccetDto: WatchListDto, @Param() params: { id: string }): Promise<boolean> {
		const { id } = params
		return this.watchListService.updateAccet(id, updateAccetDto)
	}


	@ApiTags('Watch List')
	@ApiResponse({
		status: HttpStatus.OK,
		type: [Boolean]
	})

	@UseGuards(AuthGuard('jwt'))
	@Delete('delete/:id')
	@ApiParam({
		name: "id",
		type: [String]
	})
	deleteAsset(@Param() params: { id: string }): Promise<boolean> {
		const { id } = params
		return this.watchListService.deleteAccet(id)
	}

}
