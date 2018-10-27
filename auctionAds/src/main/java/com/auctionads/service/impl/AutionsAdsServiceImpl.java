package com.auctionads.service.impl;

import com.auctionads.service.AutionsAdsService;
import com.auctionads.domain.AutionsAds;
import com.auctionads.repository.AutionsAdsRepository;
import com.auctionads.repository.search.AutionsAdsSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing AutionsAds.
 */
@Service
@Transactional
public class AutionsAdsServiceImpl implements AutionsAdsService {

    private final Logger log = LoggerFactory.getLogger(AutionsAdsServiceImpl.class);

    private final AutionsAdsRepository autionsAdsRepository;

    private final AutionsAdsSearchRepository autionsAdsSearchRepository;

    public AutionsAdsServiceImpl(AutionsAdsRepository autionsAdsRepository, AutionsAdsSearchRepository autionsAdsSearchRepository) {
        this.autionsAdsRepository = autionsAdsRepository;
        this.autionsAdsSearchRepository = autionsAdsSearchRepository;
    }

    /**
     * Save a autionsAds.
     *
     * @param autionsAds the entity to save
     * @return the persisted entity
     */
    @Override
    public AutionsAds save(AutionsAds autionsAds) {
        log.debug("Request to save AutionsAds : {}", autionsAds);
        AutionsAds result = autionsAdsRepository.save(autionsAds);
        autionsAdsSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the autionsAds.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AutionsAds> findAll(Pageable pageable) {
        log.debug("Request to get all AutionsAds");
        return autionsAdsRepository.findAll(pageable);
    }

    /**
     * Get one autionsAds by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AutionsAds findOne(Long id) {
        log.debug("Request to get AutionsAds : {}", id);
        return autionsAdsRepository.findOne(id);
    }

    /**
     * Delete the autionsAds by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AutionsAds : {}", id);
        autionsAdsRepository.delete(id);
        autionsAdsSearchRepository.delete(id);
    }

    /**
     * Search for the autionsAds corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AutionsAds> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of AutionsAds for query {}", query);
        Page<AutionsAds> result = autionsAdsSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
