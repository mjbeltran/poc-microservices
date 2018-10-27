package com.auctionads.web.rest;

import com.auctionads.AuctionAdsApp;

import com.auctionads.domain.Advertisement;
import com.auctionads.repository.AdvertisementRepository;
import com.auctionads.service.AdvertisementService;
import com.auctionads.repository.search.AdvertisementSearchRepository;
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
import org.springframework.util.Base64Utils;

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
 * Test class for the AdvertisementResource REST controller.
 *
 * @see AdvertisementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AuctionAdsApp.class)
public class AdvertisementResourceIntTest {

    private static final Integer DEFAULT_ID_AD = 1;
    private static final Integer UPDATED_ID_AD = 2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGES = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGES = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_IMAGES_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGES_CONTENT_TYPE = "image/png";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Autowired
    private AdvertisementService advertisementService;

    @Autowired
    private AdvertisementSearchRepository advertisementSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAdvertisementMockMvc;

    private Advertisement advertisement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AdvertisementResource advertisementResource = new AdvertisementResource(advertisementService);
        this.restAdvertisementMockMvc = MockMvcBuilders.standaloneSetup(advertisementResource)
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
    public static Advertisement createEntity(EntityManager em) {
        Advertisement advertisement = new Advertisement()
            .idAd(DEFAULT_ID_AD)
            .description(DEFAULT_DESCRIPTION)
            .images(DEFAULT_IMAGES)
            .imagesContentType(DEFAULT_IMAGES_CONTENT_TYPE)
            .date(DEFAULT_DATE);
        return advertisement;
    }

