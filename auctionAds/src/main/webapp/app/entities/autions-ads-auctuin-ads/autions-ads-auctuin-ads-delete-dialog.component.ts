import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AutionsAdsAuctuinAds } from './autions-ads-auctuin-ads.model';
import { AutionsAdsAuctuinAdsPopupService } from './autions-ads-auctuin-ads-popup.service';
import { AutionsAdsAuctuinAdsService } from './autions-ads-auctuin-ads.service';

@Component({
    selector: 'jhi-autions-ads-auctuin-ads-delete-dialog',
    templateUrl: './autions-ads-auctuin-ads-delete-dialog.component.html'
})
export class AutionsAdsAuctuinAdsDeleteDialogComponent {

    autionsAds: AutionsAdsAuctuinAds;

    constructor(
        private autionsAdsService: AutionsAdsAuctuinAdsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.autionsAdsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'autionsAdsListModification',
                content: 'Deleted an autionsAds'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-autions-ads-auctuin-ads-delete-popup',
    template: ''
})
export class AutionsAdsAuctuinAdsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private autionsAdsPopupService: AutionsAdsAuctuinAdsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.autionsAdsPopupService
                .open(AutionsAdsAuctuinAdsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
