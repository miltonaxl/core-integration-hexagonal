import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUseCase } from '../../../../src/auth/domain/use-cases/register.use-case';
import { UserRepositoryPort } from '../../../../src/auth/domain/ports/user.repository.port';
import { User } from '../../../../src/auth/domain/entities/user.entity';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('RegisterUseCase', () => {
    let registerUseCase: RegisterUseCase;
    let userRepository: Partial<UserRepositoryPort>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RegisterUseCase,
                {
                    provide: 'UserRepositoryPort',
                    useValue: {
                        findByEmail: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        registerUseCase = module.get<RegisterUseCase>(RegisterUseCase);
        userRepository = module.get<UserRepositoryPort>('UserRepositoryPort');
    });

    it('should be defined', () => {
        expect(registerUseCase).toBeDefined();
    });



    it('should save the new user and return the created user if email is unique', async () => {
        const email = 'new@example.com';
        const password = 'newPassword';
        const fullName = 'New User';
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: User = { id: 'new-id', email, password: hashedPassword, fullName, };

        (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
        (userRepository.save as jest.Mock).mockResolvedValue(newUser);

        const result = await registerUseCase.execute(email, password, fullName);


        expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({
            email,
            fullName,
            password: expect.any(String),
        }));
        expect(result).toEqual(expect.objectContaining({
            id: expect.any(String),
            email,
            fullName,
        }));
    });

    it('should hash the password before saving the user', async () => {
        const email = 'test@example.com';
        const password = 'securePassword';
        const fullName = 'Another User';

        (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
        const saveMock = (user: User) => {
            expect(bcrypt.compareSync(password, user.password)).toBe(true);
            return { ...user, id: 'some-id' };
        };
        (userRepository.save as jest.Mock).mockImplementation(saveMock);

        await registerUseCase.execute(email, password, fullName);

        expect(userRepository.save).toHaveBeenCalled();
    });
});