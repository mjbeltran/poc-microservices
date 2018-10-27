import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AuctionAdsAdvertisementAuctuinAdsModule } from './advertisement-auctuin-ads/advertisement-auctuin-ads.module';
import { AuctionAdsAutionsAdsAuctuinAdsModule } from './autions-ads-auctuin-ads/autions-ads-auctuin-ads.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AuctionAdsAdvertisementAuctuinAdsModule,
        AuctionAdsAutionsAdsAuctuinAdsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuctionAdsEntityModule {}
