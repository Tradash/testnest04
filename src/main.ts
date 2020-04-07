import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { configService } from './config/configuration';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   *  Активация NATS
   */
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: { url: configService.getNatsConfig() },
  });

  /**
   * Активация swagger
   */

  const options = new DocumentBuilder()
    .setTitle('Тестовое задание')
    .setDescription('Тестовое задание на стеке Nestjs')
    .addTag('TestTask')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  /**
   * Активация валидации
   */

  app.useGlobalPipes(new ValidationPipe());

  /**
   * Стартуем микросервисы и вебсервер
   */

  await app.startAllMicroservicesAsync();
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
