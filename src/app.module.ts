import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PigmentsController } from './controllers/pigments.controller';
import { SearchService } from './elastic-search/search.service';
import { SearchModule } from './search/search.module';

@Module({
  imports: [SearchModule],
  controllers: [PigmentsController],
  providers: [SearchService],
})
export class AppModule {}
