import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AdvertisementAuctuinAds } from './advertisement-auctuin-ads.model';
import { AdvertisementAuctuinAdsPopupService } from './advertisement-auctuin-ads-popup.service';
import { AdvertisementAuctuinAdsService } from './advertisement-auctuin-ads.service';

@Component({
    selector: 'jhi-advertisement-auctuin-ads-delete-dialog',
    templateUrl: './advertisement-auctuin-ads-delete-dialog.component.html'
})
export class AdvertisementAuctuinAdsDeleteDialogComponent {

    advertisement: AdvertisementAuctuinAds;

    constructor(
        private advertisementService: AdvertisementAuctuinAdsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.advertisementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'advertisementListModification',
                content: 'Deleted an advertisement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-advertisement-auctuin-ads-delete-popup',
    template: ''
})
export class AdvertisementAuctuinAdsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private advertisementPopupService: AdvertisementAuctuinAdsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.advertisementPopupService
                .open(AdvertisementAuctuinAdsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
