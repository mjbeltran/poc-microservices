/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AuctionAdsTestModule } from '../../../test.module';
import { AdvertisementAuctuinAdsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/advertisement-auctuin-ads/advertisement-auctuin-ads-delete-dialog.component';
import { AdvertisementAuctuinAdsService } from '../../../../../../main/webapp/app/entities/advertisement-auctuin-ads/advertisement-auctuin-ads.service';

describe('Component Tests', () => {

    describe('AdvertisementAuctuinAds Management Delete Component', () => {
        let comp: AdvertisementAuctuinAdsDeleteDialogComponent;
        let fixture: ComponentFixture<AdvertisementAuctuinAdsDeleteDialogComponent>;
        let service: AdvertisementAuctuinAdsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AuctionAdsTestModule],
                declarations: [AdvertisementAuctuinAdsDeleteDialogComponent],
                providers: [
                    AdvertisementAuctuinAdsService
                ]
            })
            .overrideTemplate(AdvertisementAuctuinAdsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdvertisementAuctuinAdsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdvertisementAuctuinAdsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
