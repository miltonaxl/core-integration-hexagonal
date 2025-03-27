import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ description: 'Correo electrónico del usuario', example: 'user@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Contraseña del usuario', minLength: 6, example: 'password123' })
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ description: 'Nombre completo del usuario', example: 'John Doe' })
    @IsNotEmpty()
    fullName: string;
}