
export interface QueryFilters {
  brand?: string;
  mediaType?: string;

  hasFilters(): boolean;
}

export class Filters implements QueryFilters{
  brand?: string;
  mediaType?: string;

  constructor(brand = '', mediaType = '') {
    if (brand !== '') {
      this.brand = brand;
    }

    if (mediaType !== '') {
      this.mediaType = mediaType;
    }

  }
  hasFilters(): boolean {
      console.log(Object.keys(this))
      return Object.keys(this).length > 0;
  }
}