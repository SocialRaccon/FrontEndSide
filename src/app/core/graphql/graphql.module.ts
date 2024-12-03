import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    /*{
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'http://localhost:8110/graphql', // Reemplaza con la URL de tu API GraphQL
        }),
      }),
      deps: [HttpLink],
    },*/
  ],
})
export class GraphqlModule {

}
