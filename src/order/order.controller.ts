import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { Order } from "./Schema/order.schema";
import { AuthGuard } from "@nestjs/passport";
@Controller()
@ApiTags("Orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post("/realizar-pedido")
  @UseGuards(AuthGuard('jwt'))
  async RegisterOrder(@Body() createOrder: Order) {
    createOrder["dataCadastro"] = new Date().toISOString();
    const RegisterOrder = await this.orderService.RegisterOrder(createOrder);
    return {
      messagem: "pedido realizado com suceeso",
      order: RegisterOrder,
      orderPlaced: true,
    };
  }

  @Get("/listar-pedidos")
  @UseGuards(AuthGuard('jwt'))
  async ListOrders(): Promise<Order[]> {
    const listOrders = await this.orderService.ListOrders();
    return listOrders;
  }

  @Get("/listar-pedido/:id")
  @UseGuards(AuthGuard('jwt'))
  async ListOrderByID(@Param("id") id: string) {
    const listOrder = await this.orderService.searchIdOrder(id);
    return listOrder;
  }

  // @Put("/atualizar-pedido/:id")
  // async UpdateOrder(@Param("id") id: string, updateOrderDTO: UpdateOrderDTO) {
  //   const updateOrder = await this.orderService.updateOrder(id, updateOrderDTO);
  //   return {
  //     messagem: "pedido atualizado com sucesso",
  //     order: updateOrder,
  //   };
  // }

  @Delete("/deletar-pedido/:id")
  @UseGuards(AuthGuard('jwt'))
  async DeleteOrder(@Param("id") id: string) {
    const deleteOrder = await this.orderService.deleteOrder(id);
    return deleteOrder;
  }
}
