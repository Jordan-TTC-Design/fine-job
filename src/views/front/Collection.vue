<template>
  <div class="page--py">
    <div class="container">
      <div
        class="d-flex justify-content-center justify-content-lg-start
        align-items-center mb-6"
      >
        <h3 class="section__title ps-3 mb-0 me-6">收藏</h3>
        <ul class="page__sideNav">
          <li
            ref="page__sideNav__item--job"
            class="page__sideNav__item active putPointer"
            @click="this.navState = 'job'"
          >
            <p class="page__sideNav__item__title">職位收藏</p>
          </li>
          <li
            ref="page__sideNav__item--company"
            class="page__sideNav__item putPointer"
            @click="this.navState = 'company'"
          >
            <p class="page__sideNav__item__title">企業收藏</p>
          </li>
        </ul>
      </div>
      <div ref="collectionBoxList--job" class="bg-light p-6 rounded" v-if="navState === 'job'">
        <div class="row">
          <div class="col-xl-4 col-md-6 col-12">
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
              class="col-xl-4 col-md-6 col-12"
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
      <div
        ref="collectionBoxList--company"
        class="collectionBoxList--company"
        v-if="navState === 'company'"
      >
        <div class="row">
          <div class="col-12">
            <p
              class="text-center text-secondary mt-md-6 mt-2"
              v-if="companyCollectionList.length === 0"
            >
              尚未關注企業
            </p>
          </div>
          <template v-for="(company, index) in companyCollectionList" :key="index">
            <div class="col-xl-4 col-md-6 col-12" v-if="companyCollectionList.length > 0">
              <div class="collectionCompanyCard card">
                <img
                  :src="company.imagesUrl[0]"
                  class="card-img-top"
                  :alt="`${company.title}職位圖片`"
                />
                <div class="collectionCompanyCard__companyInfoBox">
                  <div class="d-flex align-items-center mb-2">
                    <div class="collectionCompanyCard__companyInfoBox__logoBox me-2">
                      <img
                        class="logoBox__logo"
                        :src="company.logoImageUrl"
                        :alt="`${company.title}logo`"
                      />
                    </div>

                    <router-link class="card__title" :to="`/products-list/company/${company.id}`">{{
                      company.title
                    }}</router-link>
                  </div>
                  <div class="d-flex justify-content-between flex-xxl-row flex-column">
                    <p class="subTxt mb-2">
                      <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                      {{ company.category }}
                    </p>
                    <p class="subTxt">
                      <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>
                      目前 {{ company.jobList.length }} 個工作機會
                    </p>
                  </div>
                </div>
                <router-link
                  class="collectionCompanyCard__Job"
                  v-if="company.jobList.length > 0"
                  :to="`/products-list/product/${company.jobList[company.jobList.length - 1].id}`"
                >
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <p class="collectionCompanyCard__Job__title">
                      {{ company.jobList[company.jobList.length - 1].title }}
                    </p>
                    <p class="jobTag--new">最新職位招募中</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p>{{ company.jobList[company.jobList.length - 1].price }} / 月薪</p>
                    <p>
                      {{
                        $filters.date(
                          company.jobList[company.jobList.length - 1].options.job.create,
                        )
                      }}
                    </p>
                  </div>
                </router-link>
                <div
                  v-if="company.jobList.length === 0"
                  class="collectionCompanyCard__Job--unRecruit"
                >
                  <p class="text-secondary">企業目前尚未開啟招募</p>
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
  <JobCollect ref="jobCollectModal" @return-job-collection="returnJobCollection" />
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
      allData: [],
      jobsList: [],
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
      this.$refs[`page__sideNav__item--${newValue}`].classList.add('active');
      this.$refs[`page__sideNav__item--${oldValue}`].classList.remove('active');
    },
  },
  computed: {
    sortJobs() {
      const temJobsArray = [];
      if (this.allData.length > 1) {
        this.allData.forEach((item) => {
          if (item.description === '職位') {
            temJobsArray.push(item);
          }
        });
      }
      return temJobsArray;
    },
    // 所有企業
    sortCompany() {
      const temCompanyArray = [];
      if (this.allData.length > 1) {
        this.allData.forEach((item) => {
          if (item.description === '企業') {
            temCompanyArray.push(item);
          }
        });
      }
      return temCompanyArray;
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
    findComapnyJobs() {
      this.companyCollectionList.forEach((company) => {
        this.sortJobs.forEach((job) => {
          if (company.title === job.options.company.companyName) {
            company.jobList.push(job);
          }
        });
      });
    },
    getOgData() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.allData = [];
          this.allData = res.data.products;
          this.classifyJobs();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    classifyJobs() {
      emitter.emit('spinner-open');
      this.allData.forEach((item) => {
        if (item.description === '職位') {
          this.jobsList.push(item);
        }
      });
      this.findComapnyJobs();
      emitter.emit('spinner-close');
    },
  },
  created() {
    emitter.emit('spinner-open-bg', 1000);
    this.getOgData();
  },
  mounted() {
    emitter.emit('return-local-collection');
  },
};
</script>

<style lang="scss"></style>
