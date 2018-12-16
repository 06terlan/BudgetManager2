import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{
	
	intercept(req, next){
		let tokinizedReq = req.clone({
			headers: req.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
		});

		return next.handle(tokinizedReq);
	}

}