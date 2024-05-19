import { HttpException, HttpStatus } from '@nestjs/common';

export function invalidSecretKeyFormat(lang: string = "en") {
    return new HttpException({
        message: `Invalid secret key format`,
    }, HttpStatus.FORBIDDEN);
}

export function invalidSecretKey(lang: string = "en") {
    return new HttpException({
        message: `Invalid secret key`,
    }, HttpStatus.FORBIDDEN);
}