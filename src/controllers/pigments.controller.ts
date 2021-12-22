import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Filters } from 'src/search/queryfilters.model';
import { SearchService } from 'src/search/search.service';

@Controller('pigments')
export class PigmentsController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/ids/:pigments')
  async search(@Param() params): Promise<Record<string, any>> {
    const pigmentsParamVal: string = params.pigments;
    return await this.searchService.getColorsByPigments(
      pigmentsParamVal.split(','),
    );
  }

  @Get('/names/:names')
  async searchByName(@Param('names') names: string, @Query('brand') brand: string, @Query('media') mediaType: string): Promise<Record<string, any>> {
    console.log(`media: ${mediaType}`);
    const filters = new Filters(brand, mediaType);
    const results = await this.searchService.getColorsByName(names, filters);
    console.log(Object.keys(results));

    return {results: results.body.hits.hits, count: results.body.hits.total.value, time: results.body.took};
  }
}
