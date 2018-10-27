import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AdvertisementAuctuinAds } from './advertisement-auctuin-ads.model';
import { AdvertisementAuctuinAdsService } from './advertisement-auctuin-ads.service';

@Injectable()
export class AdvertisementAuctuinAdsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private advertisementService: AdvertisementAuctuinAdsService

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
                this.advertisementService.find(id)
                    .subscribe((advertisementResponse: HttpResponse<AdvertisementAuctuinAds>) => {
                        const advertisement: AdvertisementAuctuinAds = advertisementResponse.body;
                        if (advertisement.date) {
                            advertisement.date = {
                                year: advertisement.date.getFullYear(),
                                month: advertisement.date.getMonth() + 1,
                                day: advertisement.date.getDate()
                            };
                        }
                        this.ngbModalRef = this.advertisementModalRef(component, advertisement);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.advertisementModalRef(component, new AdvertisementAuctuinAds());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    advertisementModalRef(component: Component, advertisement: AdvertisementAuctuinAds): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.advertisement = advertisement;
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
