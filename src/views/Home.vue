<template>
  <div class="topSearchBanner mb-md-7 mb-6">
    <img class="img-cover" src="../assets/images/home-top-img.png" alt="" />
    <div class="container position-relative">
      <p class="flyTag flyTag--a">您好，我想找工作！</p>
      <p class="flyTag flyTag--b">歡迎你來面試！</p>
      <h2 class="banner__title text-white mb-md-4 mb-2">立即搜尋職位</h2>
      <h2 class="banner__title text-white mb-md-9 mb-6">Got Youself A Fine Job !</h2>
      <div class="bg-white rounded box-shadow p-md-6 p-4">
        <form
          class="banner__searchBar d-flex flex-md-row flex-column
        align-items-md-center align-items-stretch"
        >
          <img
            class="banner__logo me-3"
            src="../assets/images/header/fineJobLogo-square.svg"
            alt=""
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
              <label for="searchFilterTop-city" class="form-label inputItem__title">地區</label>
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
                  :key="'地區' + index"
                  >{{ item }}</option
                >
              </select>
            </div>
            <button class="btn btn-primary" type="button" @click="toSearchJob">搜尋職位</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- 熱門職位 -->
  <div class="mb-7">
    <div class="container">
      <div class="d-flex align-items-center mb-4">
        <h3 class="sectionTitle">熱門職位</h3>
        <p class="sectionTag">推薦</p>
      </div>
      <div class="row flex-wrap">
        <div class="col-lg-6 col-12 mb-lg-0 mb-4">
          <div
            class="hotJobCard card--lg "
            v-if="this.dataOk"
            :style="{ 'background-image': `url(${goodJobList[0]['imageUrl']} )` }"
          >
            <button class="collectBtn btn btn-outline-light position-absolute" type="button">
              <i class="jobIcon bi bi-bookmark-fill"></i>
            </button>
            <div class="hotJobCard__jobInfoBox">
              <router-link
                class="card__title mb-3 text-white d-block pe-auto"
                :to="`/products-list/product/${goodJobList[0].id}`"
                >{{ goodJobList[0].title }}</router-link
              >
              <router-link
                class="text-white mb-3 d-block pe-auto"
                :to="`/products-list/company/${goodJobList[0].options.company.companyLink}`"
                >{{ goodJobList[0].options.company.companyName }}</router-link
              >
              <p class="jobTag" v-if="!goodJobList[0].options.job.salaryInterView">
                {{ goodJobList[0].price }} / 月薪
              </p>
              <p class="jobTag" v-if="goodJobList[0].options.job.salaryInterView">薪資面議</p>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-12">
          <div class="row">
            <template v-for="(item, index) in goodJobList" :key="item.id">
              <div
                class="col-md-6 col-12 mb-4"
                :class="{ 'mb-lg-0': index > 2 }"
                v-if="index >= 1 && index <= 4"
              >
                <div
                  class="hotJobCard card--sm"
                  v-if="goodJobList[index]"
                  :style="{ 'background-image': `url(${goodJobList[index]['imageUrl']} )` }"
                >
                  <button class="collectBtn btn btn-outline-light position-absolute" type="button">
                    <i class="jobIcon bi bi-bookmark-fill"></i>
                  </button>
                  <div class="hotJobCard__jobInfoBox">
                    <router-link
                      class="card__title mb-3 text-white d-block pe-auto"
                      :to="`/products-list/product/${goodJobList[index].id}`"
                      >{{ goodJobList[index].title }}</router-link
                    >
                    <router-link
                      class="text-white mb-3 d-block pe-auto"
                      :to="
                        `/products-list/company/${goodJobList[index].options.company.companyLink}`
                      "
                      >{{ goodJobList[index].options.company.companyName }}</router-link
                    >
                    <p class="jobTag" v-if="!goodJobList[index].options.job.salaryInterView">
                      {{ goodJobList[index].price }} / 月薪
                    </p>
                    <p class="jobTag" v-if="goodJobList[index].options.job.salaryInterView">
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
  </div>
  <!-- 最新職位 -->
  <div class="bg-white py-7">
    <div class="container ">
      <div class="d-flex align-items-center mb-4">
        <h3 class="sectionTitle">最新職位</h3>
        <p class="sectionTag">推薦</p>
      </div>
      <swiper
        :slides-per-view="swiperNum"
        :space-between="20"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        v-if="dataOk"
      >
        <swiper-slide v-for="item in newJobList" :key="item.id">
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
  <!-- 本週推薦企業 -->
  <div class="goodCompanyRecommend py-7" v-if="dataOk">
    <div class="section__bg bg-primary-light"></div>
    <div class="container">
      <div class="d-flex align-items-center mb-4">
        <h3 class="sectionTitle">本週推薦企業</h3>
        <p class="sectionTag">推薦</p>
      </div>
      <div class="row position-relative">
        <div class="col-md-5 col-12  goodCompany__Box--right">
          <div class="imageBox p-md-6 p-4 pb-4 bg-white">
            <swiper
              :slides-per-view="1"
              :space-between="20"
              :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
              }"
              :pagination="{
                clickable: true,
              }"
              v-if="dataOk"
            >
              <swiper-slide v-for="companyImage in recommedCompany.imagesUrl" :key="companyImage">
                <img class="w-100" :src="companyImage" alt="" />
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="col-lg-8 col-md-10 col-12">
          <div class="goodCompany__Box--left p-md-6 p-4">
            <div class="companyContentBox mb-3 pe-md-8 ">
              <div class="d-flex mb-4">
                <div class="logoImageBox me-4 ">
                  <img class="logoImage" :src="recommedCompany.imageUrl" alt="" />
                </div>
                <div class="txtBox d-flex flex-column justify-content-between ">
                  <router-link
                    class="page__title mb-3 pe-auto"
                    :to="`/products-list/company/${recommedCompany.id}`"
                    >{{ recommedCompany.title }}</router-link
                  >
                  <p class="page__txt me-2">
                    <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                    >{{ recommedCompany.options.companyAddressCity }}，{{
                      recommedCompany.options.companyAddressDetail
                    }}
                  </p>
                  <p class="page__txt">
                    <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                    {{ recommedCompany.category }}
                  </p>
                </div>
              </div>
              <div class="companyContent mb-3" v-html="recommedCompany.content"></div>
            </div>
            <h5 class="page__title mb-3">現有職位</h5>
            <div class="goodCompanyJobList w-100">
              <template
                v-for="(companyJob, index) in recommedCompany.jobsList"
                :key="companyJob.id"
              >
                <router-link
                  class="list__item"
                  v-if="index < 4"
                  :to="`/products-list/product/${companyJob.id}`"
                >
                  <p class="mb-3">{{ companyJob.title }}</p>
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
            <router-link
              class="btn btn-outline-gray-line text-dark align-self-md-end align-self-center"
              :to="`/products-list/company/${recommedCompany.id}`"
              >查看完整企業資料</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="hotCategory bg-white py-7">
    <div class="container ">
      <div class="d-flex align-items-center mb-4">
        <h3 class="sectionTitle">熱門職位類別</h3>
      </div>
      <ul class="row hotCategoryList">
        <template v-for="(categoryItem, index) in jobCategory" :key="categoryItem.categoryName">
          <li
            class="list__item"
            v-if="index < 7"
            :class="{
              'col-lg-6 col-12': index === 0,
              'col-lg-3 col-6': index > 0,
              'mb-4': index < 3,
              'mb-lg-0 mb-4': index > 3,
            }"
          >
            <div class="hotCategoryBox p-md-6 p-3">
              <p class="mb-3">
                {{ categoryItem.categoryName }}
              </p>
              <p class="subTxt mb-md-6 mb-3">目前共： {{ categoryItem.jobNum }} 職位</p>
              <p class="seeMoreBtn" @click="searchByJobCategory(categoryItem.categoryName)">
                查看更多職位 <i class=" jobIcon ms-2 bi bi-arrow-right-circle"></i>
              </p>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
  <div class="CooperationCompanySection pt-7  pb-2">
    <div class="container">
      <h3 class="pageTitle text-center">優質合作企業</h3>
      <ul class="row">
        <template v-for="(companyItem, index) in companiesList" :key="companyItem.id">
          <li
            class="col-lg-2 col-md-4 col-6"
            :class="{ 'd-lg-block d-none': index > 9, 'd-lg-block d-md-none': index === 9 }"
          >
            <div class="bg-white py-md-4 px-md-6 py-2 px-4 rounded mb-md-5 mb-3">
              <router-link :to="`/products-list/company/${companyItem.id}`"
                ><img class="w-100" :src="companyItem.imageUrl" alt=""
              /></router-link>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn></UpTopBtn>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';
