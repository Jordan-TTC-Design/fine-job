<template>
  <div class="page--py home">
    <div class="container-fuild">
      <!-- 搜尋banner -->
      <div class="mainBanner bg-primary">
        <div class="container position-relative">
          <div class="mainBanner__innerBox">
            <img
              class="mainBanner__img--bg"
              src="https://i.imgur.com/PRGknSk.png"
              alt="找工作在這裡"
            />
            <div class="mainBanner__txtBox">
              <h2 class="mainBanner__title mb-md-4 mb-2">立即搜尋職位</h2>
              <h2 class="mainBanner__title mb-md-9 mb-6">Got Youself A Fine Job !</h2>
            </div>
            <div class="bg-white rounded box-shadow p-md-6 p-4">
              <form
                class="mainBanner__searchBar d-flex flex-md-row flex-column
                align-items-md-center align-items-stretch"
                @submit="toSearchJob"
              >
                <img
                  class="mainBanner__logo me-3"
                  src="@/assets/images/header/fineJobLogo-square.svg"
                  alt="Fine Job logo"
                />
                <div
                  class="d-flex justify-content-between align-items-md-end  align-items-stretch
            flex-grow-1 flex-md-row flex-column"
                >
                  <div class="inputGroup--item flex-grow-1 me-md-4">
                    <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                      >關鍵字</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="searchFilterTop-keyword"
                      placeholder="職位關鍵字"
                      aria-describedby="關鍵字"
                      v-model="filterData.keyword"
                    />
                  </div>
                  <div class="inputGroup--item flex-grow-1 me-md-4 mb-md-0 mb-3">
                    <label for="searchFilterTop-city" class="form-label inputItem__title"
                      >地區</label
                    >
                    <select
                      class="form-select"
                      aria-label="地區"
                      id="searchFilterTop-city"
                      v-model="filterData.city"
                    >
                      <option disabled>請選擇地區</option>
                      <option selected value="不限">不限</option>
                      <option
                        v-for="(item, index) in formData.city"
                        :value="item"
                        :key="`地區${index}`"
                        >{{ item }}</option
                      >
                    </select>
                  </div>
                  <button class="btn btn-primary" type="submit">
                    搜尋職位
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <!-- 熱門職位 -->
        <div
          ref="sectionHotJob"
          class="sectionHotJob section--py border-bottom border-primary-light"
        >
          <div class="section__titleBox">
            <h3 class="titleBox__title">熱門職位</h3>
            <p class="titleBox__tag">推薦</p>
          </div>
          <div class="row flex-wrap">
            <div class="col-lg-6 col-12 mb-lg-0 mb-4">
              <div
                class="card--hotJob card--lg"
                v-if="this.sortHotJobs[0]"
                :style="{ 'background-image': `url(${sortHotJobs[0]['imageUrl']} )` }"
              >
                <div class="card__btnBox">
                  <button
                    class="btn--circle btn btn-outline-light"
                    type="button"
                    @click="collectJob(sortHotJobs[0])"
                  >
                    <i class="jobIcon bi bi-bookmark-fill"></i>
                  </button>
                </div>
                <div class="txtBox">
                  <router-link
                    class="card__title mb-3 d-block putPointer"
                    :to="`/products-list/product/${sortHotJobs[0].id}`"
                    >{{ sortHotJobs[0].title }}</router-link
                  >
                  <router-link
                    class="card__txt mb-3 d-block putPointer"
                    :to="`/products-list/company/${sortHotJobs[0].options.company.companyLink}`"
                    >{{ sortHotJobs[0].options.company.companyName }}</router-link
                  >
                  <p class="jobTag" v-if="!sortHotJobs[0].options.job.salaryInterView">
                    {{ sortHotJobs[0].price }} / 月薪
                  </p>
                  <p class="jobTag" v-if="sortHotJobs[0].options.job.salaryInterView">
                    薪資面議
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row">
                <template v-for="(item, index) in sortHotJobs" :key="item.id">
                  <div
                    class="col-md-6 col-12 mb-4"
                    :class="{ 'mb-lg-0': index > 2 }"
                    v-if="index >= 1 && index <= 4"
                  >
                    <div
                      class="card--hotJob card--sm"
                      v-if="sortHotJobs[index]"
                      :style="{ 'background-image': `url(${sortHotJobs[index]['imageUrl']} )` }"
                    >
                      <div class="card__btnBox">
                        <button
                          class="btn--circle btn btn-outline-light"
                          type="button"
                          @click="collectJob(item)"
                        >
                          <i class="jobIcon bi bi-bookmark-fill"></i>
                        </button>
                      </div>
                      <div class="txtBox">
                        <router-link
                          class="card__title d-block putPointer"
                          :to="`/products-list/product/${sortHotJobs[index].id}`"
                          >{{ sortHotJobs[index].title }}</router-link
                        >
                        <router-link
                          class="card__txt d-block putPointer"
                          :to="
                            `/products-list/company/${sortHotJobs[index].options.
                            company.companyLink}`
                          "
                          >{{ sortHotJobs[index].options.company.companyName }}</router-link
                        >
                        <p class="jobTag" v-if="!sortHotJobs[index].options.job.salaryInterView">
                          {{ sortHotJobs[index].price }} / 月薪
                        </p>
                        <p class="jobTag" v-if="sortHotJobs[index].options.job.salaryInterView">
                          薪資面議
                        </p>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新職位 -->
        <div class="section--newJob section--py">
          <div class="section__titleBox">
            <h3 class="titleBox__title">最新職位</h3>
            <p class="titleBox__tag">推薦</p>
          </div>
          <swiper
            :slides-per-view="swiperNum"
            :space-between="20"
            :autoplay="swiperDetail.autoPlay"
            :pagination="swiperDetail.pagination"
            :navigation="swiperDetail.navigation"
            v-if="dataOk"
          >
            <swiper-slide v-for="item in sortNewJobs" :key="item.id">
              <GoodJobCard :good-job="item"></GoodJobCard>
            </swiper-slide>
            <div class="swiper-button-prev swiper-custom">
              <button type="button" class="btn btn-lg rounded-circle iconBtnBox">
                <i class="bi bi-arrow-left actionIcon"></i>
              </button>
            </div>
            <div class="swiper-button-next swiper-custom">
              <button type="button" class="btn btn-lg rounded-circle iconBtnBox">
                <i class="bi bi-arrow-right actionIcon"></i>
              </button>
            </div>
          </swiper>
        </div>
      </div>
      <div class="bg-white">
        <div class="container">
          <!-- 本週推薦企業 -->
          <div class="weeklyCompany section--py" v-if="dataOk">
            <div class="row d-flex flex-lg-row flex-column">
              <div class="col-12">
                <div class="section__titleBox">
                  <h3 class="titleBox__title">本週推薦企業</h3>
                  <p class="titleBox__tag">推薦</p>
                </div>
              </div>
              <div class="col-lg-3 col-12 mb-lg-0 mb-md-6 mb-4">
                <div class="weeklyCompany__infoBox">
                  <div class="logoImgBox mb-4">
                    <img
                      class="logoImg"
                      :src="weeklyCompany.imageUrl"
                      :alt="`${weeklyCompany.title}企業logo`"
                    />
                  </div>
                  <div class="txtBox d-flex flex-column justify-content-between">
                    <router-link
                      class="page__title mb-4 putPointer"
                      :to="`/products-list/company/${weeklyCompany.id}`"
                      >{{ weeklyCompany.title }}</router-link
                    >
                    <p class="mb-lg-4 mb-2">
                      <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                      >{{ weeklyCompany.options.companyAddressCity }}，{{
                        weeklyCompany.options.companyAddressDetail
                      }}
                    </p>
                    <p class="mb-lg-6 mb-2">
                      <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                      {{ weeklyCompany.category }}
                    </p>
                    <router-link
                      class="btn--goToCompany btn btn-outline-gray-line text-dark
                    align-self-md-end align-self-center"
                      :to="`/products-list/company/${weeklyCompany.id}`"
                      >查看完整企業資料</router-link
                    >
                  </div>
                </div>
              </div>
              <div class="col-lg-9 col-12">
                <h5 class="page__title mb-3">公司簡介</h5>
                <div class="weeklyCompany__companyContentBox">
                  <div class="companyContent mb-3" v-html="weeklyCompany.content"></div>
                  <div class="imgBox">
                    <swiper
                      :slides-per-view="1"
                      :space-between="20"
                      :autoplay="companySwiperDetail.autoPlay"
                      :pagination="companySwiperDetail.pagination"
                      :loop="true"
                      v-if="dataOk"
                    >
                      <swiper-slide
                        v-for="companyImage in weeklyCompany.imagesUrl"
                        :key="companyImage"
                      >
                        <img class="imgBox__img" :src="companyImage" alt="本週推薦企業logo" />
                      </swiper-slide>
                    </swiper>
                  </div>
                </div>
                <h5 class="page__title mb-3">現有職位</h5>
                <div class="weeklyCompany__jobList">
                  <template
                    v-for="(companyJob, index) in weeklyCompany.jobsList"
                    :key="companyJob.id"
                  >
                    <router-link
                      class="list__item"
                      v-if="index < 4"
                      :to="`/products-list/product/${companyJob.id}`"
                    >
                      <p class="list__item__title mb-3">{{ companyJob.title }}</p>
                      <div class="d-flex justify-content-between">
                        <p class="subTxt" v-if="!companyJob.options.job.salaryInterView">
                          {{ companyJob.price }} / 月薪
                        </p>
                        <p class="subTxt" v-if="companyJob.options.job.salaryInterView">薪資面議</p>
                        <p class="subTxt">{{ $filters.date(companyJob.options.job.create) }}</p>
                      </div>
                    </router-link>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <!-- 熱門職位類別 -->
          <div class="hotCategory section--py">
            <div class="section__titleBox">
              <h3 class="titleBox__title">熱門職位類別</h3>
            </div>
            <ul class="row hotCategoryList">
              <template
                v-for="(categoryItem, index) in sortJobCategory"
                :key="categoryItem.categoryName"
              >
                <li
                  class="list__item"
                  v-if="index < 7"
                  :class="{
                    'col-lg-6 col-12': index === 0,
                    'col-lg-3 col-6': index > 0,
                    'mb-4': index < 3,
                    'mb-lg-0 mb-4': index >= 3,
                  }"
                >
                  <div class="hotCategoryBox p-md-5 p-3 d-flex">
                    <div class="d-flex flex-column justify-content-between">
                      <p class="mb-3">
                        {{ categoryItem.categoryName }}
                      </p>
                      <p class="subTxt mb-md-6 mb-3">目前共： {{ categoryItem.jobNum }} 職位</p>
                      <p class="seeMoreBtn" @click="searchByJobCategory(categoryItem.categoryName)">
                        查看更多職位 <i class="jobIcon ms-2 bi bi-arrow-right-circle"></i>
                      </p>
                    </div>
                    <img
                      :class="{ 'd-none': index > 0 }"
                      src="https://i.imgur.com/fJ55SNe.png"
                      alt="圖片-根據職位類別搜尋"
                    />
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <!-- 招募企業廣告 -->
      <div class="container">
        <div class="section--py">
          <div class="addCompanyBanner rounded p-5">
            <div class="d-flex flex-column  mb-md-0 mb-6">
              <div>
                <h3 class="text-white mb-2">Find Job 免費刊登職位中</h3>
                <h3 class="text-white mb-5">立即註冊加入，讓我們幫您找人才！</h3>
              </div>
              <div>
                <button type="button" class="btn btn-light me-2">聯絡我們</button>
                <router-link class="btn btn-primary" to="/add-company"
                  >即刻前往註冊服務</router-link
                >
              </div>
            </div>
            <img class="img-cover-top" src="https://i.imgur.com/GLgg4Fw.png" alt="圖片" />
            <img class="img-cover-bottom" src="https://i.imgur.com/hIzL1Kk.png" alt="圖片" />
            <img
              class="addCompanyBanner__mainImg"
              src="https://i.imgur.com/iZmelSd.png"
              alt="圖片"
            />
          </div>
        </div>
        <!-- 合作企業 -->
        <div class="cooperationCompany" v-if="sortCompany.length > 0">
          <div class="section__titleBox justify-content-center">
            <h3 class="titleBox__title text-dark">優質合作企業</h3>
          </div>
          <ul class="row">
            <template v-for="(companyItem, index) in sortCompany" :key="companyItem.id">
              <li
                v-if="index > 0 && index < 13"
                class="col-lg-2 col-md-4 col-6"
                :class="{
                  'd-lg-block d-none': index > 0 && index > 10,
                  'd-lg-block d-md-none': index === 10,
                }"
              >
                <div class="bg-white py-md-4 px-md-6 py-2 px-4 rounded mb-md-5 mb-3">
                  <router-link :to="`/products-list/company/${companyItem.id}`"
                    ><img
                      class="w-100"
                      :src="companyItem.imageUrl"
                      :alt="`${companyItem.title}企業logo`"
                  /></router-link>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <JobCollect ref="JobCollectModal" />
