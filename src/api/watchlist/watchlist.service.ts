import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WatchListModel } from './models/watchlist.model';
import { Model } from 'mongoose';
import { WatchListDto } from './dto/watchListDto';

@Injectable()
export class WatchlistService {
	constructor(@InjectModel(WatchListModel.name) private watchListRepository: Model<WatchListModel>
	) { }


	async createAsset(user, dto: WatchListDto) {
		const watchList = {
			user: user._id,
			name: dto.name,
			assetId: dto.assetId
		}
		new this.watchListRepository(watchList).save()

		return watchList
	}

	async getAllAssets(_id: string) {

		return await this.watchListRepository.find({ user: _id })
	}

	async updateAccet(id: string, updateAccetDto: WatchListDto) {
		await this.watchListRepository.findByIdAndUpdate(id, {
			name: updateAccetDto.name,
			assetId: updateAccetDto.assetId
		})
		return true
	}

	async deleteAccet(id: string) {
		const isCorrectId = await this.watchListRepository.findById(id)
		if (!isCorrectId) throw new HttpException("Такой криптовалюты нет в листе", HttpStatus.NOT_FOUND)
		await this.watchListRepository.findByIdAndDelete(id)
		return true
	}
}
