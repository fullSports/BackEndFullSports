import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UpdateOrderDTO } from "./dto/updateOrder.dto";
import { OrderService } from "./order.service";
import { Order } from "./Schema/order.schema";

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("/realizar-pedido")
  async RegisterOrder(@Body() createOrder: Order) {
    const RegisterOrder = await this.orderService.RegisterOrder(createOrder);
    return {
      messagem: "pedido realizado com suceeso",
      order: RegisterOrder,
    };
  }

  @Get("/listar-pedidos")
  async ListOrders(): Promise<Order[]> {
    const listOrders = await this.orderService.ListOrders();
    return listOrders;
  }

  @Get("/listar-pedido/:id")
  async ListOrderByID(@Param("id") id: string) {
    const listOrder = await this.orderService.searchIdOrder(id);
    return {
      messagem: "pedido realizado com sucesso",
      order: listOrder,
    };
  }

  @Put("/atualizar-pedido/:id")
  async UpdateOrder(@Param("id") id: string, updateOrderDTO: UpdateOrderDTO) {
    const updateOrder = await this.orderService.updateOrder(id, updateOrderDTO);
    return {
      messagem: "pedido atualizado com sucesso",
      order: updateOrder,
    };
  }

  @Delete("/deletar-pedido/:id")
  async DeleteOrder(@Param("id") id: string) {
    await this.orderService.deleteOrder(id);
    return {
      messagem: "pedido deletado com sucesso ",
    };
  }
}
