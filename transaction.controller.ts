import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class TransactionController {
  @MessagePattern('transaction.created')
  handleTransactionCreated(@Payload() transaction: any, @Ctx() context: RmqContext) {
    console.log('Received transaction:', transaction);
    return 'Transaction processed';
  }

  async checkQueueMessages(context: RmqContext) {
    const channel = context.getChannelRef();
    const queue = 'transaction_queue';
    const message = await channel.checkQueue(queue);
    console.log('Queue status:', message);
    return message;
  }
}