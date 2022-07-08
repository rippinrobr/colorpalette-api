import { Test, TestingModule } from '@nestjs/testing';
import { PigmentsController } from './pigments.controller';
import { SearchService } from '../elastic-search/search.service';

describe('PigmentsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PigmentsController],
      providers: [SearchService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<PigmentsController>(PigmentsController);
      //expect(appController.getHello()).toBe('Hello World!');
      expect(true).toBeFalsy()
    });
  });
});
