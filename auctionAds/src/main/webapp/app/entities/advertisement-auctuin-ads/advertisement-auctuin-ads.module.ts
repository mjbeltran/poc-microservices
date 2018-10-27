import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuctionAdsSharedModule } from '../../shared';
import { AuctionAdsAdminModule } from '../../admin/admin.module';
import {
    AdvertisementAuctuinAdsService,
    AdvertisementAuctuinAdsPopupService,
    AdvertisementAuctuinAdsComponent,
    AdvertisementAuctuinAdsDetailComponent,
    AdvertisementAuctuinAdsDialogComponent,
    AdvertisementAuctuinAdsPopupComponent,
    AdvertisementAuctuinAdsDeletePopupComponent,
    AdvertisementAuctuinAdsDeleteDialogComponent,
    advertisementRoute,
    advertisementPopupRoute,
} from './';

const ENTITY_STATES = [
    ...advertisementRoute,
    ...advertisementPopupRoute,
];

@NgModule({
    imports: [
        AuctionAdsSharedModule,
        AuctionAdsAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AdvertisementAuctuinAdsComponent,
        AdvertisementAuctuinAdsDetailComponent,
        AdvertisementAuctuinAdsDialogComponent,
        AdvertisementAuctuinAdsDeleteDialogComponent,
        AdvertisementAuctuinAdsPopupComponent,
        AdvertisementAuctuinAdsDeletePopupComponent,
    ],
    entryComponents: [
        AdvertisementAuctuinAdsComponent,
        AdvertisementAuctuinAdsDialogComponent,
        AdvertisementAuctuinAdsPopupComponent,
        AdvertisementAuctuinAdsDeleteDialogComponent,
        AdvertisementAuctuinAdsDeletePopupComponent,
    ],
    providers: [
        AdvertisementAuctuinAdsService,
        AdvertisementAuctuinAdsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuctionAdsAdvertisementAuctuinAdsModule {}
