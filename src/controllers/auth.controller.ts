import { Response } from 'express';
import { Controller, Post, Res, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { AccessTokenDto } from '../dtos/access-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('validate-access-token')
    async validateAccessToken(@Res() res: Response, @Body() data: AccessTokenDto): Promise<void> {
        res.status(200).json(await this.authService.apiValidateAccessToken(data.accessToken));
    }

    @Post('refresh-tokens')
    async refreshTokens(@Res() res: Response, @Body() data: AccessTokenDto): Promise<void> {
        res.status(200).json(await this.authService.apiRefreshTokens(data.accessToken));
    }

    @Post('register')
    async register(@Res() res: Response, @Body() data: RegisterDto): Promise<void> {
        res.status(200).json(await this.authService.apiRegister(data));
    }

    @Post('login')
    async login(@Res() res: Response, @Body() data: LoginDto): Promise<void> {
        res.status(200).json(await this.authService.apiLogin(data));
    }
}