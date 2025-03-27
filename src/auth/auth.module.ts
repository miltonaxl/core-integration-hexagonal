import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { UserSchema, UserDocument } from './infrastructure/mongodb/user.schema';
import { AuthMongodbAdapter } from './infrastructure/mongodb/auth.mongodb.adapter';
import { RegisterUseCase } from './domain/use-cases/register.use-case';
import { LoginUseCase } from './domain/use-cases/login.use-case';
import { JwtAdapter } from './infrastructure/jwt/jwt.service';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('jwt.secret'),
                signOptions: { expiresIn: configService.get('jwt.expiresIn') },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [
        RegisterUseCase,
        LoginUseCase,
        JwtAdapter,
        {
            provide: 'UserRepositoryPort',
            useClass: AuthMongodbAdapter,
        },
    ],
    exports: [JwtAdapter],
})
export class AuthModule { }