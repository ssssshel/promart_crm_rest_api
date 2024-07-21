import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigProvider } from './env-config-provider';

describe('EnvConfigProvider', () => {
  let provider: EnvConfigProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvConfigProvider],
    }).compile();

    provider = module.get<EnvConfigProvider>(EnvConfigProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
