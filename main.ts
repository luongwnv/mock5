import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { TransactionModule } from './transaction.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const microservice = await NestFactory.createMicroservice(TransactionModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'transaction_queue',
      queueOptions: { durable: true },
    },
  });
  await microservice.listen();
}
bootstrap();