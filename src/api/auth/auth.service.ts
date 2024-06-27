import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) { }

	async hashPassword(password: string): Promise<string> {
		const saltOrRounds = 10;
		return bcrypt.hash(password, saltOrRounds);
	}

	async decodePassword(password: string) {
		const hashPassword = await this.hashPassword(password)
		const isMatch = await bcrypt.compare(password, hashPassword);
		return isMatch
	}

	generateToken(user: any): Promise<string> {
		const payload = { _id: user._id, email: user.email };
		return this.jwtService.signAsync(payload)
	}
}
