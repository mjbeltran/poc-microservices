import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AutionsAdsAuctuinAds } from './autions-ads-auctuin-ads.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AutionsAdsAuctuinAds>;

@Injectable()
export class AutionsAdsAuctuinAdsService {

    private resourceUrl =  SERVER_API_URL + 'api/autions-ads';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/autions-ads';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(autionsAds: AutionsAdsAuctuinAds): Observable<EntityResponseType> {
        const copy = this.convert(autionsAds);
        return this.http.post<AutionsAdsAuctuinAds>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(autionsAds: AutionsAdsAuctuinAds): Observable<EntityResponseType> {
        const copy = this.convert(autionsAds);
        return this.http.put<AutionsAdsAuctuinAds>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AutionsAdsAuctuinAds>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AutionsAdsAuctuinAds[]>> {
        const options = createRequestOption(req);
        return this.http.get<AutionsAdsAuctuinAds[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AutionsAdsAuctuinAds[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<AutionsAdsAuctuinAds[]>> {
        const options = createRequestOption(req);
        return this.http.get<AutionsAdsAuctuinAds[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AutionsAdsAuctuinAds[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AutionsAdsAuctuinAds = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AutionsAdsAuctuinAds[]>): HttpResponse<AutionsAdsAuctuinAds[]> {
        const jsonResponse: AutionsAdsAuctuinAds[] = res.body;
        const body: AutionsAdsAuctuinAds[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AutionsAdsAuctuinAds.
     */
    private convertItemFromServer(autionsAds: AutionsAdsAuctuinAds): AutionsAdsAuctuinAds {
        const copy: AutionsAdsAuctuinAds = Object.assign({}, autionsAds);
        copy.dateAction = this.dateUtils
            .convertLocalDateFromServer(autionsAds.dateAction);
        return copy;
    }

    /**
     * Convert a AutionsAdsAuctuinAds to a JSON which can be sent to the server.
     */
    private convert(autionsAds: AutionsAdsAuctuinAds): AutionsAdsAuctuinAds {
        const copy: AutionsAdsAuctuinAds = Object.assign({}, autionsAds);
        copy.dateAction = this.dateUtils
            .convertLocalDateToServer(autionsAds.dateAction);
        return copy;
    }
}
