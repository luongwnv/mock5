import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateChannelOpts } from 'amqp-connection-manager';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('transaction')
    async getTransaction() {
        return this.appService.getAllTransactions();
    }

    @Post('transaction')
    async createTransaction(@Body() transaction: CreateChannelOpts) {
        return this.appService.sendTransactionMessage(transaction);
    }
}
