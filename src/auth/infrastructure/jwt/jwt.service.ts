import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAdapter {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async sign(payload: { id: string }): Promise<string> {
        const secret = this.configService.get('jwt.secret');
        const expiresIn = this.configService.get('jwt.expiresIn');
        return this.jwtService.signAsync(payload, { secret, expiresIn: expiresIn + 's' });
    }

    async verify(token: string): Promise<any> {
        const secret = this.configService.get('jwt.secret');
        try {
            return await this.jwtService.verifyAsync(token, { secret });
        } catch (error) {
            return null;
        }
    }
}