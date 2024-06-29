import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WatchListModel } from './models/watchlist.model';
import { Model } from 'mongoose';
import { WatchListDto } from './dto/watchListDto';
import { CreateAccetResponse } from './response';

@Injectable()
export class WatchlistService {
	constructor(@InjectModel(WatchListModel.name) private watchListRepository: Model<WatchListModel>
	) { }


	async createAsset(user, dto: WatchListDto): Promise<CreateAccetResponse> {
		try {
			const watchList = {
				user: user._id,
				name: dto.name,
				assetId: dto.assetId
			}
			new this.watchListRepository(watchList).save()

			return watchList
		} catch (error) {
			throw new Error(error)
		}
	}

	async getAllAssets(_id: string) {
		try {
			return await this.watchListRepository.find({ user: _id })
		} catch (error) {
			throw new Error(error)
		}
	}

	async updateAccet(id: string, updateAccetDto: WatchListDto): Promise<boolean> {
		try {
			await this.watchListRepository.findByIdAndUpdate(id, {
				name: updateAccetDto.name,
				assetId: updateAccetDto.assetId
			})
			return true
		} catch (error) {
			throw new Error(error)
		}
	}

	async deleteAccet(id: string): Promise<boolean> {
		try {
			const isCorrectId = await this.watchListRepository.findById(id)
			if (!isCorrectId) throw new HttpException("Такой криптовалюты нет в листе", HttpStatus.NOT_FOUND)
			await this.watchListRepository.findByIdAndDelete(id)
			return true
		} catch (error) {
			throw new Error(error)
		}
	}
}
