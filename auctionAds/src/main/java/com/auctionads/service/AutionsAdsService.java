package com.auctionads.service;

import com.auctionads.domain.AutionsAds;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing AutionsAds.
 */
public interface AutionsAdsService {

    /**
     * Save a autionsAds.
     *
     * @param autionsAds the entity to save
     * @return the persisted entity
     */
    AutionsAds save(AutionsAds autionsAds);

    /**
     * Get all the autionsAds.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<AutionsAds> findAll(Pageable pageable);

    /**
     * Get the "id" autionsAds.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AutionsAds findOne(Long id);

    /**
     * Delete the "id" autionsAds.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the autionsAds corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<AutionsAds> search(String query, Pageable pageable);
}
