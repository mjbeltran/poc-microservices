package com.auctionads.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.auctionads.domain.Advertisement;
import com.auctionads.service.AdvertisementService;
import com.auctionads.web.rest.errors.BadRequestAlertException;
import com.auctionads.web.rest.util.HeaderUtil;
import com.auctionads.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Advertisement.
 */
@RestController
@RequestMapping("/api")
public class AdvertisementResource {

    private final Logger log = LoggerFactory.getLogger(AdvertisementResource.class);

    private static final String ENTITY_NAME = "advertisement";

    private final AdvertisementService advertisementService;

    public AdvertisementResource(AdvertisementService advertisementService) {
        this.advertisementService = advertisementService;
    }

    /**
     * POST  /advertisements : Create a new advertisement.
     *
     * @param advertisement the advertisement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new advertisement, or with status 400 (Bad Request) if the advertisement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/advertisements")
    @Timed
    public ResponseEntity<Advertisement> createAdvertisement(@Valid @RequestBody Advertisement advertisement) throws URISyntaxException {
        log.debug("REST request to save Advertisement : {}", advertisement);
        if (advertisement.getId() != null) {
            throw new BadRequestAlertException("A new advertisement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Advertisement result = advertisementService.save(advertisement);
        return ResponseEntity.created(new URI("/api/advertisements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /advertisements : Updates an existing advertisement.
     *
     * @param advertisement the advertisement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated advertisement,
     * or with status 400 (Bad Request) if the advertisement is not valid,
     * or with status 500 (Internal Server Error) if the advertisement couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/advertisements")
    @Timed
    public ResponseEntity<Advertisement> updateAdvertisement(@Valid @RequestBody Advertisement advertisement) throws URISyntaxException {
        log.debug("REST request to update Advertisement : {}", advertisement);
        if (advertisement.getId() == null) {
            return createAdvertisement(advertisement);
        }
        Advertisement result = advertisementService.save(advertisement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, advertisement.getId().toString()))
            .body(result);
    }

    /**
     * GET  /advertisements : get all the advertisements.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of advertisements in body
     */
    @GetMapping("/advertisements")
    @Timed
    public ResponseEntity<List<Advertisement>> getAllAdvertisements(Pageable pageable) {
        log.debug("REST request to get a page of Advertisements");
        Page<Advertisement> page = advertisementService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/advertisements");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /advertisements/:id : get the "id" advertisement.
     *
     * @param id the id of the advertisement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the advertisement, or with status 404 (Not Found)
     */
    @GetMapping("/advertisements/{id}")
    @Timed
    public ResponseEntity<Advertisement> getAdvertisement(@PathVariable Long id) {
        log.debug("REST request to get Advertisement : {}", id);
        Advertisement advertisement = advertisementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(advertisement));
    }

    /**
     * DELETE  /advertisements/:id : delete the "id" advertisement.
     *
     * @param id the id of the advertisement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/advertisements/{id}")
    @Timed
    public ResponseEntity<Void> deleteAdvertisement(@PathVariable Long id) {
        log.debug("REST request to delete Advertisement : {}", id);
        advertisementService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/advertisements?query=:query : search for the advertisement corresponding
     * to the query.
     *
     * @param query the query of the advertisement search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/advertisements")
    @Timed
    public ResponseEntity<List<Advertisement>> searchAdvertisements(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Advertisements for query {}", query);
        Page<Advertisement> page = advertisementService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/advertisements");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