import GoodJobCard from '@/components/front/GoodJobCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import webData from '@/components/helpers/webData';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    GoodJobCard,
    Swiper,
    SwiperSlide,
    UpTopBtn,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      swiperNum: 1,
      products: [],
      jobsList: [],
      companiesList: [],
      jobItem: {
        options: {
          company: {
            companyImagesUrl: [],
          },
          job: {},
        },
      },
      newJobList: [],
      goodJobList: [],
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
      jobCategory: [],
      recommedCompany: {
        jobsList: [],
        options: { companyAddressCity: '' },
      },
    };
  },
  watch: {
    fullWidth(newValue) {
      console.log(newValue);
      if (newValue > 768) {
        this.swiperNum = 3;
      } else if (newValue > 576) {
        this.swiperNum = 2;
      } else {
        this.swiperNum = 1;
      }
    },
  },
  methods: {
    searchByJobCategory(jobCategory) {
      this.cleanFilter();
      const keyword = '不限';
      const city = '不限';
      this.filterData.jobCategory = jobCategory;
      this.$router.push(`/search/?keyword=${keyword}&city=${city}&jobCategory=${jobCategory}`);
    },
    cleanFilter() {
      this.filterData = {
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
      };
    },
    toSearchJob() {
      const keyword = this.filterData.keyword || '不限';
      const { city } = this.filterData;
      const { jobCategory } = this.filterData;
      this.$router.push(`/search/?keyword=${keyword}&city=${city}&jobCategory=${jobCategory}`);
    },
    changeJobSort() {
      console.log(this.sortWay);
      if (this.sortWay === 'time') {
        this.jobsList.sort((a, b) => b.options.job.create - a.options.job.create);
      } else if (this.sortWay === 'money') {
        this.jobsList.sort((a, b) => b.price - a.price);
      }
      this.sortNewJob();
    },
    sortNewJob() {
      // this.jobsList.forEach((item, index) => {
      //   if (index < 6) {
      //     this.newJobList.push(this.jobsList[index]);
      //   }
      // });
      for (let index = 0; index < 6; index += 1) {
        this.newJobList.push(this.jobsList[index]);
        // console.log(this.newJobList);
      }
    },
    sortGoodJob() {
      const temGoodJob = this.jobsList.filter((item) => item.options.job.promote === 1);
      // console.log(temGoodJob);
      const arr = new Set([]);
      for (let index = 0; arr.size < 6; index += 1) {
        const num = Math.floor(Math.random() * temGoodJob.length);
        arr.add(num);
        // console.log(arr.size);
      }
      arr.forEach((i) => {
        this.goodJobList.push(temGoodJob[i]);
      });
      // console.log(this.goodJobList);
      this.dataOk = true;
    },
    classifyJob() {
      this.products.forEach((item) => {
        if (item.description === '職位') {
          const Obj = item;
          this.companiesList.forEach((temCompany) => {
            if (Obj.options.company.companyName === temCompany.title) {
              // console.log(temCompany.id);
              Obj.options.company.companyLink = temCompany.id;
            }
          });
          this.jobsList.push(Obj);
        }
      });
      console.log(this.jobsList);
      this.changeJobSort();
      this.sortGoodJob();
      this.getJobCategory();
      this.getRecommedCompany();
    },
    classifyCompany() {
      this.products.forEach((item) => {
        if (item.description === '企業') {
          this.companiesList.push(item);
        }
      });
      console.log(this.companiesList);
      this.classifyJob();
    },
    cleanList() {
      this.jobsList = [];
      this.companiesList = [];
    },
    getProductsData() {
      this.cleanList();
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          //   console.log(res);
          this.products = res.data.products;
          emitter.emit('spinner-close');
          this.classifyCompany();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getJobCategory() {
      const categoryArray = [];
      this.formData.jobCategory.forEach((item) => {
        const obj = {
          categoryName: item,
          jobNum: 0,
        };
        categoryArray.push(obj);
      });
      console.log(categoryArray);
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
      this.jobCategory = categoryArray;
      console.log(this.jobCategory);
    },
    getRecommedCompany(id = '-MdlkfRouZAGrLI9AztX') {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.isExist = true;
            // console.log(res);
            this.recommedCompany = { jobsList: [], ...res.data.product };
            console.log(this.recommedCompany);
            this.jobsList.forEach((item) => {
              if (item.description === '職位') {
                if (item.options.company.companyName === this.recommedCompany.title) {
                  console.log(item.options.company.companyName);
                  this.recommedCompany.jobsList.push(item);
                }
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      emitter.emit('spinner-close');
    },
  },
  created() {
    this.formData = webData;
    this.getProductsData();
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
