import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { JwtAdapter } from '../../infrastructure/jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('UserRepositoryPort') private readonly userRepository: UserRepositoryPort,
        private readonly jwtAdapter: JwtAdapter,
    ) { }

    async execute(email: string, passwordPlain: string): Promise<{ accessToken: string; user: User }> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(passwordPlain, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { id: user.id };
        const accessToken = await this.jwtAdapter.sign(payload);

        return { accessToken, user };
    }
}