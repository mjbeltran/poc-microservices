package com.auctionads.service.impl;

import com.auctionads.service.AdvertisementService;
import com.auctionads.domain.Advertisement;
import com.auctionads.repository.AdvertisementRepository;
import com.auctionads.repository.search.AdvertisementSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Advertisement.
 */
@Service
@Transactional
public class AdvertisementServiceImpl implements AdvertisementService {

    private final Logger log = LoggerFactory.getLogger(AdvertisementServiceImpl.class);

    private final AdvertisementRepository advertisementRepository;

    private final AdvertisementSearchRepository advertisementSearchRepository;

    public AdvertisementServiceImpl(AdvertisementRepository advertisementRepository, AdvertisementSearchRepository advertisementSearchRepository) {
        this.advertisementRepository = advertisementRepository;
        this.advertisementSearchRepository = advertisementSearchRepository;
    }

    /**
     * Save a advertisement.
     *
     * @param advertisement the entity to save
     * @return the persisted entity
     */
    @Override
    public Advertisement save(Advertisement advertisement) {
        log.debug("Request to save Advertisement : {}", advertisement);
        Advertisement result = advertisementRepository.save(advertisement);
        advertisementSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the advertisements.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Advertisement> findAll(Pageable pageable) {
        log.debug("Request to get all Advertisements");
        return advertisementRepository.findAll(pageable);
    }

    /**
     * Get one advertisement by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Advertisement findOne(Long id) {
        log.debug("Request to get Advertisement : {}", id);
        return advertisementRepository.findOne(id);
    }

    /**
     * Delete the advertisement by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Advertisement : {}", id);
        advertisementRepository.delete(id);
        advertisementSearchRepository.delete(id);
    }

    /**
     * Search for the advertisement corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Advertisement> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Advertisements for query {}", query);
        Page<Advertisement> result = advertisementSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
