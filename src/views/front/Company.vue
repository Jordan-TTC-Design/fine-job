<template>
  <div class="page--py">
    <div class="container-fuild">
      <div v-if="isExist" class="container companyPage">
        <div class="row">
          <div class="col-lg-9 col-12">
            <div class="companyInfoBox box--shadow mb-3  position-relative">
              <button
                class="collectBtn--company btn btn-outline-gray-line"
                type="button"
                :class="{ active: companyIsCollect }"
                @click="collectCompany(companyItem)"
              >
                <i class="jobIcon bi bi-bookmark-fill me-1"></i
                >{{ this.companyIsCollect ? '已關注' : '關注公司' }}
              </button>
              <div class="d-flex flex-md-row flex-column align-items-md-stretch align-items-center">
                <div class="companyInfoBox__logoImgBox mb-md-0 mb-4 me-md-4">
                  <img
                    class="logoImg"
                    :src="companyItem.imageUrl"
                    :alt="`${companyItem.title}logo`"
                  />
                </div>
                <div
                  class="companyInfoBox__txtBox d-flex flex-column justify-content-between
              align-items-md-start align-items-center pt-3"
                >
                  <h2 class="page__title mb-3">{{ companyItem.title }}</h2>
                  <div
                    class="d-flex flex-md-row flex-column justify-content-between
                align-items-end w-100"
                  >
                    <div class="align-self-md-stretch align-self-center">
                      <p class="page__txt mb-3">
                        <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                        >{{ companyItem.options.companyAddressCity }}，{{
                          companyItem.options.companyAddressDetail
                        }}
                      </p>
                      <p class="page__txt">
                        <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                        {{ companyItem.category }}
                      </p>
                    </div>
                    <div>
                      <p class="subTxt text-secondary">
                        {{ $filters.date(companyItem.options.create) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="companyInfoBox box--shadow mb-3">
              <h3 class="section__title--sub"><span class="title__icon"></span>公司照片</h3>
              <div class="d-flex justify-content-between flex-md-row flex-column">
                <img
                  v-for="(item, index) in companyItem.imagesUrl"
                  class="companyPage__companyImage mb-md-0 mb-2 putPointer"
                  :src="item"
                  :alt="`${companyItem.title}公司圖片${index}`"
                  :key="index"
                  @click="openImgModal(companyItem.imagesUrl)"
                />
              </div>
            </div>
            <div class="companyInfoBox  box--shadow  mb-3">
              <h3 class="section__title--sub"><span class="title__icon"></span>公司簡介</h3>
              <div class="page__txt" v-html="companyItem.content"></div>
            </div>
            <div class="companyInfoBox  box--shadow  mb-lg-0 mb-3">
              <h3 class="section__title--sub"><span class="title__icon"></span>公司職位</h3>
              <ul class="companyJobList d-flex flex-wrap justify-content-between">
                <li
                  :data-id="item.id"
                  v-for="item in companyJobs"
                  :key="item.id"
                  class="jobList__item d-flex flex-column align-items-start mb-4"
                >
                  <button
                    class="collectBtn btn  position-absolute"
                    type="button"
                    @click="collectJob(item)"
                  >
                    <i class="jobIcon bi bi-bookmark-fill"></i>
                  </button>
                  <div class="mb-3">
                    <button
                      type="button"
                      class="jobTag btn"
                      @click="searchByJobCategory(item.category)"
                    >
                      {{ item.category }}
                    </button>
                  </div>
                  <div class="d-flex">
                    <div class="jobList__item__imgBox me-3">
                      <img class="jobImg" :src="item.imageUrl" :alt="`${item.title}職位圖片`" />
                    </div>
                    <div
                      class="jobList__item__txtBox
                  flex-grow-1 d-flex flex-column justify-content-between"
                    >
                      <div class="mb-3 d-flex flex-column">
                        <router-link
                          class="jobList__item__title text-dark mb-3 me-7 pe-auto"
                          :to="`/products-list/product/${item.id}`"
                          >{{ item.title }}</router-link
                        >
                        <p class="page__txt  subTxt mb-2 me-7">
                          {{ item.options.company.companyName }}
                        </p>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <p class="text-primary" v-if="!item.options.job.salaryInterView">
                          {{ item.price }} / 月薪
                        </p>
                        <p class="text-primary" v-if="item.options.job.salaryInterView">
                          薪資面議
                        </p>
                        <p class="subTxt text-secondary">
                          {{ $filters.date(item.options.job.create) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-12">
            <JobReadRecord />
          </div>
        </div>
      </div>
      <div v-else-if="isExist == false" class="cantFoundProduct">
        <h5>找不到產品</h5>
      </div>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <ImgPopModal />
  <JobCollect ref="jobCollectModal" />
  <CompanyCollect @returnCompanyCollection="checkCompanyCollect" />
</template>

<script>
import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import ImgPopModal from '@/components/helpers/ImgPopModal.vue';
import JobReadRecord from '@/components/front/JobReadRecord.vue';
import JobCollect from '@/components/helpers/JobCollect.vue';
import CompanyCollect from '@/components/helpers/CompanyCollect.vue';

export default {
  components: {
    UpTopBtn,
    ImgPopModal,
    JobReadRecord,
    JobCollect,
    CompanyCollect,
  },
  data() {
    return {
      companyItem: {
        imagesUrl: [],
        imageUrl: '',
        options: {
          company: {},
          job: {},
        },
      },
      companyJobs: [],
      jobsList: [],
      isExist: null,
      companyIsCollect: false,
      companyCollectionList: {},
    };
  },
  methods: {
    collectCompany(item) {
      const temJobList = [];
      this.companyJobs.forEach((companyJob) => {
        temJobList.push(companyJob.id);
      });
      const companyData = {
        companyInfo: item,
        companyJobList: temJobList,
      };
      emitter.emit('open-collect-company-modal', companyData);
    },
    checkCompanyCollect(collection) {
      this.companyCollectionList = collection;
      const check = this.companyCollectionList.some((item) => item.id === this.companyItem.id);
      if (check === true) {
        this.companyIsCollect = true;
      } else {
        this.companyIsCollect = false;
      }
      console.log(this.companyIsCollect);
    },
    collectJob(item) {
      emitter.emit('open-collect-modal', item);
    },
    openImgModal(imgUrl) {
      emitter.emit('imgPopModal-open', imgUrl);
    },
    searchByJobCategory(jobCategory) {
      const keyword = '不限';
      const city = '不限';
      this.$router.push(`/search/?keyword=${keyword}&city=${city}&jobCategory=${jobCategory}`);
    },
    getCompanyData() {
      emitter.emit('spinner-open');
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.isExist = true;
            this.companyItem = res.data.product;
            this.checkCompanyCollect(this.companyCollectionList);
          } else {
            this.isExist = false;
          }
          this.getJobs();
        })
        .catch((error) => {
          console.log(error);
        });
      emitter.emit('spinner-close');
    },
    getJobs() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.jobsList = [];
          this.jobsList = res.data.products;
          this.findCompanyJobs();
        })
        .catch((error) => {
          console.log(error);
        });
      emitter.emit('spinner-close');
    },
    findCompanyJobs() {
      emitter.emit('spinner-open');
      this.jobsList.forEach((item) => {
        if (item.description === '職位') {
          if (item.options.company.companyName === this.companyItem.title) {
            this.companyJobs.push(item);
          }
        }
      });
      emitter.emit('spinner-close');
      emitter.emit('check-job-read-local');
    },
  },
  created() {
    this.getCompanyData();
    emitter.emit('spinner-open-bg', 500);
  },
};
</script>

<style lang="scss"></style>
