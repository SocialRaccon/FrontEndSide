import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    AuthInterceptor
  ]
})
export class InterceptorsModule { }