</template>

<script>
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import GoodJobCard from '@/components/front/GoodJobCard.vue';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import JobCollect from '@/components/helpers/JobCollect.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    GoodJobCard,
    Swiper,
    SwiperSlide,
    UpTopBtn,
    JobCollect,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      products: [],
      jobsList: [],
      sortWay: 'time',
      dataOk: false,
      formData: {},
      filterData: {
        keyword: '',
        city: '不限',
        industryCategory: '不限',
        jobCategory: '不限',
        workExp: '不限',
        education: '不限',
        workType: '不限',
        workTime: '不限',
        salaryLow: null,
        salaryHight: null,
        salaryInterView: false,
      },
      swiperNum: 1,
      swiperDetail: {
        autoPlay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView: this.swiperNum,
      },
      companySwiperDetail: {
        autoPlay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
        },
      },
    };
  },
  watch: {
    fullWidth(newValue) {
      if (newValue > 991.75) {
        this.swiperNum = 3;
      } else if (newValue > 767) {
        this.swiperNum = 2;
      } else {
        this.swiperNum = 1;
      }
    },
  },
  computed: {
    weeklyCompany() {
      const temArray = this.sortCompany.filter((company) => company.title === '台北健身宮');
      const weeklyCompany = { ...temArray[0], jobsList: [] };
      weeklyCompany.jobsList = this.jobsList.filter(
        (job) => job.options.company.companyName === '台北健身宮',
      );
      return weeklyCompany;
    },
    sortCompany() {
      const temCompanyArray = [];
      if (this.products.length > 1) {
        this.products.forEach((item) => {
          if (item.description === '企業') {
            temCompanyArray.push(item);
          }
        });
      }
      return temCompanyArray;
    },
    sortHotJobs() {
      const temHotArray = [];
      if (this.jobsList.length > 0) {
        const temGoodJob = this.jobsList.filter((item) => item.options.job.promote === 1);
        const arr = new Set([]);
        for (let index = 0; arr.size < 6; index += 1) {
          const num = Math.floor(Math.random() * temGoodJob.length);
          arr.add(num);
        }
        arr.forEach((i) => {
          temHotArray.push(temGoodJob[i]);
        });
      }
      return temHotArray;
    },
    sortNewJobs() {
      const temNewArray = [];
      if (this.jobsList.length > 0) {
        for (let index = 0; index < 6; index += 1) {
          temNewArray.push(this.jobsList[index]);
        }
      }
      return temNewArray;
    },
    sortJobCategory() {
      const categoryArray = [];
      this.formData.jobCategory.forEach((item) => {
        const obj = {
          categoryName: item,
          jobNum: 0,
        };
        categoryArray.push(obj);
      });
      if (categoryArray.length > 0) {
        this.jobsList.forEach((job) => {
          categoryArray.forEach((item, index) => {
            if (job.category === item.categoryName) {
              categoryArray[index].jobNum += 1;
            }
          });
        });
      }
      categoryArray.sort((a, b) => b.jobNum - a.jobNum);
      return categoryArray;
    },
  },
  methods: {
    collectJob(item) {
      emitter.emit('open-collect-modal', item);
    },
    // 搜尋方法
    // 直接搜尋
    toSearchJob() {
      const keyword = this.filterData.keyword || '不限';
      const { city } = this.filterData;
      const { jobCategory } = this.filterData;
      this.$router.push(`/search/?keyword=${keyword}&city=${city}&jobCategory=${jobCategory}`);
    },
    // 依據職位類別搜尋
    searchByJobCategory(jobCategory) {
      const keyword = '不限';
      const city = '不限';
      this.$router.push(`/search/?keyword=${keyword}&city=${city}&jobCategory=${jobCategory}`);
    },
    // 更改職位排序
    changeJobSort() {
      if (this.sortWay === 'time') {
        this.jobsList.sort((a, b) => b.options.job.create - a.options.job.create);
      } else if (this.sortWay === 'money') {
        this.jobsList.sort((a, b) => b.price - a.price);
      }
    },
    // 找出職位
    classifyJob() {
      this.products.forEach((item) => {
        if (item.description === '職位') {
          const Obj = item;
          this.sortCompany.forEach((temCompany) => {
            if (Obj.options.company.companyName === temCompany.title) {
              Obj.options.company.companyLink = temCompany.id;
            }
          });
          this.jobsList.push(Obj);
        }
      });
      this.changeJobSort();
      this.dataOk = true;
    },
    // 抓全部資料
    getOgData() {
      this.cleanList();
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.classifyJob();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 清除陣列
    cleanList() {
      this.jobsList = [];
    },
  },
  created() {
    this.formData = webData;
    this.getOgData();
    emitter.emit('spinner-open-bg', 1500);
  },
  mounted() {
    const vm = this;
    vm.fullWidth = window.innerWidth;
    vm.fullHeight = window.innerHeight;
    window.onresize = () => {
      vm.fullWidth = window.innerWidth;
      vm.fullHeight = window.innerHeight;
    };
  },
};
</script>

<style lang="scss"></style>
