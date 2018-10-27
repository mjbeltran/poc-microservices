import { BaseEntity, User } from './../../shared';

export class AdvertisementAuctuinAds implements BaseEntity {
    constructor(
        public id?: number,
        public idAd?: number,
        public description?: string,
        public imagesContentType?: string,
        public images?: any,
        public date?: any,
        public user?: User,
    ) {
    }
}
