/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AuctionAdsTestModule } from '../../../test.module';
import { AdvertisementAuctuinAdsComponent } from '../../../../../../main/webapp/app/entities/advertisement-auctuin-ads/advertisement-auctuin-ads.component';
import { AdvertisementAuctuinAdsService } from '../../../../../../main/webapp/app/entities/advertisement-auctuin-ads/advertisement-auctuin-ads.service';
import { AdvertisementAuctuinAds } from '../../../../../../main/webapp/app/entities/advertisement-auctuin-ads/advertisement-auctuin-ads.model';

describe('Component Tests', () => {

    describe('AdvertisementAuctuinAds Management Component', () => {
        let comp: AdvertisementAuctuinAdsComponent;
        let fixture: ComponentFixture<AdvertisementAuctuinAdsComponent>;
        let service: AdvertisementAuctuinAdsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AuctionAdsTestModule],
                declarations: [AdvertisementAuctuinAdsComponent],
                providers: [
                    AdvertisementAuctuinAdsService
                ]
            })
            .overrideTemplate(AdvertisementAuctuinAdsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdvertisementAuctuinAdsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdvertisementAuctuinAdsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AdvertisementAuctuinAds(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.advertisements[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
