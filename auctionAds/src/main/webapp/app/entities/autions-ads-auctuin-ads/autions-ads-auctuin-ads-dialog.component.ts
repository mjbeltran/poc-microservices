import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AutionsAdsAuctuinAds } from './autions-ads-auctuin-ads.model';
import { AutionsAdsAuctuinAdsPopupService } from './autions-ads-auctuin-ads-popup.service';
import { AutionsAdsAuctuinAdsService } from './autions-ads-auctuin-ads.service';
import { AdvertisementAuctuinAds, AdvertisementAuctuinAdsService } from '../advertisement-auctuin-ads';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-autions-ads-auctuin-ads-dialog',
    templateUrl: './autions-ads-auctuin-ads-dialog.component.html'
})
export class AutionsAdsAuctuinAdsDialogComponent implements OnInit {

    autionsAds: AutionsAdsAuctuinAds;
    isSaving: boolean;

    advertisements: AdvertisementAuctuinAds[];

    users: User[];
    dateActionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private autionsAdsService: AutionsAdsAuctuinAdsService,
        private advertisementService: AdvertisementAuctuinAdsService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.advertisementService.query()
            .subscribe((res: HttpResponse<AdvertisementAuctuinAds[]>) => { this.advertisements = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.autionsAds.id !== undefined) {
            this.subscribeToSaveResponse(
                this.autionsAdsService.update(this.autionsAds));
        } else {
            this.subscribeToSaveResponse(
                this.autionsAdsService.create(this.autionsAds));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AutionsAdsAuctuinAds>>) {
        result.subscribe((res: HttpResponse<AutionsAdsAuctuinAds>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AutionsAdsAuctuinAds) {
        this.eventManager.broadcast({ name: 'autionsAdsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAdvertisementById(index: number, item: AdvertisementAuctuinAds) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-autions-ads-auctuin-ads-popup',
    template: ''
})
export class AutionsAdsAuctuinAdsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private autionsAdsPopupService: AutionsAdsAuctuinAdsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.autionsAdsPopupService
                    .open(AutionsAdsAuctuinAdsDialogComponent as Component, params['id']);
            } else {
                this.autionsAdsPopupService
                    .open(AutionsAdsAuctuinAdsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
