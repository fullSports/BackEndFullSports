import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './client.controller'
import ClientSchema from './schemas/client.schema';
import { ClientService } from './shared/client.service';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'clientes', schema: ClientSchema },
        ])
    ],
    controllers: [
        ClientController
    ],
    providers: [
        ClientService
    ],
    exports: [
        ClientService
    ]
})
export class ClientModule { };