/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AuctionAdsTestModule } from '../../../test.module';
import { AutionsAdsAuctuinAdsComponent } from '../../../../../../main/webapp/app/entities/autions-ads-auctuin-ads/autions-ads-auctuin-ads.component';
import { AutionsAdsAuctuinAdsService } from '../../../../../../main/webapp/app/entities/autions-ads-auctuin-ads/autions-ads-auctuin-ads.service';
import { AutionsAdsAuctuinAds } from '../../../../../../main/webapp/app/entities/autions-ads-auctuin-ads/autions-ads-auctuin-ads.model';

describe('Component Tests', () => {

    describe('AutionsAdsAuctuinAds Management Component', () => {
        let comp: AutionsAdsAuctuinAdsComponent;
        let fixture: ComponentFixture<AutionsAdsAuctuinAdsComponent>;
        let service: AutionsAdsAuctuinAdsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AuctionAdsTestModule],
                declarations: [AutionsAdsAuctuinAdsComponent],
                providers: [
                    AutionsAdsAuctuinAdsService
                ]
            })
            .overrideTemplate(AutionsAdsAuctuinAdsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutionsAdsAuctuinAdsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutionsAdsAuctuinAdsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AutionsAdsAuctuinAds(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.autionsAds[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
