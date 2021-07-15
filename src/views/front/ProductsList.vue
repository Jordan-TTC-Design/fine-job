<template>
  <div class="mb-5">
    <div class="container">
      <h3 class="pageTitle ps-3">推薦職位</h3>
      <swiper
        v-if="dataOk"
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
  <div ref="jobsListContainer" class="container">
    <h3 class="pageTitle ps-3">全部職位</h3>
    <div class="row">
      <div class="col-md-6">
        <div class="jobListBox">
          <div class="d-flex justify-content-between align-items-center ps-3 mb-3">
            <p class="text-secondary fw-normal  text-nowrap">總共 {{ jobsList.length }} 個職位</p>
            <select
              class="form-select form-select-lg w-auto border-0 text-gray-dark"
              @change="changeJobSort($event)"
              v-model="sortWay"
            >
              <option selected value="time">最新至最舊</option>
              <option value="money">薪水高至低</option>
            </select>
          </div>
          <ul class="jobList">
            <li
              v-for="item in nowPageList"
              :key="item.id"
              type="button"
              @click="selectJob(item.id)"
              :data-id="item.id"
              class="jobList__item d-flex box--shadow flex-column align-items-start"
            >
              <button class="collectBtn btn btn-outline-gray-line position-absolute" type="button">
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
                <div class="jobList__item__imgBox">
                  <img class="jobImage" :src="item.imageUrl" alt="" />
                  <div class="logoImageBox">
                    <img class="logoImage" :src="item.options.company.companyLogoUrl" alt="" />
                  </div>
                </div>
                <div
                  class="jobList__item__txtBox
                  flex-grow-1 d-flex flex-column
                  justify-content-between"
                >
                  <div class="mb-3 d-flex flex-column align-items-start">
                    <router-link
                      class="jobList__item__title text-dark mb-3 me-7"
                      type="button"
                      :to="`/products-list/product/${item.id}`"
                      >{{ item.title }}</router-link
                    >
                    <router-link
                      class="page__txt page__link subTxt  mb-2 me-7"
                      type="button"
                      :to="`/products-list/company/${item.options.company.companyLink}`"
                      >{{ item.options.company.companyName }}</router-link
                    >
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="text-primary">{{ item.price }} / 月薪</p>
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
      <div class="col-md-6">
        <div ref="jobSelectBox" class="jobSelectBox box--shadow ">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="mb-3">
              <button
                type="button"
                class="jobTag btn"
                @click="searchByJobCategory(jobItem.category)"
              >
                {{ jobItem.category }}
              </button>
            </div>
            <div class="d-flex">
              <router-link
                class="btn btn-outline-gray-line btn-bg text-dark d-flex align-items-center me-2"
                type="button"
                :to="`/products-list/product/${jobItem.id}`"
                >開新頁面</router-link
              >
              <button class="collectBtn btn btn-outline-gray-line" type="button">
                <i class="jobIcon bi bi-bookmark-fill"></i>
              </button>
            </div>
          </div>
          <div class="pb-5 border-bottom border-gray-line">
            <div class="d-flex mb-3">
              <div class="jobContent__imgBox">
                <img class="jobImage" :src="jobItem.imageUrl" alt="" />
                <div class="logoImageBox">
                  <img class="logoImage" :src="jobItem.options.company.companyLogoUrl" alt="" />
                </div>
              </div>
              <div class="JobContent__txtBox">
                <div>
                  <router-link
                    class="jobSelectBox__title mb-3 d-block"
                    type="button"
                    :to="`/products-list/product/${jobItem.id}`"
                    >{{ jobItem.title }}</router-link
                  >
                  <router-link
                    class="page__txt page__link subTxt  mb-4 d-block"
                    type="button"
                    :to="`/products-list/company/${jobItem.options.company.companyLink}`"
                    >{{ jobItem.options.company.companyName }}</router-link
                  >
                </div>
                <div class="d-flex">
                  <p class="page__txt me-5 subTxt">
                    <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                    >{{ jobItem.options.company.companyAddressCity }}
                  </p>
                  <p class="page__txt subTxt">
                    <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                      jobItem.num
                    }}
                  </p>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p class="text-primary fw-bold">{{ jobItem.price }}/月薪</p>
              <div class="d-flex align-items-center ">
                <p class="subTxt text-secondary me-2">
                  {{ $filters.date(jobItem.options.job.create) }}
                </p>
                <router-link
                  class="btn--applyJob btn btn-primary btn-bg d-flex align-items-center me-2"
                  type="button"
                  :to="`/apply-job`"
                  >申請</router-link
                >
              </div>
            </div>
          </div>
          <div class="py-5 border-bottom border-gray-line">
            <h3 class="page__title--sub"><span class="title__icon"></span>職位內容</h3>
            <p class="page__txt mb-3">工作性質：{{ jobItem.options.job.workType }}</p>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-clock"></i></span>工作時間：{{
                jobItem.options.job.workTime
              }}
            </p>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>產業類別：{{
                jobItem.options.company.industryCategory
              }}
            </p>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-card-list"></i></span>工作類別：{{
                jobItem.category
              }}
            </p>
            <p class="page__txt mb-3">工作內容：</p>
            <p class="page__txt">{{ jobItem.content }}</p>
          </div>
          <div class="py-5 border-bottom border-gray-line">
            <h3 class="page__title--sub"><span class="title__icon"> </span>應徵條件</h3>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-book"></i></span>學歷要求：{{
                jobItem.options.job.education
              }}
            </p>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-briefcase"></i></span>工作經驗：{{
                jobItem.options.job.workExp
              }}
            </p>
            <p class="page__txt mb-3">其他條件：</p>
            <p class="page__txt">{{ jobItem.options.job.otherRequirement }}</p>
          </div>
          <div class="pt-5">
            <h3 class="page__title--sub"><span class="title__icon"> </span>申請方法</h3>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-person"></i></span>職位聯絡人：{{
                jobItem.options.company.companyContact
              }}
            </p>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-envelope"></i></span>聯絡信箱：{{
                jobItem.options.company.companyEmail
              }}
            </p>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-phone"></i></span>聯絡電話：{{
                jobItem.options.company.companyTel
              }}
            </p>
            <p class="page__txt mb-3">申請備註：</p>
            <p class="page__txt">
              • 有意者請透過系統寄送應徵履歷，合者約談，不適任者恕不另行通知，謝謝。 • 請附上cover
              letter 、 CV/Resume 以及作品集。 • 需自備電腦。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PagenationModal :jobs-list="jobsList" @change-page="changePage"></PagenationModal>
</template>

<script>
import emitter from '@/components/helpers/emitter';
import PagenationModal from '@/components/Pagenation.vue';
import GoodJobCard from '@/components/front/GoodJobCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    PagenationModal,
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
    searchByJobCategory(jobCategory) {
      const keyword = '不限';
      const city = '不限';
      // console.log(jobCategory);
      // const { jobCategory } = this.filterData;
      this.$router.push(`/search/${keyword}&${city}&${jobCategory}`);
    },
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
    selectJob(id) {
      console.log(id);
      this.jobsList.forEach((item) => {
        if (item.id === id) {
          this.jobItem = { ...item };
        }
      });
      // console.log(this.jobItem);
      this.$refs.jobSelectBox.scrollTop = 0;
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
      this.selectJob(this.jobsList[0].id);
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
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
