package com.auctionads.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.auctionads.domain.AutionsAds;
import com.auctionads.service.AutionsAdsService;
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
 * REST controller for managing AutionsAds.
 */
@RestController
@RequestMapping("/api")
public class AutionsAdsResource {

    private final Logger log = LoggerFactory.getLogger(AutionsAdsResource.class);

    private static final String ENTITY_NAME = "autionsAds";

    private final AutionsAdsService autionsAdsService;

    public AutionsAdsResource(AutionsAdsService autionsAdsService) {
        this.autionsAdsService = autionsAdsService;
    }

    /**
     * POST  /autions-ads : Create a new autionsAds.
     *
     * @param autionsAds the autionsAds to create
     * @return the ResponseEntity with status 201 (Created) and with body the new autionsAds, or with status 400 (Bad Request) if the autionsAds has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/autions-ads")
    @Timed
    public ResponseEntity<AutionsAds> createAutionsAds(@Valid @RequestBody AutionsAds autionsAds) throws URISyntaxException {
        log.debug("REST request to save AutionsAds : {}", autionsAds);
        if (autionsAds.getId() != null) {
            throw new BadRequestAlertException("A new autionsAds cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AutionsAds result = autionsAdsService.save(autionsAds);
        return ResponseEntity.created(new URI("/api/autions-ads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /autions-ads : Updates an existing autionsAds.
     *
     * @param autionsAds the autionsAds to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated autionsAds,
     * or with status 400 (Bad Request) if the autionsAds is not valid,
     * or with status 500 (Internal Server Error) if the autionsAds couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/autions-ads")
    @Timed
    public ResponseEntity<AutionsAds> updateAutionsAds(@Valid @RequestBody AutionsAds autionsAds) throws URISyntaxException {
        log.debug("REST request to update AutionsAds : {}", autionsAds);
        if (autionsAds.getId() == null) {
            return createAutionsAds(autionsAds);
        }
        AutionsAds result = autionsAdsService.save(autionsAds);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, autionsAds.getId().toString()))
            .body(result);
    }

    /**
     * GET  /autions-ads : get all the autionsAds.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of autionsAds in body
     */
    @GetMapping("/autions-ads")
    @Timed
    public ResponseEntity<List<AutionsAds>> getAllAutionsAds(Pageable pageable) {
        log.debug("REST request to get a page of AutionsAds");
        Page<AutionsAds> page = autionsAdsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/autions-ads");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /autions-ads/:id : get the "id" autionsAds.
     *
     * @param id the id of the autionsAds to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the autionsAds, or with status 404 (Not Found)
     */
    @GetMapping("/autions-ads/{id}")
    @Timed
    public ResponseEntity<AutionsAds> getAutionsAds(@PathVariable Long id) {
        log.debug("REST request to get AutionsAds : {}", id);
        AutionsAds autionsAds = autionsAdsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(autionsAds));
    }

    /**
     * DELETE  /autions-ads/:id : delete the "id" autionsAds.
     *
     * @param id the id of the autionsAds to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/autions-ads/{id}")
    @Timed
    public ResponseEntity<Void> deleteAutionsAds(@PathVariable Long id) {
        log.debug("REST request to delete AutionsAds : {}", id);
        autionsAdsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/autions-ads?query=:query : search for the autionsAds corresponding
     * to the query.
     *
     * @param query the query of the autionsAds search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/autions-ads")
    @Timed
    public ResponseEntity<List<AutionsAds>> searchAutionsAds(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of AutionsAds for query {}", query);
        Page<AutionsAds> page = autionsAdsService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/autions-ads");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
