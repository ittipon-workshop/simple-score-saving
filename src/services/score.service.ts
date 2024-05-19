import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SaveScoreDto } from '../dtos/save-score.dto';

@Injectable()
export class ScoreService {
    constructor(private readonly prisma: PrismaService) { }

    async apiSaveScore(data: SaveScoreDto) {
        const scoreResult = await this.prisma.scores.findFirst({
            where: {
                id: data.userId
            }
        });
        let score = data.score;
        if (scoreResult && score < scoreResult.highest_score) {
            score = scoreResult.highest_score;
        }
        await this.prisma.scores.upsert({
            create: {
                highest_score: score,
                id: data.userId,
            },
            update: {
                highest_score: score,
            },
            where: {
                id: data.userId,
            }
        });
    }

    async apiGetScores() {
        const scoreResult = await this.prisma.scores.findMany({
            orderBy: {
                highest_score: 'desc'
            },
            take: 10,
        });
        return { score: scoreResult };
    }
}