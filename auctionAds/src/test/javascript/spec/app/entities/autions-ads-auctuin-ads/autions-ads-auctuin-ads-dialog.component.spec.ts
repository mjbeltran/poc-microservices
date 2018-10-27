/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AuctionAdsTestModule } from '../../../test.module';
import { AutionsAdsAuctuinAdsDialogComponent } from '../../../../../../main/webapp/app/entities/autions-ads-auctuin-ads/autions-ads-auctuin-ads-dialog.component';
import { AutionsAdsAuctuinAdsService } from '../../../../../../main/webapp/app/entities/autions-ads-auctuin-ads/autions-ads-auctuin-ads.service';
import { AutionsAdsAuctuinAds } from '../../../../../../main/webapp/app/entities/autions-ads-auctuin-ads/autions-ads-auctuin-ads.model';
import { AdvertisementAuctuinAdsService } from '../../../../../../main/webapp/app/entities/advertisement-auctuin-ads';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('AutionsAdsAuctuinAds Management Dialog Component', () => {
        let comp: AutionsAdsAuctuinAdsDialogComponent;
        let fixture: ComponentFixture<AutionsAdsAuctuinAdsDialogComponent>;
        let service: AutionsAdsAuctuinAdsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AuctionAdsTestModule],
                declarations: [AutionsAdsAuctuinAdsDialogComponent],
                providers: [
                    AdvertisementAuctuinAdsService,
                    UserService,
                    AutionsAdsAuctuinAdsService
                ]
            })
            .overrideTemplate(AutionsAdsAuctuinAdsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutionsAdsAuctuinAdsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutionsAdsAuctuinAdsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AutionsAdsAuctuinAds(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.autionsAds = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'autionsAdsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AutionsAdsAuctuinAds();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.autionsAds = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'autionsAdsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
