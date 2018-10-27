/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuctionAdsTestModule } from '../../../test.module';
import { AdvertisementAuctuinAdsDetailComponent } from '../../../../../../main/webapp/app/entities/advertisement-auctuin-ads/advertisement-auctuin-ads-detail.component';
import { AdvertisementAuctuinAdsService } from '../../../../../../main/webapp/app/entities/advertisement-auctuin-ads/advertisement-auctuin-ads.service';
import { AdvertisementAuctuinAds } from '../../../../../../main/webapp/app/entities/advertisement-auctuin-ads/advertisement-auctuin-ads.model';

describe('Component Tests', () => {

    describe('AdvertisementAuctuinAds Management Detail Component', () => {
        let comp: AdvertisementAuctuinAdsDetailComponent;
        let fixture: ComponentFixture<AdvertisementAuctuinAdsDetailComponent>;
        let service: AdvertisementAuctuinAdsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AuctionAdsTestModule],
                declarations: [AdvertisementAuctuinAdsDetailComponent],
                providers: [
                    AdvertisementAuctuinAdsService
                ]
            })
            .overrideTemplate(AdvertisementAuctuinAdsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdvertisementAuctuinAdsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdvertisementAuctuinAdsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AdvertisementAuctuinAds(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.advertisement).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
