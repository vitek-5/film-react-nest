import { Test } from '@nestjs/testing';
import { fixtureOrder1 } from '../../fixtures/order.fixtures';
import { OrderController } from '../../order/controllers/order.controller';
import { OrderService } from '../../order/services/order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        create: jest.fn(),
      })
      .compile();

    controller = moduleRef.get<OrderController>(OrderController);
    service = moduleRef.get<OrderService>(OrderService);
  });

  it('.create() should call create method of the service', async () => {
    await controller.createOrder(fixtureOrder1);

    expect(service.create).toHaveBeenCalledWith(fixtureOrder1);
  });
});
