import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Starts listening for shutdown hooks
    app.enableShutdownHooks();

    const config = new DocumentBuilder()
        .setTitle('simple-score-saving')
        .setDescription('A simple score saving web-service')
        .setVersion('0.0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const hostname = process.env.HOSTNAME;
    const port = Number(process.env.PORT || 5780);
    await app.listen(port, hostname);
}
bootstrap();