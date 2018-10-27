package com.auctionads.repository.search;

import com.auctionads.domain.Advertisement;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Advertisement entity.
 */
public interface AdvertisementSearchRepository extends ElasticsearchRepository<Advertisement, Long> {
}
