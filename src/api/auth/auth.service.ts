import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/model/user.model';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) { }

	async hashPassword(password: string): Promise<string> {
		try {
			const saltOrRounds = 10;
			return bcrypt.hash(password, saltOrRounds);
		} catch (error) {
			throw new Error(error)
		}
	}

	async decodePassword(password: string, hashPassword: string): Promise<boolean> {
		try {
			const isMatch = await bcrypt.compare(password, hashPassword);
			return isMatch
		} catch (error) {
			throw new Error(error)
		}
	}

	generateToken(user: User): Promise<string> {
		try {
			const payload = { user };
			return this.jwtService.signAsync(payload)
		} catch (error) {
			throw new Error(error)
		}
	}
}
