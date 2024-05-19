import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { authorization }: any = request.headers;
        if (!authorization || !authorization.trim()) {
            return false;
        }
        const token = authorization.replace(/bearer/gim, '').trim();
        return await this.authService.validateToken(this.authService.getUserIdFromAccessToken(token), token);
    }
}