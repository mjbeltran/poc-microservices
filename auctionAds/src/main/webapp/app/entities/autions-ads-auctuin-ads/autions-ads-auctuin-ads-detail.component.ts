import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AutionsAdsAuctuinAds } from './autions-ads-auctuin-ads.model';
import { AutionsAdsAuctuinAdsService } from './autions-ads-auctuin-ads.service';

@Component({
    selector: 'jhi-autions-ads-auctuin-ads-detail',
    templateUrl: './autions-ads-auctuin-ads-detail.component.html'
})
export class AutionsAdsAuctuinAdsDetailComponent implements OnInit, OnDestroy {

    autionsAds: AutionsAdsAuctuinAds;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private autionsAdsService: AutionsAdsAuctuinAdsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAutionsAds();
    }

    load(id) {
        this.autionsAdsService.find(id)
            .subscribe((autionsAdsResponse: HttpResponse<AutionsAdsAuctuinAds>) => {
                this.autionsAds = autionsAdsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAutionsAds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'autionsAdsListModification',
            (response) => this.load(this.autionsAds.id)
        );
    }
}
