import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { PrismaService } from './prisma.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import * as authError from '../errors/auth.error';
import { TokensDto } from 'src/dtos/tokens.dto';

// One day token age
const TOKEN_AGE = 1000 * 60 * 60 * 24;

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) { }

    async storeTokens(tokens: TokensDto) {
        await this.prisma.users.update({
            data: {
                access_token: tokens.accessToken,
                access_token_time: new Date(),
            },
            where: {
                id: tokens.userId,
            }
        })
    }

    async validateToken(id: string, access_token: string) {
        const user_access_token = await this.prisma.users.findFirst({
            select: {
                access_token: true,
                access_token_time: true,
            },
            where: {
                id: id,
            }
        });
        if (!user_access_token) {
            // No access token found
            return false;
        }
        if (Date.now() - user_access_token.access_token_time.getTime() > TOKEN_AGE) {
            // Token expired
            return false;
        }
        return user_access_token.access_token == access_token;
    }

    async updateTokens(id: string): Promise<TokensDto> {
        const salt = crypto.randomBytes(16).toString('hex');
        const access_token = Buffer.from(`${id}.${salt}`).toString('base64');
        const tokens = new TokensDto();
        tokens.userId = id;
        tokens.accessToken = access_token;
        await this.storeTokens(tokens);
        return tokens;
    }

    getUserIdFromAccessToken(access_token: string) {
        const decoded = Buffer.from(access_token, 'base64').toString();
        const splited = decoded.split('.');
        return splited[0];
    }

    async apiValidateAccessToken(access_token: string) {
        const id = this.getUserIdFromAccessToken(access_token);
        if (!await this.validateToken(id, access_token)) {
            throw authError.invalidAccessToken();
        }
        const result = await this.prisma.users.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
            }
        });
        if (!result) {
            throw authError.noUserData();
        }
        const tokens = new TokensDto();
        tokens.userId = id;
        tokens.accessToken = access_token;
        return tokens;
    }

    async apiRefreshTokens(access_token: string) {
        const id = this.getUserIdFromAccessToken(access_token);
        if (!await this.validateToken(id, access_token)) {
            throw authError.invalidAccessToken();
        }
        const result = await this.prisma.users.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
            }
        });
        if (!result) {
            throw authError.noUserData();
        }
        return await this.updateTokens(result.id);
    }

    async apiRegister(data: RegisterDto) {
        const { username, password, email } = data;
        if (!username) {
            throw authError.emptyUsername();
        }
        const count = await this.prisma.users.count({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });
        if (count > 0) {
            throw authError.conflictUsernameOrEmail();
        }
        const new_user = await this.prisma.users.create({
            data: {
                username: username,
                email: email,
                password: await argon2.hash(password),
            },
        });
        if (!new_user) {
            throw authError.unableToCreateNewUser();
        }
    }

    async apiLogin(data: LoginDto) {
        const { usernameOrEmail, password } = data;
        const result = await this.prisma.users.findFirst({
            where: {
                OR: [{
                    username: usernameOrEmail,
                }, {
                    email: usernameOrEmail,
                }]
            },
            select: {
                id: true,
                password: true,
            }
        });
        if (!result) {
            throw authError.notFoundUser();
        }
        if (!result.password) {
            throw authError.invalidLoginMethod();
        }
        if (!await argon2.verify(result.password, password)) {
            throw authError.invalidPassword();
        }
        return await this.updateTokens(result.id);
    }

    // TODO: Social network linking
}