import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { QueryFilters } from './filters.model';

const elasticSearchServer =  process.env.ELASTIC_SEARCH || 'http://localhost:9200';
console.log(`Elastic Search server ${elasticSearchServer}`)
const client = new Client({ node: elasticSearchServer });

const INDEX_PIGMENTS = 'pigments';


class Query {
  index: string;
  body: {query: Object};

  constructor(index: string) {
    this.index = index;
    this.body = {query: {}};
  }

  addQueryBody(qry: Object): Query {
    this.body.query = qry;
    return this;
  }
}
class QueryBuilder {
  private q: Query;
  
  constructor(index: string) {
    this.q = new Query(index);
  }

  buildBoolQuery(matches: Array<Object>, filters: QueryFilters): Query {
    let queryBody = {
      "query" : {
        "bool" : {
          "must" : matches,
        }
      }
    };

    if (filters.hasFilters()) {
      queryBody.query.bool['filter'] = filters.getFilters() //{
    }

    return this.q.addQueryBody(queryBody.query);
  }
}

@Injectable()
export class SearchService {
  async getColorsByPigments(pigments: Array<string>, filters: QueryFilters): Promise<Record<string, any>> {
    const qry = new QueryBuilder(INDEX_PIGMENTS);

    const matches: Array<{match: {pigments: string}}> = new Array();
    pigments.forEach((p) => {
      matches.push({"match": {"pigments" : p}});
    });

    return client.search(qry.buildBoolQuery(matches, filters));
  }

  async getColorsByName(name: string, filters: QueryFilters): Promise<Record<string, any>> {
    const qryBuilder = new QueryBuilder(INDEX_PIGMENTS);

    const query = qryBuilder.buildBoolQuery([{"match": {"name": name}}], filters);

    return client.search(query);
  }
}
