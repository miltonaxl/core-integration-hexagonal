import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAdapter } from '../jwt/jwt.service';
import { Request } from 'express';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtAdapter: JwtAdapter) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }
        const payload = await this.jwtAdapter.verify(token);


        if (!payload) {
            throw new UnauthorizedException();
        }


        request['user'] = payload;


        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}