import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuctionAdsSharedModule } from '../../shared';
import { AuctionAdsAdminModule } from '../../admin/admin.module';
import {
    AutionsAdsAuctuinAdsService,
    AutionsAdsAuctuinAdsPopupService,
    AutionsAdsAuctuinAdsComponent,
    AutionsAdsAuctuinAdsDetailComponent,
    AutionsAdsAuctuinAdsDialogComponent,
    AutionsAdsAuctuinAdsPopupComponent,
    AutionsAdsAuctuinAdsDeletePopupComponent,
    AutionsAdsAuctuinAdsDeleteDialogComponent,
    autionsAdsRoute,
    autionsAdsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...autionsAdsRoute,
    ...autionsAdsPopupRoute,
];

@NgModule({
    imports: [
        AuctionAdsSharedModule,
        AuctionAdsAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AutionsAdsAuctuinAdsComponent,
        AutionsAdsAuctuinAdsDetailComponent,
        AutionsAdsAuctuinAdsDialogComponent,
        AutionsAdsAuctuinAdsDeleteDialogComponent,
        AutionsAdsAuctuinAdsPopupComponent,
        AutionsAdsAuctuinAdsDeletePopupComponent,
    ],
    entryComponents: [
        AutionsAdsAuctuinAdsComponent,
        AutionsAdsAuctuinAdsDialogComponent,
        AutionsAdsAuctuinAdsPopupComponent,
        AutionsAdsAuctuinAdsDeleteDialogComponent,
        AutionsAdsAuctuinAdsDeletePopupComponent,
    ],
    providers: [
        AutionsAdsAuctuinAdsService,
        AutionsAdsAuctuinAdsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuctionAdsAutionsAdsAuctuinAdsModule {}
