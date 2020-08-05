import { RESTDataSource } from 'apollo-datasource-rest';

export class DummyRestAPI extends RESTDataSource {

  constructor() {

    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
    
  }

  async getAllUsers() {
    console.log('----');
    return this.get('users');
  }
};
