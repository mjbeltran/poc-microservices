import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AdvertisementAuctuinAdsComponent } from './advertisement-auctuin-ads.component';
import { AdvertisementAuctuinAdsDetailComponent } from './advertisement-auctuin-ads-detail.component';
import { AdvertisementAuctuinAdsPopupComponent } from './advertisement-auctuin-ads-dialog.component';
import { AdvertisementAuctuinAdsDeletePopupComponent } from './advertisement-auctuin-ads-delete-dialog.component';

export const advertisementRoute: Routes = [
    {
        path: 'advertisement-auctuin-ads',
        component: AdvertisementAuctuinAdsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'auctionAdsApp.advertisement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'advertisement-auctuin-ads/:id',
        component: AdvertisementAuctuinAdsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'auctionAdsApp.advertisement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const advertisementPopupRoute: Routes = [
    {
        path: 'advertisement-auctuin-ads-new',
        component: AdvertisementAuctuinAdsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'auctionAdsApp.advertisement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'advertisement-auctuin-ads/:id/edit',
        component: AdvertisementAuctuinAdsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'auctionAdsApp.advertisement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'advertisement-auctuin-ads/:id/delete',
        component: AdvertisementAuctuinAdsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'auctionAdsApp.advertisement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
