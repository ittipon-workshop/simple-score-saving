import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ScoreController } from './controllers/score.controller';
import { PrismaService } from './services/prisma.service';
import { AuthService } from './services/auth.service';
import { ScoreService } from './services/score.service';

@Module({
    imports: [
    ],
    controllers: [
        AuthController,
        ScoreController,
    ],
    providers: [
        PrismaService,
        AuthService,
        ScoreService,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}