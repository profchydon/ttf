import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

/**
 * Boots up the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create a new Nest.js application

  const configService = app.get(ConfigService); // Get configuration service instance

  const USER = configService.get('RABBITMQ_USER'); // Retrieve RabbitMQ connection details from configuration
  const PASSWORD = configService.get('RABBITMQ_PASS');
  const HOST = configService.get('RABBITMQ_HOST');
  const HTTP_PORT = configService.get('HTTP_PORT');

  app.connectMicroservice({
    // Connect to RabbitMQ microservice
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      queue: 'invitations',
    },
  });

  await app.startAllMicroservices(); // Start all microservices

  await app.listen(HTTP_PORT); // Listen on the specified HTTP port
}

bootstrap();
