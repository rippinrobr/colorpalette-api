import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
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

class Query {
  index: string;
  body: {query: Object};

  constructor(index: string) {
    this.index = index;
    this.body = {query: {}};
  }

  addQueryBody(qry: Object): Query {
    this.body.query = qry;
    console.log(JSON.stringify(this.body));

    return this;
  }
}
class QueryBuilder {
  private q: Query;
  
  constructor(index: string) {
    this.q = new Query(index);
  }

  buildBoolQuery(matches: Array<Object>, filters: QueryFilters): Query {

    if (filters.hasFilters()) {
      let queryBody = {
        "query": {
          "bool" : {
            "must": matches,
            "filter": filters.getFilters(),
          }
        }
      };

      return this.q.addQueryBody(queryBody.query);
    }

    let queryBody = {
      "query" : {
        "bool" : {
          "must" : matches,
        }
      }
    };

    return this.q.addQueryBody(queryBody.query);
  }

  // buildMatchQuery(matchObj: Object): Query {
  //   this.q.body.query = {match: matchObj};
  //
  //   return this.q;
  // }
}

@Injectable()
export class SearchService {
  async getColorsByPigments(pigments: Array<string>, filters: QueryFilters): Promise<Record<string, any>> {
    const qry = new QueryBuilder(INDEX_PIGMENTS);

    const matches: Array<{match: {pigments: string}}> = new Array();
    pigments.forEach((p) => {
      matches.push({"match": {"pigments" : p}});
    });

    const debugqry = qry.buildBoolQuery(matches, filters);
    console.log(JSON.stringify(debugqry));

    return client.search(qry.buildBoolQuery(matches, filters));
  }

  async getColorsByName(name: string, filters: QueryFilters): Promise<Record<string, any>> {
    console.log("filters.hasFilters(): ",  filters.hasFilters());
    // console.dir(filters);

    const qryBuilder = new QueryBuilder(INDEX_PIGMENTS);
    const query = qryBuilder.buildBoolQuery([{match:  {name: name}}],new Filters());
    return await client.search(query);
  }
}

function p(p: any) {
    throw new Error('Function not implemented.');
}

