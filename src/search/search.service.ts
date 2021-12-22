import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { query } from 'express';
import { Filters, QueryFilters } from './queryfilters.model';

const client = new Client({ node: 'http://localhost:9200' });
const INDEX_PIGMENTS = 'pigments';
class PigmentValue {
  pigments: string;

  constructor(pigment: string) {
    this.pigments = pigment;
  }
}

class PigmentMatch {
  match: PigmentValue;

  constructor(match: PigmentValue) {
    this.match = match;
  }
}

class MustArray {
  must: Array<PigmentMatch>;

  constructor() {
    this.must = [];
  }

  addMatch(pm: PigmentMatch) {
    this.must.push(pm);
  }
}

class BoolParameter {
  bool: MustArray;

  constructor() {
    this.bool = new MustArray();
  }
}

class PigmentQuery {
  query: BoolParameter;
  index = 'pigments';

  constructor() {
    this.query = new BoolParameter();
  }

  addPigment(pigment: string) {
    this.query.bool.must.push(new PigmentMatch(new PigmentValue(pigment)));
  }

  toSearchObject(): Record<string, unknown> {
    const mustArray = [];
    this.query.bool.must.forEach((p: PigmentMatch) => {
      mustArray.push({match: {pigments: p.match.pigments}}); 
    });

    return {
      index: this.index,
      body: {
        query: {
          bool: {
            must: mustArray,
          },
        },
      },
    };
  }

}

@Injectable()
export class SearchService {
  async getColorsByPigments(
    pigments: Array<string>,
  ): Promise<Record<string, any>> {
    const qry = new PigmentQuery();

    pigments.forEach((p) => {
      qry.query.bool.must.push(new PigmentMatch(new PigmentValue(p)));
    });

    return await client.search(qry.toSearchObject());
  }

  async getColorsByName(name: string, filters: QueryFilters): Promise<Record<string, any>> {
    console.log("filters.hasFilters(): ",  filters.hasFilters());
    console.dir(filters);
      const query = {
        index: INDEX_PIGMENTS,
        body: {
          query: {
            match: {
              name: name,
            }
          }
        }
      };

      return await client.search(query);
  }
}
function p(p: any) {
    throw new Error('Function not implemented.');
}

