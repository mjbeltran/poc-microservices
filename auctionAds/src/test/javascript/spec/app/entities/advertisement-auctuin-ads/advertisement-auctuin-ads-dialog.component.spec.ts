/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AuctionAdsTestModule } from '../../../test.module';
import { AdvertisementAuctuinAdsDialogComponent } from '../../../../../../main/webapp/app/entities/advertisement-auctuin-ads/advertisement-auctuin-ads-dialog.component';
import { AdvertisementAuctuinAdsService } from '../../../../../../main/webapp/app/entities/advertisement-auctuin-ads/advertisement-auctuin-ads.service';
import { AdvertisementAuctuinAds } from '../../../../../../main/webapp/app/entities/advertisement-auctuin-ads/advertisement-auctuin-ads.model';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('AdvertisementAuctuinAds Management Dialog Component', () => {
        let comp: AdvertisementAuctuinAdsDialogComponent;
        let fixture: ComponentFixture<AdvertisementAuctuinAdsDialogComponent>;
        let service: AdvertisementAuctuinAdsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AuctionAdsTestModule],
                declarations: [AdvertisementAuctuinAdsDialogComponent],
                providers: [
                    UserService,
                    AdvertisementAuctuinAdsService
                ]
            })
            .overrideTemplate(AdvertisementAuctuinAdsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdvertisementAuctuinAdsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdvertisementAuctuinAdsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AdvertisementAuctuinAds(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.advertisement = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'advertisementListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AdvertisementAuctuinAds();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.advertisement = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'advertisementListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
