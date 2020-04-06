import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      host: '127.0.0.1',
      port: 8877,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservicesAsync();
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
