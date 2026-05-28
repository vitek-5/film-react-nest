import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { OrderDto, OrderConfirmationDto } from '../dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(
    @Body() order: OrderDto,
  ): Promise<{ total: number; items: OrderConfirmationDto[] }> {
    return this.orderService.create(order);
  }
}