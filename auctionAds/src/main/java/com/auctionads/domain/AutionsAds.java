package com.auctionads.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A AutionsAds.
 */
@Entity
@Table(name = "autions_ads")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "autionsads")
public class AutionsAds implements Serializable {
	
	

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "id_auction", nullable = false)
    private Integer idAuction;

    @NotNull
    @Column(name = "price_auction", nullable = false)
    private Double priceAuction;

    @Column(name = "date_action")
    private LocalDate dateAction;

    @ManyToOne
    private Advertisement advertisement;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdAuction() {
        return idAuction;
    }

    public AutionsAds idAuction(Integer idAuction) {
        this.idAuction = idAuction;
        return this;
    }

    public void setIdAuction(Integer idAuction) {
        this.idAuction = idAuction;
    }

    public Double getPriceAuction() {
        return priceAuction;
    }

    public AutionsAds priceAuction(Double priceAuction) {
        this.priceAuction = priceAuction;
        return this;
    }

    public void setPriceAuction(Double priceAuction) {
        this.priceAuction = priceAuction;
    }

    public LocalDate getDateAction() {
        return dateAction;
    }

    public AutionsAds dateAction(LocalDate dateAction) {
        this.dateAction = dateAction;
        return this;
    }

    public void setDateAction(LocalDate dateAction) {
        this.dateAction = dateAction;
    }

    public Advertisement getAdvertisement() {
        return advertisement;
    }

    public AutionsAds advertisement(Advertisement advertisement) {
        this.advertisement = advertisement;
        return this;
    }

    public void setAdvertisement(Advertisement advertisement) {
        this.advertisement = advertisement;
    }

    public User getUser() {
        return user;
    }

    public AutionsAds user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AutionsAds autionsAds = (AutionsAds) o;
        if (autionsAds.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), autionsAds.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AutionsAds{" +
            "id=" + getId() +
            ", idAuction=" + getIdAuction() +
            ", priceAuction=" + getPriceAuction() +
            ", dateAction='" + getDateAction() + "'" +
            "}";
    }
}
