import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { PrismaService } from './services/prisma.service';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        PrismaService,
        AuthService,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}