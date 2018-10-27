package com.auctionads.repository.search;

import com.auctionads.domain.AutionsAds;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the AutionsAds entity.
 */
public interface AutionsAdsSearchRepository extends ElasticsearchRepository<AutionsAds, Long> {
}
