import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AdvertisementAuctuinAds } from './advertisement-auctuin-ads.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AdvertisementAuctuinAds>;

@Injectable()
export class AdvertisementAuctuinAdsService {

    private resourceUrl =  SERVER_API_URL + 'api/advertisements';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/advertisements';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(advertisement: AdvertisementAuctuinAds): Observable<EntityResponseType> {
        const copy = this.convert(advertisement);
        return this.http.post<AdvertisementAuctuinAds>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(advertisement: AdvertisementAuctuinAds): Observable<EntityResponseType> {
        const copy = this.convert(advertisement);
        return this.http.put<AdvertisementAuctuinAds>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AdvertisementAuctuinAds>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AdvertisementAuctuinAds[]>> {
        const options = createRequestOption(req);
        return this.http.get<AdvertisementAuctuinAds[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AdvertisementAuctuinAds[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<AdvertisementAuctuinAds[]>> {
        const options = createRequestOption(req);
        return this.http.get<AdvertisementAuctuinAds[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AdvertisementAuctuinAds[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AdvertisementAuctuinAds = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AdvertisementAuctuinAds[]>): HttpResponse<AdvertisementAuctuinAds[]> {
        const jsonResponse: AdvertisementAuctuinAds[] = res.body;
        const body: AdvertisementAuctuinAds[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AdvertisementAuctuinAds.
     */
    private convertItemFromServer(advertisement: AdvertisementAuctuinAds): AdvertisementAuctuinAds {
        const copy: AdvertisementAuctuinAds = Object.assign({}, advertisement);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(advertisement.date);
        return copy;
    }

    /**
     * Convert a AdvertisementAuctuinAds to a JSON which can be sent to the server.
     */
    private convert(advertisement: AdvertisementAuctuinAds): AdvertisementAuctuinAds {
        const copy: AdvertisementAuctuinAds = Object.assign({}, advertisement);
        copy.date = this.dateUtils
            .convertLocalDateToServer(advertisement.date);
        return copy;
    }
}
