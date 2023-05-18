import { Test, TestingModule } from '@nestjs/testing';
import { MoneytransactionsController } from './moneytransactions.controller';
import { MoneytransactionsService } from './moneytransactions.service';

describe('MoneytransactionsController', () => {
  let controller: MoneytransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneytransactionsController],
      providers: [MoneytransactionsService],
    }).compile();

    controller = module.get<MoneytransactionsController>(
      MoneytransactionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
