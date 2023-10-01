import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  Inject,
  NotAcceptableException,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { Order } from "./Schema/order.schema";
import { AuthGuard } from "@nestjs/passport";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { Cache } from "cache-manager";
import { RequestsEnum } from "src/queues/enum/request.enum";
@Controller()
@ApiTags("Orders")
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly queueCacheService: QueueCacheService
  ) {}

  @Post("/realizar-pedido")
  @UseGuards(AuthGuard("jwt"))
  async RegisterOrder(@Body() createOrder: Order) {
    const RegisterOrder = await this.orderService.RegisterOrder(createOrder);
    this.queueCacheService.addItem(RequestsEnum.order);
    return {
      messagem: "pedido realizado com suceeso",
      order: RegisterOrder,
      orderPlaced: true,
    };
  }

  @Get("/listar-pedidos")
  @UseGuards(AuthGuard("jwt"))
  async ListOrders(): Promise<Order[]> {
    const orders_cache = await this.cache.get(RequestsEnum.order);
    if (orders_cache) {
      return orders_cache;
    } else {
      const orders = await this.orderService.ListOrders();
      await this.cache.set(RequestsEnum.order, orders);
      return orders;
    }
  }

  @Get("/listar-pedido/:id")
  @UseGuards(AuthGuard("jwt"))
  async ListOrderByID(@Param("id") id: string) {
    const orderId_cache = await this.cache.get(`${RequestsEnum.order}-${id}`);
    if (orderId_cache) {
      return orderId_cache;
    } else {
      const orderId = await this.orderService.searchIdOrder(id);
      await this.cache.set(`${RequestsEnum.order}-${id}`);
      return orderId;
    }
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
  @UseGuards(AuthGuard("jwt"))
  async DeleteOrder(@Param("id") id: string) {
    const deleteOrder = await this.orderService.deleteOrder(id);
    if (deleteOrder) {
      this.queueCacheService.addItem(RequestsEnum.order);
      return {
        messagem: "pedido cancelado com sucesso",
      };
    } else {
      throw new NotAcceptableException();
    }
  }
}
