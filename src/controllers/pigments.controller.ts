import { Controller, Get, Param, Query } from '@nestjs/common';
import { Filters } from 'src/search/filters.model';
import { SearchService } from 'src/search/search.service';

const QP_BRAND = 'brand';
const QP_MEDIA_TYPE = 'mediaType';

@Controller('pigments')
export class PigmentsController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/ids/:pigments')
  async search(@Param('pigments') pigments: string, @Query(QP_BRAND) brand: string, @Query(QP_MEDIA_TYPE) mediaType: string): Promise<Record<string, any>> {
    const queryParams = new Filters(brand, mediaType);
    const results = await this.searchService.getColorsByPigments(pigments.split(','), queryParams);

    return new PigmentSearchResultsVM(results.body.hits.hits, results.body.hits.total.value, results.body.took);
  }

  @Get('/names/:names')
  async searchByName(@Param('names') names: string, @Query(QP_BRAND) brand: string, @Query(QP_MEDIA_TYPE) mediaType: string): Promise<Record<string, any>> {
    const filters = new Filters(brand, mediaType);
    const results = await this.searchService.getColorsByName(names, filters);

    return new PigmentSearchResultsVM(results.body.hits.hits, results.body.hits.total.value, results.body.took);
  }
}

class PigmentSearchResultsVM {
  results: object[];
  count: number;
  time: number;

  constructor(results: object[], count: number, time: number) {
    this.results = results;
    this.count = count;
    this.time = time;
  }
}
