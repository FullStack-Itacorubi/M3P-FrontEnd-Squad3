import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  catchError,
  Observable,
  retry,
  throwError,
  timer,
} from 'rxjs';

@Injectable()
export class GlobalHttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle( request )
      .pipe(
        /* retry( {
          count: 3,
          delay: ( _, retryCount ) => timer( retryCount * 1000 ),
        } ), */
        catchError( error => {
          console.log( { error: error.error } );
          // Object.keys( error ).forEach( key => console.log() );
          // console.log(error.error.hasOwnProperty( "message" ));
          const hasMessageKey = error.error.hasOwnProperty( "message" );

          if ( hasMessageKey ) {
            alert( `Código do erro: ${error.status}. \n` + `Mensagem: ${error.error.message}` );
          } else {
            alert(
              `Código do erro: ${error.status}.` +
              Object.keys( error.error ).flatMap( key => `\nMensagem: ${error.error[ key ]}` ) // `${key}`
            );
          }

          return throwError( () => error.error );
          // return error;
        } )
      );
  }
}
