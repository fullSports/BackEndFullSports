import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { clientes } from "./client";
@Injectable()
export class ClientService {
    constructor(
        @InjectModel('clientes') private readonly clienteModel: Model<clientes>,
    ) { }
    async listarClientes() {
        return await this.clienteModel.find()
            .populate("imagemPerfil")
            .populate("login")
            .exec()
    }
}