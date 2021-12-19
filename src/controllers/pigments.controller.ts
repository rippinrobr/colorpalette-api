import { Controller, Get, Param, Req } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';

@Controller('pigments')
export class PigmentsController {
  constructor(private readonly searchService: SearchService) {}

  @Get(':pigments')
  async search(@Param() params): Promise<Record<string, any>> {
    const pigmentsParamVal: string = params.pigments;
    return await this.searchService.getColorsByPigments(
      pigmentsParamVal.split(','),
    );
  }
}
