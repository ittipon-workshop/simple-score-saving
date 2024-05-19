import { Response } from 'express';
import { Controller, Get, Post, Res, Body, UseGuards } from '@nestjs/common';
import { ScoreService } from '../services/score.service';
import { SaveScoreDto } from '../dtos/save-score.dto';
import { AccessTokenGuard } from '../guards/access-token.guard';

@Controller('score')
export class ScoreController {
    constructor(private readonly scoreService: ScoreService) { }

    @UseGuards(AccessTokenGuard)
    @Post()
    async saveScore(@Res() res: Response, @Body() data: SaveScoreDto): Promise<void> {
        res.status(200).json(await this.scoreService.apiSaveScore(data));
    }

    @Get()
    async refreshTokens(@Res() res: Response): Promise<void> {
        res.status(200).json(await this.scoreService.apiGetScores());
    }
}