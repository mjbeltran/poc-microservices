import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { AdvertisementAuctuinAds } from './advertisement-auctuin-ads.model';
import { AdvertisementAuctuinAdsService } from './advertisement-auctuin-ads.service';

@Component({
    selector: 'jhi-advertisement-auctuin-ads-detail',
    templateUrl: './advertisement-auctuin-ads-detail.component.html'
})
export class AdvertisementAuctuinAdsDetailComponent implements OnInit, OnDestroy {

    advertisement: AdvertisementAuctuinAds;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private advertisementService: AdvertisementAuctuinAdsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAdvertisements();
    }

    load(id) {
        this.advertisementService.find(id)
            .subscribe((advertisementResponse: HttpResponse<AdvertisementAuctuinAds>) => {
                this.advertisement = advertisementResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAdvertisements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'advertisementListModification',
            (response) => this.load(this.advertisement.id)
        );
    }
}
