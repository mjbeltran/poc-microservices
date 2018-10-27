/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuctionAdsTestModule } from '../../../test.module';
import { AutionsAdsAuctuinAdsDetailComponent } from '../../../../../../main/webapp/app/entities/autions-ads-auctuin-ads/autions-ads-auctuin-ads-detail.component';
import { AutionsAdsAuctuinAdsService } from '../../../../../../main/webapp/app/entities/autions-ads-auctuin-ads/autions-ads-auctuin-ads.service';
import { AutionsAdsAuctuinAds } from '../../../../../../main/webapp/app/entities/autions-ads-auctuin-ads/autions-ads-auctuin-ads.model';

describe('Component Tests', () => {

    describe('AutionsAdsAuctuinAds Management Detail Component', () => {
        let comp: AutionsAdsAuctuinAdsDetailComponent;
        let fixture: ComponentFixture<AutionsAdsAuctuinAdsDetailComponent>;
        let service: AutionsAdsAuctuinAdsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AuctionAdsTestModule],
                declarations: [AutionsAdsAuctuinAdsDetailComponent],
                providers: [
                    AutionsAdsAuctuinAdsService
                ]
            })
            .overrideTemplate(AutionsAdsAuctuinAdsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutionsAdsAuctuinAdsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutionsAdsAuctuinAdsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AutionsAdsAuctuinAds(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.autionsAds).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
