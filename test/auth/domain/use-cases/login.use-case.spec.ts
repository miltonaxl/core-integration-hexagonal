import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCase } from '../../../../src/auth/domain/use-cases/login.use-case';
import { UserRepositoryPort } from '../../../../src/auth/domain/ports/user.repository.port';
import { JwtAdapter } from '../../../../src/auth/infrastructure/jwt/jwt.service';
import { User } from '../../../../src/auth/domain/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('LoginUseCase', () => {
    let loginUseCase: LoginUseCase;
    let userRepository: Partial<UserRepositoryPort>;
    let jwtAdapter: Partial<JwtAdapter>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LoginUseCase,
                {
                    provide: 'UserRepositoryPort',
                    useValue: {
                        findByEmail: jest.fn(),
                    },
                },
                {
                    provide: JwtAdapter,
                    useValue: {
                        sign: jest.fn(),
                    },
                },
            ],
        }).compile();

        loginUseCase = module.get<LoginUseCase>(LoginUseCase);
        userRepository = module.get<UserRepositoryPort>('UserRepositoryPort');
        jwtAdapter = module.get<JwtAdapter>(JwtAdapter);
    });

    it('should be defined', () => {
        expect(loginUseCase).toBeDefined();
    });

    it('should throw UnauthorizedException if user is not found', async () => {
        const email = 'test@example.com';
        const password = 'password123';

        (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

        await expect(loginUseCase.execute(email, password))
            .rejects.toThrow(UnauthorizedException);

        expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
        expect(jwtAdapter.sign).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if password does not match', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const hashedPassword = await bcrypt.hash('wrongPassword', 10);
        const user = { id: 'user-id', email, password: hashedPassword } as User;

        (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);

        await expect(loginUseCase.execute(email, password))
            .rejects.toThrow(UnauthorizedException);

        expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
        expect(jwtAdapter.sign).not.toHaveBeenCalled();
    });

    it('should return an access token if credentials are valid', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { id: 'user-id', email, password: hashedPassword } as User;
        const accessToken = 'mocked-access-token';

        (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
        (jwtAdapter.sign as jest.Mock).mockResolvedValue(accessToken);

        const result = await loginUseCase.execute(email, password);

        expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
        expect(jwtAdapter.sign).toHaveBeenCalledWith({ id: user.id });
        expect(
            {
                accessToken: result.accessToken,
                user: { id: result.user.id, email: result.user.email },
            }
        ).toEqual({ accessToken, user: { id: user.id, email: user.email } });
    });
});