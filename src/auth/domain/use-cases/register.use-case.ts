import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject('UserRepositoryPort')
        private readonly userRepository: UserRepositoryPort
    ) { }

    async execute(email: string, passwordPlain: string, fullName: string): Promise<User> {
        const saltOrRounds = 10;
        const passwordHash = await bcrypt.hash(passwordPlain, saltOrRounds);
        const newUser = new User();
        newUser.email = email;
        newUser.password = passwordHash;
        newUser.fullName = fullName;
        return this.userRepository.save(newUser);
    }
}