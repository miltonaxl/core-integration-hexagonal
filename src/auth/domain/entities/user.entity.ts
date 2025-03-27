import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty({ description: 'ID del usuario', example: 'uuid-example' })
    id?: string;

    @ApiProperty({ description: 'Correo electrónico del usuario', example: 'user@example.com' })
    email: string;

    password: string;

    @ApiProperty({ description: 'Nombre completo del usuario', example: 'John Doe' })
    fullName: string;


    @ApiProperty({ description: 'Fecha de creación del usuario', example: '2021-01-01T00:00:00.000Z' })
    createdAt?: Date;

    @ApiProperty({ description: 'Fecha de actualización del usuario', example: '2021-01-01T00:00:00.000Z' })
    updatedAt?: Date;

}