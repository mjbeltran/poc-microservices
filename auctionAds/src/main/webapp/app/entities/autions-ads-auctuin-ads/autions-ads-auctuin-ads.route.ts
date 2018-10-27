import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AutionsAdsAuctuinAdsComponent } from './autions-ads-auctuin-ads.component';
import { AutionsAdsAuctuinAdsDetailComponent } from './autions-ads-auctuin-ads-detail.component';
import { AutionsAdsAuctuinAdsPopupComponent } from './autions-ads-auctuin-ads-dialog.component';
import { AutionsAdsAuctuinAdsDeletePopupComponent } from './autions-ads-auctuin-ads-delete-dialog.component';

export const autionsAdsRoute: Routes = [
    {
        path: 'autions-ads-auctuin-ads',
        component: AutionsAdsAuctuinAdsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'auctionAdsApp.autionsAds.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'autions-ads-auctuin-ads/:id',
        component: AutionsAdsAuctuinAdsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'auctionAdsApp.autionsAds.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const autionsAdsPopupRoute: Routes = [
    {
        path: 'autions-ads-auctuin-ads-new',
        component: AutionsAdsAuctuinAdsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'auctionAdsApp.autionsAds.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'autions-ads-auctuin-ads/:id/edit',
        component: AutionsAdsAuctuinAdsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'auctionAdsApp.autionsAds.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'autions-ads-auctuin-ads/:id/delete',
        component: AutionsAdsAuctuinAdsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'auctionAdsApp.autionsAds.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
