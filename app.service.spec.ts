import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

describe("AppService", () => {
  let service: AppService;
  let amqpConnection: AmqpConnection;

  // Mock AmqpConnection
  const mockAmqpConnection = {
    publish: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: AmqpConnection, useValue: mockAmqpConnection },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    amqpConnection = module.get<AmqpConnection>(AmqpConnection);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should send transaction message", async () => {
    const transaction = { id: 1, product: "Laptop" };
    const result = await service.sendTransactionMessage(transaction);

    expect(mockAmqpConnection.publish).toHaveBeenCalledWith(
      "transaction_exchange",
      "transaction.created",
      transaction
    );
    expect(result).toBe("Transaction message sent to RabbitMQ");
  });
});
