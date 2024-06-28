import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDto } from './dto/watchListDto';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('watchlist')
export class WatchlistController {
	constructor(private readonly watchListService: WatchlistService) { }
	@ApiTags('Watch List')
	@ApiResponse({
		status: HttpStatus.OK,
		type: WatchListDto
	})
	@UseGuards(AuthGuard('jwt'))
	@Post('create-accet')
	createAsset(@Body() createAssetDto: WatchListDto, @Req() request) {
		const user = request.user
		return this.watchListService.createAsset(user, createAssetDto)
	}

	@ApiTags('Watch List')
	@ApiResponse({
		status: HttpStatus.OK,
		type: WatchListDto
	})
	@UseGuards(AuthGuard('jwt'))
	@Get('get-all')
	getAssets(@Req() request) {
		const { _id } = request.use

		return this.watchListService.getAllAssets(_id)
	}

	@ApiTags('Watch List')
	@ApiResponse({
		status: HttpStatus.OK,
		type: [Boolean]
	})
	@UseGuards(AuthGuard('jwt'))
	@Patch('update/:id')
	updateAccet(@Body() updateAccetDto: WatchListDto, @Param() params: { id: string }) {
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
	deleteAsset(@Param() params: { id: string }): Promise<boolean> {
		const { id } = params
		return this.watchListService.deleteAccet(id)
	}

}
