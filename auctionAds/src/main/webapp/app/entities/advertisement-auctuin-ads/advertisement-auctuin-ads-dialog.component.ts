import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { AdvertisementAuctuinAds } from './advertisement-auctuin-ads.model';
import { AdvertisementAuctuinAdsPopupService } from './advertisement-auctuin-ads-popup.service';
import { AdvertisementAuctuinAdsService } from './advertisement-auctuin-ads.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-advertisement-auctuin-ads-dialog',
    templateUrl: './advertisement-auctuin-ads-dialog.component.html'
})
export class AdvertisementAuctuinAdsDialogComponent implements OnInit {

    advertisement: AdvertisementAuctuinAds;
    isSaving: boolean;

    users: User[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private advertisementService: AdvertisementAuctuinAdsService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.advertisement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.advertisementService.update(this.advertisement));
        } else {
            this.subscribeToSaveResponse(
                this.advertisementService.create(this.advertisement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AdvertisementAuctuinAds>>) {
        result.subscribe((res: HttpResponse<AdvertisementAuctuinAds>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AdvertisementAuctuinAds) {
        this.eventManager.broadcast({ name: 'advertisementListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-advertisement-auctuin-ads-popup',
    template: ''
})
export class AdvertisementAuctuinAdsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private advertisementPopupService: AdvertisementAuctuinAdsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.advertisementPopupService
                    .open(AdvertisementAuctuinAdsDialogComponent as Component, params['id']);
            } else {
                this.advertisementPopupService
                    .open(AdvertisementAuctuinAdsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