    @Before
    public void initTest() {
        advertisementSearchRepository.deleteAll();
        advertisement = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdvertisement() throws Exception {
        int databaseSizeBeforeCreate = advertisementRepository.findAll().size();

        // Create the Advertisement
        restAdvertisementMockMvc.perform(post("/api/advertisements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisement)))
            .andExpect(status().isCreated());

        // Validate the Advertisement in the database
        List<Advertisement> advertisementList = advertisementRepository.findAll();
        assertThat(advertisementList).hasSize(databaseSizeBeforeCreate + 1);
        Advertisement testAdvertisement = advertisementList.get(advertisementList.size() - 1);
        assertThat(testAdvertisement.getIdAd()).isEqualTo(DEFAULT_ID_AD);
        assertThat(testAdvertisement.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAdvertisement.getImages()).isEqualTo(DEFAULT_IMAGES);
        assertThat(testAdvertisement.getImagesContentType()).isEqualTo(DEFAULT_IMAGES_CONTENT_TYPE);
        assertThat(testAdvertisement.getDate()).isEqualTo(DEFAULT_DATE);

        // Validate the Advertisement in Elasticsearch
        Advertisement advertisementEs = advertisementSearchRepository.findOne(testAdvertisement.getId());
        assertThat(advertisementEs).isEqualToIgnoringGivenFields(testAdvertisement);
    }

    @Test
    @Transactional
    public void createAdvertisementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = advertisementRepository.findAll().size();

        // Create the Advertisement with an existing ID
        advertisement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdvertisementMockMvc.perform(post("/api/advertisements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisement)))
            .andExpect(status().isBadRequest());

        // Validate the Advertisement in the database
        List<Advertisement> advertisementList = advertisementRepository.findAll();
        assertThat(advertisementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdAdIsRequired() throws Exception {
        int databaseSizeBeforeTest = advertisementRepository.findAll().size();
        // set the field null
        advertisement.setIdAd(null);

        // Create the Advertisement, which fails.

        restAdvertisementMockMvc.perform(post("/api/advertisements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisement)))
            .andExpect(status().isBadRequest());

        List<Advertisement> advertisementList = advertisementRepository.findAll();
        assertThat(advertisementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = advertisementRepository.findAll().size();
        // set the field null
        advertisement.setDescription(null);

        // Create the Advertisement, which fails.

        restAdvertisementMockMvc.perform(post("/api/advertisements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisement)))
            .andExpect(status().isBadRequest());

        List<Advertisement> advertisementList = advertisementRepository.findAll();
        assertThat(advertisementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkImagesIsRequired() throws Exception {
        int databaseSizeBeforeTest = advertisementRepository.findAll().size();
        // set the field null
        advertisement.setImages(null);

        // Create the Advertisement, which fails.

        restAdvertisementMockMvc.perform(post("/api/advertisements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisement)))
            .andExpect(status().isBadRequest());

        List<Advertisement> advertisementList = advertisementRepository.findAll();
        assertThat(advertisementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = advertisementRepository.findAll().size();
        // set the field null
        advertisement.setDate(null);

        // Create the Advertisement, which fails.

        restAdvertisementMockMvc.perform(post("/api/advertisements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisement)))
            .andExpect(status().isBadRequest());

        List<Advertisement> advertisementList = advertisementRepository.findAll();
        assertThat(advertisementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAdvertisements() throws Exception {
        // Initialize the database
        advertisementRepository.saveAndFlush(advertisement);

        // Get all the advertisementList
        restAdvertisementMockMvc.perform(get("/api/advertisements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(advertisement.getId().intValue())))
            .andExpect(jsonPath("$.[*].idAd").value(hasItem(DEFAULT_ID_AD)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].imagesContentType").value(hasItem(DEFAULT_IMAGES_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].images").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGES))))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void getAdvertisement() throws Exception {
        // Initialize the database
        advertisementRepository.saveAndFlush(advertisement);

        // Get the advertisement
        restAdvertisementMockMvc.perform(get("/api/advertisements/{id}", advertisement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(advertisement.getId().intValue()))
            .andExpect(jsonPath("$.idAd").value(DEFAULT_ID_AD))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.imagesContentType").value(DEFAULT_IMAGES_CONTENT_TYPE))
            .andExpect(jsonPath("$.images").value(Base64Utils.encodeToString(DEFAULT_IMAGES)))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAdvertisement() throws Exception {
        // Get the advertisement
        restAdvertisementMockMvc.perform(get("/api/advertisements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdvertisement() throws Exception {
        // Initialize the database
        advertisementService.save(advertisement);

        int databaseSizeBeforeUpdate = advertisementRepository.findAll().size();

        // Update the advertisement
        Advertisement updatedAdvertisement = advertisementRepository.findOne(advertisement.getId());
        // Disconnect from session so that the updates on updatedAdvertisement are not directly saved in db
        em.detach(updatedAdvertisement);
        updatedAdvertisement
            .idAd(UPDATED_ID_AD)
            .description(UPDATED_DESCRIPTION)
            .images(UPDATED_IMAGES)
            .imagesContentType(UPDATED_IMAGES_CONTENT_TYPE)
            .date(UPDATED_DATE);

        restAdvertisementMockMvc.perform(put("/api/advertisements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAdvertisement)))
            .andExpect(status().isOk());

        // Validate the Advertisement in the database
        List<Advertisement> advertisementList = advertisementRepository.findAll();
        assertThat(advertisementList).hasSize(databaseSizeBeforeUpdate);
        Advertisement testAdvertisement = advertisementList.get(advertisementList.size() - 1);
        assertThat(testAdvertisement.getIdAd()).isEqualTo(UPDATED_ID_AD);
        assertThat(testAdvertisement.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAdvertisement.getImages()).isEqualTo(UPDATED_IMAGES);
        assertThat(testAdvertisement.getImagesContentType()).isEqualTo(UPDATED_IMAGES_CONTENT_TYPE);
        assertThat(testAdvertisement.getDate()).isEqualTo(UPDATED_DATE);

        // Validate the Advertisement in Elasticsearch
        Advertisement advertisementEs = advertisementSearchRepository.findOne(testAdvertisement.getId());
        assertThat(advertisementEs).isEqualToIgnoringGivenFields(testAdvertisement);
    }

    @Test
    @Transactional
    public void updateNonExistingAdvertisement() throws Exception {
        int databaseSizeBeforeUpdate = advertisementRepository.findAll().size();

        // Create the Advertisement

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAdvertisementMockMvc.perform(put("/api/advertisements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisement)))
            .andExpect(status().isCreated());

        // Validate the Advertisement in the database
        List<Advertisement> advertisementList = advertisementRepository.findAll();
        assertThat(advertisementList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAdvertisement() throws Exception {
        // Initialize the database
        advertisementService.save(advertisement);

        int databaseSizeBeforeDelete = advertisementRepository.findAll().size();

        // Get the advertisement
        restAdvertisementMockMvc.perform(delete("/api/advertisements/{id}", advertisement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean advertisementExistsInEs = advertisementSearchRepository.exists(advertisement.getId());
        assertThat(advertisementExistsInEs).isFalse();

        // Validate the database is empty
        List<Advertisement> advertisementList = advertisementRepository.findAll();
        assertThat(advertisementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAdvertisement() throws Exception {
        // Initialize the database
        advertisementService.save(advertisement);

        // Search the advertisement
        restAdvertisementMockMvc.perform(get("/api/_search/advertisements?query=id:" + advertisement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(advertisement.getId().intValue())))
            .andExpect(jsonPath("$.[*].idAd").value(hasItem(DEFAULT_ID_AD)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].imagesContentType").value(hasItem(DEFAULT_IMAGES_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].images").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGES))))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Advertisement.class);
        Advertisement advertisement1 = new Advertisement();
        advertisement1.setId(1L);
        Advertisement advertisement2 = new Advertisement();
        advertisement2.setId(advertisement1.getId());
        assertThat(advertisement1).isEqualTo(advertisement2);
        advertisement2.setId(2L);
        assertThat(advertisement1).isNotEqualTo(advertisement2);
        advertisement1.setId(null);
        assertThat(advertisement1).isNotEqualTo(advertisement2);
    }
}
