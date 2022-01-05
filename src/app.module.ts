import { Module } from '@nestjs/common';
import { PigmentsController } from './controllers/pigments.controller';
import { SearchService } from './search/search.service';

@Module({
  imports: [],
  controllers: [PigmentsController],
  providers: [SearchService],
})
export class AppModule {}
