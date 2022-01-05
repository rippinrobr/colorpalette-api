
export interface QueryFilters {
  getFilters(): Array<{term: object}>;
  hasFilters(): boolean;
}

export class Filters implements QueryFilters{
  private filters = new Array<{term: Object}>();

  constructor(brand = '', mediaType = '') {
    if (brand !== '') {
      this.filters.push({"term": {brand: brand}});
    }

    if (mediaType !== '') {
      this.filters.push({"term": {mediaType: mediaType}});
    }

  }

  hasFilters(): boolean {
      return this.filters.length > 0;
  }

  getFilters(): Array<{term: Object}> {
    return this.filters;
  }
}