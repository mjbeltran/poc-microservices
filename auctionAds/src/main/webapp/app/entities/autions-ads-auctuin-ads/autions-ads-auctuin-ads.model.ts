import { BaseEntity, User } from './../../shared';

export class AutionsAdsAuctuinAds implements BaseEntity {
    constructor(
        public id?: number,
        public idAuction?: number,
        public priceAuction?: number,
        public dateAction?: any,
        public advertisement?: BaseEntity,
        public user?: User,
    ) {
    }
}
