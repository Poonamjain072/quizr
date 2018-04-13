import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Service {
    constructor(private http: Http) {

    }

    addQuestion(questionType: any, question: any, options: any): Observable<any> {
        console.log('service add question', questionType, question, options);
        let headers = new Headers();
        // let myOptions = new RequestOptions({ headers: headers, params: myParams });
        headers.append('Content-type', 'application/json');
        return this.http.post(`http://localhost:8080/api/addQuestion/` + questionType + '/' + question, options, { headers: headers })
            .map(success => success)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }

    getAllQuestions(): Observable<any> {
        return this.http.get(`http://localhost:8080/api/getAllQuestions`)
            .map(success => success)
            .catch(this.handleError);
    }
}
