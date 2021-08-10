<template>
  <div class="page--py">
    <div class="container">
      <div class="d-flex align-items-center mb-6">
        <h3 class="section__title ps-3 mb-0 me-6">收藏</h3>
        <ul class="page__sideNav">
          <li
            ref="page__sideNav__item--job"
            class="page__sideNav__item active"
            @click="this.navState = 'job'"
          >
            <p class="page__sideNav__item__title">職位收藏</p>
          </li>
          <li
            ref="page__sideNav__item--company"
            class="page__sideNav__item"
            @click="this.navState = 'company'"
          >
            <p class="page__sideNav__item__title">企業收藏</p>
          </li>
        </ul>
      </div>
      <div ref="collectionBoxList--job" class="bg-light p-6 rounded" v-if="navState === 'job'">
        <div class="row">
          <div class="col-md-4 col-12">
            <div class="collectionBox collectionBox--new" @click="newCollectionFolder">
              <div class="collectionBox__imgBox">
                <div class="collectionBox__imgBox__item item--fri"></div>
                <div class="collectionBox__imgBox__innerBox">
                  <div class="collectionBox__imgBox__item item--sec"></div>
                  <div class="collectionBox__imgBox__innerBox__littleBox">
                    <div class="collectionBox__imgBox__item item--tri"></div>
                    <div class="collectionBox__imgBox__item item--four"></div>
                  </div>
                </div>
                <div class="collectionBox--new__cover">
                  <p class="collectionBox--new__newBtn">
                    <i class="jobIcon bi bi-plus-lg me-2"></i>新增收藏夾
                  </p>
                </div>
              </div>
              <div class="collectionBox__txtBox"></div>
            </div>
          </div>
          <template v-for="(folder, index) in jobCollectionList" :key="index">
            <router-link
              class="col-md-4 col-12"
              v-if="jobCollectionList.length > 0"
              :to="`/collection-folder/${folder.id}`"
            >
              <div class="collectionBox">
                <div class="collectionBox__imgBox">
                  <div class="collectionBox__imgBox__item item--fri">
                    <img
                      v-if="folder.jobs[0]"
                      :src="folder.jobs[0].imageUrl"
                      :alt="`職位圖片${index}`"
                    />
                  </div>
                  <div class="collectionBox__imgBox__innerBox">
                    <div class="collectionBox__imgBox__item item--sec">
                      <img
                        v-if="folder.jobs[1]"
                        :src="folder.jobs[1].imageUrl"
                        :alt="`職位圖片${index}`"
                      />
                    </div>
                    <div class="collectionBox__imgBox__innerBox__littleBox">
                      <div class="collectionBox__imgBox__item item--tri">
                        <img
                          v-if="folder.jobs[2]"
                          :src="folder.jobs[2].imageUrl"
                          :alt="`職位圖片${index}`"
                        />
                      </div>
                      <div class="collectionBox__imgBox__item item--four">
                        <img
                          v-if="folder.jobs[3]"
                          :src="folder.jobs[3].imageUrl"
                          :alt="`職位圖片${index}`"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="collectionBox__txtBox">
                  <p class="txtBox__title">{{ folder.title }}</p>
                  <p>{{ folder.jobs.length }} 個職位</p>
                </div>
              </div>
            </router-link>
          </template>
        </div>
      </div>
      <div ref="collectionBoxList--company" v-if="navState === 'company'">
        <div class="row">
          <div class="col-12">
            <p>尚未關注企業</p>
          </div>
          <template v-for="(company, index) in companyCollectionList" :key="index">
            <div class="col-md-4 col-12" v-if="companyCollectionList.length > 0">
              <div class="collectionCompanyCard card">
                <img
                  :src="company.imagesUrl[0]"
                  class="card-img-top"
                  :alt="`${company.title}職位圖片`"
                />
                <div class="card-body">
                  <h5 class="card-title">{{ company.title }}</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make up the bulk of the
                    card's content.
                  </p>
                  <div class="d-flex">
                    <p class="page__txt">
                      <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                      {{ company.category }}
                    </p>
                  </div>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <JobCollect ref="JobCollectModal" @return-job-collection="returnJobCollection" />
  <CompanyCollect @returnCompanyCollection="returnCompanyCollection" />
</template>

<script>
import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import JobCollect from '@/components/helpers/JobCollect.vue';
import CompanyCollect from '@/components/helpers/CompanyCollect.vue';

export default {
  components: {
    UpTopBtn,
    JobCollect,
    CompanyCollect,
  },
  data() {
    return {
      navState: 'job',
      jobItem: {
        options: {
          company: {
            companyImagesUrl: [],
          },
          job: {},
        },
      },
      companyCollectionList: [],
      jobCollectionList: [],
      companyIsCollect: false,
    };
  },
  watch: {
    navState(newValue, oldValue) {
      emitter.emit('spinner-open-bg', 1000);
      console.log(newValue, oldValue);
      this.$refs[`page__sideNav__item--${newValue}`].classList.add('active');
      this.$refs[`page__sideNav__item--${oldValue}`].classList.remove('active');
    },
  },
  methods: {
    collectCompany(item) {
      emitter.emit('open-collect-company-modal', item);
    },
    newCollectionFolder() {
      emitter.emit('open-creat-collect-modal');
    },
    // 取得收藏職位資料
    returnJobCollection(array) {
      this.jobCollectionList = array;
    },
    returnCompanyCollection(array) {
      this.companyCollectionList = array;
    },
  },
  created() {
    emitter.emit('spinner-open-bg', 1000);
  },
  mounted() {
    emitter.emit('return-local-collection');
  },
};
</script>

<style lang="scss"></style>
