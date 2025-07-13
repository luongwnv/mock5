import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AppService {
    constructor(private readonly amqpConnection: AmqpConnection) {}

    async sendTransactionMessage(transaction: any) {
        await this.amqpConnection.publish(
            'transaction_exchange',
            'transaction.created',
            transaction
        );
        return 'Transaction message sent to RabbitMQ';
    }

    async getAllTransactions() {
        let all = await this.amqpConnection.publish(
            'transaction_exchange',
            'transaction.getAll',
            {}
        );
        return all;
    }
}
