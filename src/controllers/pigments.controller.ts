import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Filters } from 'src/search/queryfilters.model';
import { SearchService } from 'src/search/search.service';

@Controller('pigments')
export class PigmentsController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/ids/:pigments')
  async search(@Param() params, @Query('brand') brand: string, @Query('mediaType') mediaType: string): Promise<Record<string, any>> {
    const pigmentsParamVal: string = params.pigments;
    //  console.log(`${brand} ${mediaType}`);
    const qfilter = new Filters(brand, mediaType);
    // console.dir(qfilter.hasFilters());
    return await this.searchService.getColorsByPigments(pigmentsParamVal.split(','), qfilter);
  }

  @Get('/names/:names')
  async searchByName(@Param('names') names: string, @Query('brand') brand: string, @Query('media') mediaType: string): Promise<Record<string, any>> {
    const filters = new Filters(brand, mediaType);
    const results = await this.searchService.getColorsByName(names, filters);

    return {results: results.body.hits.hits, count: results.body.hits.total.value, time: results.body.took};
  }
}
