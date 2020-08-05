import { Injectable } from '@graphql-modules/di';
import { DummyRestAPI } from './rest-api-actions-datasource';

@Injectable()
export class RestApiDataSource {

  public restApi = new DummyRestAPI();
  
  public getUserInformation() {
      const resp = this.restApi.getAllUsers();
      return resp;
  }
}