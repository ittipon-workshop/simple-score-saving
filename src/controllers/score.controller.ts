import { Response } from 'express';
import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { ScoreService } from '../services/score.service';
import { SaveScoreDto } from '../dtos/save-score.dto';

@Controller('score')
export class ScoreController {
    constructor(private readonly scoreService: ScoreService) { }

    @Post()
    async saveScore(@Res() res: Response, @Body() data: SaveScoreDto): Promise<void> {
        res.status(200).json(await this.scoreService.apiSaveScore(data));
    }

    @Get()
    async refreshTokens(@Res() res: Response): Promise<void> {
        res.status(200).json(await this.scoreService.apiGetScores());
    }
}