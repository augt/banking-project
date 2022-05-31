import { Test, TestingModule } from '@nestjs/testing';
import { MoneytransactionsService } from './moneytransactions.service';

describe('MoneytransactionsService', () => {
  let service: MoneytransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneytransactionsService],
    }).compile();

    service = module.get<MoneytransactionsService>(MoneytransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
