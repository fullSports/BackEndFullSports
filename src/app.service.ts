import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getIndex(): object {
    return { menssage: "servidor iniciado" };
  }
}
