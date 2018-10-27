package com.auctionads.repository;

import com.auctionads.domain.Advertisement;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Advertisement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {

    @Query("select advertisement from Advertisement advertisement where advertisement.user.login = ?#{principal.username}")
    List<Advertisement> findByUserIsCurrentUser();

}
