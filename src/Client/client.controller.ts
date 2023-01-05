import { Controller, Get } from "@nestjs/common";
import { clientes } from "./shared/client";
import { ClientService } from "./shared/client.service";

@Controller('/client')
export class ClientController {
    constructor(
        private clientService: ClientService
    ) { }
    @Get('/listar-clientes')
    async listarClients(): Promise<clientes> {
        return this.clientService.listarClientes()
    }
}