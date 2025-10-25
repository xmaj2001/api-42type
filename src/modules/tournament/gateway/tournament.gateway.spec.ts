import { Test, TestingModule } from '@nestjs/testing';
import { TournamentGateway } from './tournament.gateway';

describe('TournamentGateway', () => {
  let gateway: TournamentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentGateway],
    }).compile();

    gateway = module.get<TournamentGateway>(TournamentGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
