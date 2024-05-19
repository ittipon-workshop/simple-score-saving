import { HttpException, HttpStatus } from '@nestjs/common';

export function invalidAccessTokenFormat(lang: string = "en") {
    return new HttpException({
        message: `Invalid access token format`,
    }, HttpStatus.FORBIDDEN);
}

export function invalidAccessToken(lang: string = "en") {
    return new HttpException({
        message: `Invalid access token`,
    }, HttpStatus.FORBIDDEN);
}

export function invalidRefreshTokenFormat(lang: string = "en") {
    return new HttpException({
        message: `Invalid refresh token format`,
    }, HttpStatus.FORBIDDEN);
}

export function invalidRefreshToken(lang: string = "en") {
    return new HttpException({
        message: `Invalid refresh token`,
    }, HttpStatus.FORBIDDEN);
}

export function invalidUserId(lang: string = "en") {
    return new HttpException({
        message: `Invalid user ID`,
    }, HttpStatus.FORBIDDEN);
}

export function noUserData(lang: string = "en") {
    return new HttpException({
        message: `No user data`,
    }, HttpStatus.FORBIDDEN);
}

export function emptyUsername(lang: string = "en") {
    return new HttpException({
        message: `Username must not be empty`,
    }, HttpStatus.BAD_REQUEST);
}

export function conflictUsernameOrEmail(lang: string = "en") {
    return new HttpException({
        message: `Username or email already in used`,
    }, HttpStatus.CONFLICT);
}

export function unableToCreateNewUser(lang: string = "en") {
    return new HttpException({
        message: `Unable to create new user`,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
}

export function notFoundUser(lang: string = "en") {
    return new HttpException({
        message: `User not found`,
    }, HttpStatus.NOT_FOUND);
}

export function invalidLoginMethod(lang: string = "en") {
    return new HttpException({
        message: `Invalid login method`,
    }, HttpStatus.FORBIDDEN);
}

export function invalidPassword(lang: string = "en") {
    return new HttpException({
        message: `Invalid password`,
    }, HttpStatus.UNAUTHORIZED);
}

export function unableToDecodeAppleIDToken(lang: string = "en") {
    return new HttpException({
        message: `Unable to decode ID token`,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
}

export function invalidAppleIDToken(lang: string = "en") {
    return new HttpException({
        message: `Invalid ID token`,
    }, HttpStatus.FORBIDDEN);
}

export function unableToRetrieveAppleSigningKey(lang: string = "en") {
    return new HttpException({
        message: `Unable to retrieve signing key`,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
}

export function unexpectedIssuer(iss: string, lang: string = "en") {
    return new HttpException({
        message: `Unexpected issuer (iss claim): ${iss}`,
    }, HttpStatus.FORBIDDEN);
}

export function unexpectedAudience(aud: string | string[], lang: string = "en") {
    return new HttpException({
        message: `Unexpected audience (aud claim): ${aud}`,
    }, HttpStatus.FORBIDDEN);
}

export function unableToCreateNewAppleUser(lang: string = "en") {
    return new HttpException({
        message: `Unable to create new apple user`,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
}

export function invalidFacebookIDOrAccessToken(lang: string = "en") {
    return new HttpException({
        message: `Invalid facebook ID or access token`,
    }, HttpStatus.FORBIDDEN);
}

export function unableToCreateNewFacebookUser(lang: string = "en") {
    return new HttpException({
        message: `Unable to create new facebook user`,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
}

export function unableToRetrieveGoogleIDToken(lang: string = "en") {
    return new HttpException({
        message: `Unable to retrieve google ID token`,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
}

export function unableToRetrieveGoogleTokenInformation(lang: string = "en") {
    return new HttpException({
        message: `Unable to retrieve google token information`,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
}

export function unableToCreateNewGoogleUser(lang: string = "en") {
    return new HttpException({
        message: `Unable to create new google user`,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
}
