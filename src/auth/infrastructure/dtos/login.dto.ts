import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: 'Correo electrónico del usuario', example: 'user@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Contraseña del usuario', minLength: 6, example: 'password123' })
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}