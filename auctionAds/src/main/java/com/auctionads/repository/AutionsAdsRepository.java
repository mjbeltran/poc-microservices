package com.auctionads.repository;

import com.auctionads.domain.AutionsAds;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the AutionsAds entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutionsAdsRepository extends JpaRepository<AutionsAds, Long> {

    @Query("select autions_ads from AutionsAds autions_ads where autions_ads.user.login = ?#{principal.username}")
    List<AutionsAds> findByUserIsCurrentUser();

}
