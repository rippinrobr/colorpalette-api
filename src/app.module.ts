import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PigmentsController } from './controllers/pigments.controller';
import { SearchService } from './search/search.service';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController, PigmentsController],
  providers: [AppService, SearchService],
})
export class AppModule {}
