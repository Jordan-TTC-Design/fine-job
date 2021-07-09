<template>
  <div class="topSearchBanner mb-7">
    <img class="img-cover" src="../assets/images/home-top-img.png" alt="" />
    <div class="container position-relative">
      <p class="flyTag flyTag--a">您好，我想找工作！</p>
      <p class="flyTag flyTag--b">歡迎你來面試！</p>
      <h2 class="banner__title text-white mb-4">立即搜尋職位</h2>
      <h2 class="banner__title text-white mb-9">Got Youself A Fine Job !</h2>
      <div class="bg-white rounded box-shadow p-6">
        <form class="banner__searchBar d-flex align-items-center">
          <img
            class="banner__logo me-3"
            src="../assets/images/header/fineJobLogo—square.svg"
            alt=""
          />
          <div class="d-flex justify-content-between align-items-end flex-grow-1">
            <div class="inputGroup--item flex-grow-1 me-4">
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
            <div class="inputGroup--item flex-grow-1 me-4">
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
            <button type="button" class="btn btn-primary">搜尋職位</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="mb-7">
    <div class="container">
      <h3 class="pageTitle ps-3">熱門職位</h3>
      <div class="row">
        <div class="col-6">
          <div
            class="hotJobCard h-100"
            v-if="this.dataOk"
            :style="{ 'background-image': `url(${goodJobList[0]['imageUrl']} )` }"
          >
            <button class="collectBtn btn btn-outline-gray-line position-absolute" type="button">
              <i class="jobIcon bi bi-bookmark-fill"></i>
            </button>
            <div class="hotJobCard__jobInfoBox">
              <router-link
                class="card__title mb-3 text-white d-block "
                type="button"
                :to="`/products-list/product/${goodJobList[0].id}`"
                >{{ goodJobList[0].title }}</router-link
              >
              <router-link
                class="text-white mb-3 d-block"
                type="button"
                :to="`/products-list/company/${goodJobList[0].options.company.companyLink}`"
                >{{ goodJobList[0].options.company.companyName }}</router-link
              >
              <p class="jobTag">
                {{ goodJobList[0].price }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <template v-for="(item, index) in goodJobList" :key="item.id">
              <div class="col-6" :class="{ 'mb-4': index == 1 }" v-if="index >= 1 && index <= 4">
                <div
                  class="hotJobCard card--sm"
                  v-if="goodJobList[index]"
                  :style="{ 'background-image': `url(${goodJobList[index]['imageUrl']} )` }"
                >
                  <button
                    class="collectBtn btn btn-outline-gray-line position-absolute"
                    type="button"
                  >
                    <i class="jobIcon bi bi-bookmark-fill"></i>
                  </button>
                  <div class="hotJobCard__jobInfoBox">
                    <router-link
                      class="card__title mb-3 text-white d-block "
                      type="button"
                      :to="`/products-list/product/${goodJobList[index].id}`"
                      >{{ goodJobList[index].title }}</router-link
                    >
                    <router-link
                      class="text-white mb-3 d-block"
                      type="button"
                      :to="
                        `/products-list/company/${goodJobList[index].options.company.companyLink}`
                      "
                      >{{ goodJobList[index].options.company.companyName }}</router-link
                    >
                    <p class="jobTag">
                      {{ goodJobList[index].price }}
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
  <div class="bg-white py-7 mb-7">
    <div class="container ">
      <h3 class="pageTitle ps-3">最新職位</h3>
      <swiper
        :slides-per-view="3"
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
        <swiper-slide v-for="item in goodJobList" :key="item.id">
          <GoodJobCard :good-job="item"></GoodJobCard>
        </swiper-slide>
        <div class="swiper-button-prev swiper-custom">
          <button type="btn" class="btn btn-lg rounded-circle iconBtnBox">
            <i class="bi bi-arrow-left actionIcon"></i>
          </button>
        </div>
        <div class="swiper-button-next swiper-custom">
          <button type="btn" class="btn btn-lg rounded-circle iconBtnBox">
            <i class="bi bi-arrow-right actionIcon"></i>
          </button>
        </div>
      </swiper>
    </div>
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

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    GoodJobCard,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
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
      nowPageList: [],
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
    };
  },
  methods: {
    changeJobSort() {
      console.log(this.sortWay);
      if (this.sortWay === 'time') {
        this.jobsList.sort((a, b) => b.options.job.create - a.options.job.create);
      } else if (this.sortWay === 'money') {
        this.jobsList.sort((a, b) => b.price - a.price);
      }
      console.log(this.jobsList);
    },
    sortGoodJob() {
      const temGoodJob = this.jobsList.filter((item) => item.options.job.promote === 1);
      console.log(temGoodJob);
      const arr = new Set([]);
      for (let index = 0; arr.size < 6; index + 1) {
        const num = Math.floor(Math.random() * temGoodJob.length);
        arr.add(num);
        console.log(arr.size);
      }
      arr.forEach((i) => {
        this.goodJobList.push(temGoodJob[i]);
      });
      console.log(this.goodJobList);
      this.dataOk = true;
    },
    changePage(nowPageNum) {
      this.nowPageList = [];
      console.log(nowPageNum);
      const pageFrist = nowPageNum * 10 - 10;
      this.jobsList.forEach((item, index) => {
        if (pageFrist <= index && index < nowPageNum * 10) {
          this.nowPageList.push(item);
        }
      });
      document.documentElement.scrollTop = 0;
      this.selectJob(this.nowPageList[0].id);
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
  },
  created() {
    this.getProductsData();
    this.formData = webData;
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
