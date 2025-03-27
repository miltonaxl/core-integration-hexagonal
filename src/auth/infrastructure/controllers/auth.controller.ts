import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { RegisterUseCase } from '../../domain/use-cases/register.use-case';
import { LoginUseCase } from '../../domain/use-cases/login.use-case';
import { User } from '../../domain/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
    ) { }

    @Post('register')
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiBody({ type: RegisterDto, description: 'Datos del usuario a registrar' })
    @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente', type: User })
    @ApiResponse({ status: 400, description: 'Error de validación o datos inválidos' })
    async register(@Body() registerDto: RegisterDto) {
        const user = await this.registerUseCase.execute(
            registerDto.email,
            registerDto.password,
            registerDto.fullName,
        );
        return { message: 'User registered successfully', user };
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiBody({ type: LoginDto, description: 'Credenciales del usuario' })
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso', schema: { properties: { accessToken: { type: 'string', description: 'Token de acceso JWT' }, user: { $ref: '#/components/schemas/User' } } } })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    async login(@Body() loginDto: LoginDto) {
        const { accessToken, user } = await this.loginUseCase.execute(
            loginDto.email,
            loginDto.password,
        );
        return { accessToken, user };
    }
}