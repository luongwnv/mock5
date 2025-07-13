import { Module } from "@nestjs/common";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TransactionModule } from "./transaction.module";

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: "transaction_exchange",
          type: "direct",
        },
      ],
      queues: [
        {
          name: "transaction_queue",
          exchange: "transaction_exchange",
          routingKey: "transaction.created",
        },
      ],
      uri: "amqp://guest:guest@localhost:5672",
      connectionInitOptions: { wait: false },
    }),
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
