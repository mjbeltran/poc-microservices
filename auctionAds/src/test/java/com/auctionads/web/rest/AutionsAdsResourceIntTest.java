package com.auctionads.web.rest;

import com.auctionads.AuctionAdsApp;

import com.auctionads.domain.AutionsAds;
import com.auctionads.repository.AutionsAdsRepository;
import com.auctionads.service.AutionsAdsService;
import com.auctionads.repository.search.AutionsAdsSearchRepository;
import com.auctionads.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.auctionads.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AutionsAdsResource REST controller.
 *
 * @see AutionsAdsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AuctionAdsApp.class)
public class AutionsAdsResourceIntTest {

    private static final Integer DEFAULT_ID_AUCTION = 1;
    private static final Integer UPDATED_ID_AUCTION = 2;

    private static final Double DEFAULT_PRICE_AUCTION = 1D;
    private static final Double UPDATED_PRICE_AUCTION = 2D;

    private static final LocalDate DEFAULT_DATE_ACTION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ACTION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AutionsAdsRepository autionsAdsRepository;

    @Autowired
    private AutionsAdsService autionsAdsService;

    @Autowired
    private AutionsAdsSearchRepository autionsAdsSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAutionsAdsMockMvc;

    private AutionsAds autionsAds;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AutionsAdsResource autionsAdsResource = new AutionsAdsResource(autionsAdsService);
        this.restAutionsAdsMockMvc = MockMvcBuilders.standaloneSetup(autionsAdsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AutionsAds createEntity(EntityManager em) {
        AutionsAds autionsAds = new AutionsAds()
            .idAuction(DEFAULT_ID_AUCTION)
            .priceAuction(DEFAULT_PRICE_AUCTION)
            .dateAction(DEFAULT_DATE_ACTION);
        return autionsAds;
    }

    @Before
    public void initTest() {
        autionsAdsSearchRepository.deleteAll();
        autionsAds = createEntity(em);
    }

    @Test
    @Transactional
    public void createAutionsAds() throws Exception {
        int databaseSizeBeforeCreate = autionsAdsRepository.findAll().size();

        // Create the AutionsAds
        restAutionsAdsMockMvc.perform(post("/api/autions-ads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autionsAds)))
            .andExpect(status().isCreated());

        // Validate the AutionsAds in the database
        List<AutionsAds> autionsAdsList = autionsAdsRepository.findAll();
        assertThat(autionsAdsList).hasSize(databaseSizeBeforeCreate + 1);
        AutionsAds testAutionsAds = autionsAdsList.get(autionsAdsList.size() - 1);
        assertThat(testAutionsAds.getIdAuction()).isEqualTo(DEFAULT_ID_AUCTION);
        assertThat(testAutionsAds.getPriceAuction()).isEqualTo(DEFAULT_PRICE_AUCTION);
        assertThat(testAutionsAds.getDateAction()).isEqualTo(DEFAULT_DATE_ACTION);

        // Validate the AutionsAds in Elasticsearch
        AutionsAds autionsAdsEs = autionsAdsSearchRepository.findOne(testAutionsAds.getId());
        assertThat(autionsAdsEs).isEqualToIgnoringGivenFields(testAutionsAds);
    }

    @Test
    @Transactional
    public void createAutionsAdsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = autionsAdsRepository.findAll().size();

        // Create the AutionsAds with an existing ID
        autionsAds.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutionsAdsMockMvc.perform(post("/api/autions-ads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autionsAds)))
            .andExpect(status().isBadRequest());

        // Validate the AutionsAds in the database
        List<AutionsAds> autionsAdsList = autionsAdsRepository.findAll();
        assertThat(autionsAdsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdAuctionIsRequired() throws Exception {
        int databaseSizeBeforeTest = autionsAdsRepository.findAll().size();
        // set the field null
        autionsAds.setIdAuction(null);

        // Create the AutionsAds, which fails.

        restAutionsAdsMockMvc.perform(post("/api/autions-ads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autionsAds)))
            .andExpect(status().isBadRequest());

        List<AutionsAds> autionsAdsList = autionsAdsRepository.findAll();
        assertThat(autionsAdsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceAuctionIsRequired() throws Exception {
        int databaseSizeBeforeTest = autionsAdsRepository.findAll().size();
        // set the field null
        autionsAds.setPriceAuction(null);

        // Create the AutionsAds, which fails.

        restAutionsAdsMockMvc.perform(post("/api/autions-ads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autionsAds)))
            .andExpect(status().isBadRequest());

        List<AutionsAds> autionsAdsList = autionsAdsRepository.findAll();
        assertThat(autionsAdsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAutionsAds() throws Exception {
        // Initialize the database
        autionsAdsRepository.saveAndFlush(autionsAds);

        // Get all the autionsAdsList
        restAutionsAdsMockMvc.perform(get("/api/autions-ads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(autionsAds.getId().intValue())))
            .andExpect(jsonPath("$.[*].idAuction").value(hasItem(DEFAULT_ID_AUCTION)))
            .andExpect(jsonPath("$.[*].priceAuction").value(hasItem(DEFAULT_PRICE_AUCTION.doubleValue())))
            .andExpect(jsonPath("$.[*].dateAction").value(hasItem(DEFAULT_DATE_ACTION.toString())));
    }

    @Test
    @Transactional
    public void getAutionsAds() throws Exception {
        // Initialize the database
        autionsAdsRepository.saveAndFlush(autionsAds);

        // Get the autionsAds
        restAutionsAdsMockMvc.perform(get("/api/autions-ads/{id}", autionsAds.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(autionsAds.getId().intValue()))
            .andExpect(jsonPath("$.idAuction").value(DEFAULT_ID_AUCTION))
            .andExpect(jsonPath("$.priceAuction").value(DEFAULT_PRICE_AUCTION.doubleValue()))
            .andExpect(jsonPath("$.dateAction").value(DEFAULT_DATE_ACTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAutionsAds() throws Exception {
        // Get the autionsAds
        restAutionsAdsMockMvc.perform(get("/api/autions-ads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAutionsAds() throws Exception {
        // Initialize the database
        autionsAdsService.save(autionsAds);

        int databaseSizeBeforeUpdate = autionsAdsRepository.findAll().size();

        // Update the autionsAds
        AutionsAds updatedAutionsAds = autionsAdsRepository.findOne(autionsAds.getId());
        // Disconnect from session so that the updates on updatedAutionsAds are not directly saved in db
        em.detach(updatedAutionsAds);
        updatedAutionsAds
            .idAuction(UPDATED_ID_AUCTION)
            .priceAuction(UPDATED_PRICE_AUCTION)
            .dateAction(UPDATED_DATE_ACTION);

        restAutionsAdsMockMvc.perform(put("/api/autions-ads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAutionsAds)))
            .andExpect(status().isOk());

        // Validate the AutionsAds in the database
        List<AutionsAds> autionsAdsList = autionsAdsRepository.findAll();
        assertThat(autionsAdsList).hasSize(databaseSizeBeforeUpdate);
        AutionsAds testAutionsAds = autionsAdsList.get(autionsAdsList.size() - 1);
        assertThat(testAutionsAds.getIdAuction()).isEqualTo(UPDATED_ID_AUCTION);
        assertThat(testAutionsAds.getPriceAuction()).isEqualTo(UPDATED_PRICE_AUCTION);
        assertThat(testAutionsAds.getDateAction()).isEqualTo(UPDATED_DATE_ACTION);

        // Validate the AutionsAds in Elasticsearch
        AutionsAds autionsAdsEs = autionsAdsSearchRepository.findOne(testAutionsAds.getId());
        assertThat(autionsAdsEs).isEqualToIgnoringGivenFields(testAutionsAds);
    }

    @Test
    @Transactional
    public void updateNonExistingAutionsAds() throws Exception {
        int databaseSizeBeforeUpdate = autionsAdsRepository.findAll().size();

        // Create the AutionsAds

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAutionsAdsMockMvc.perform(put("/api/autions-ads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autionsAds)))
            .andExpect(status().isCreated());

        // Validate the AutionsAds in the database
        List<AutionsAds> autionsAdsList = autionsAdsRepository.findAll();
        assertThat(autionsAdsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAutionsAds() throws Exception {
        // Initialize the database
        autionsAdsService.save(autionsAds);

        int databaseSizeBeforeDelete = autionsAdsRepository.findAll().size();

        // Get the autionsAds
        restAutionsAdsMockMvc.perform(delete("/api/autions-ads/{id}", autionsAds.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean autionsAdsExistsInEs = autionsAdsSearchRepository.exists(autionsAds.getId());
        assertThat(autionsAdsExistsInEs).isFalse();

        // Validate the database is empty
        List<AutionsAds> autionsAdsList = autionsAdsRepository.findAll();
        assertThat(autionsAdsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAutionsAds() throws Exception {
        // Initialize the database
        autionsAdsService.save(autionsAds);

        // Search the autionsAds
        restAutionsAdsMockMvc.perform(get("/api/_search/autions-ads?query=id:" + autionsAds.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(autionsAds.getId().intValue())))
            .andExpect(jsonPath("$.[*].idAuction").value(hasItem(DEFAULT_ID_AUCTION)))
            .andExpect(jsonPath("$.[*].priceAuction").value(hasItem(DEFAULT_PRICE_AUCTION.doubleValue())))
            .andExpect(jsonPath("$.[*].dateAction").value(hasItem(DEFAULT_DATE_ACTION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AutionsAds.class);
        AutionsAds autionsAds1 = new AutionsAds();
        autionsAds1.setId(1L);
        AutionsAds autionsAds2 = new AutionsAds();
        autionsAds2.setId(autionsAds1.getId());
        assertThat(autionsAds1).isEqualTo(autionsAds2);
        autionsAds2.setId(2L);
        assertThat(autionsAds1).isNotEqualTo(autionsAds2);
        autionsAds1.setId(null);
        assertThat(autionsAds1).isNotEqualTo(autionsAds2);
    }
}
