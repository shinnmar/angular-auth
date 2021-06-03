// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

// import * as cryptojs from "crypto-js";

import { ResponseMessage } from '../../models/response.model';
import { Constants } from '../../models/constants.model';

const CRYPTO_KEY = "2e1e4725-09c0-4eca-8b13-dcfff66c5649";

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
    // intercept request and add token
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // tslint:disable-next-line:no-debugger
        let obj = `app-sitel|token|${new Date().getTime()}`;
        //let token = cryptojs.AES.encrypt(obj, CRYPTO_KEY).toString();
        let token = "Bearer Token"
        request = request.clone({
            setHeaders: {
                Authorization: token
            }
        });

        return next.handle(request).pipe(
            //retry(2),
            catchError((error: any, _) => {
                return of(new HttpResponse<ResponseMessage<void>>({ body: new ResponseMessage(Constants.STATUS.Error, `Code: ${error.status}`) }));
            }),
            // tap(
            //     event => {
            //         if (event instanceof HttpResponse) {
            //             //console.log('all looks good');
            //             // http response status code
            //             //console.log(event.status);
            //         }
            //     },
            //     error => {
            //         // tslint:disable-next-line:no-debugger
            //         let response = new ResponseMessage(Constants.STATUS.Error, `Code: ${error.status}`);
            //         console.log(response);
            //     }
            // )
        );
    }
}
