import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AutionsAdsAuctuinAds } from './autions-ads-auctuin-ads.model';
import { AutionsAdsAuctuinAdsService } from './autions-ads-auctuin-ads.service';

@Injectable()
export class AutionsAdsAuctuinAdsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private autionsAdsService: AutionsAdsAuctuinAdsService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.autionsAdsService.find(id)
                    .subscribe((autionsAdsResponse: HttpResponse<AutionsAdsAuctuinAds>) => {
                        const autionsAds: AutionsAdsAuctuinAds = autionsAdsResponse.body;
                        if (autionsAds.dateAction) {
                            autionsAds.dateAction = {
                                year: autionsAds.dateAction.getFullYear(),
                                month: autionsAds.dateAction.getMonth() + 1,
                                day: autionsAds.dateAction.getDate()
                            };
                        }
                        this.ngbModalRef = this.autionsAdsModalRef(component, autionsAds);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.autionsAdsModalRef(component, new AutionsAdsAuctuinAds());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    autionsAdsModalRef(component: Component, autionsAds: AutionsAdsAuctuinAds): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.autionsAds = autionsAds;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
