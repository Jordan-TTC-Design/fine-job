<template>
  <div class="mb-5">
    <div class="container">
      <h3 class="pageTitle ps-3">推薦職位</h3>
      <swiper
        v-if="dataOk"
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
      >
        <swiper-slide v-for="item in goodJobList" :key="item.id">
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
  <div ref="jobsListContainer" class="container">
    <h3 class="pageTitle ps-3">全部職位</h3>
    <div class="row">
      <div class="col-lg-6 col-12">
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
              @click="selectJob(item.id)"
              :data-id="item.id"
              class="jobList__item d-flex box--shadow flex-column align-items-start pe-auto"
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
                      class="jobList__item__title text-dark mb-3 me-7 pe-auto"
                      :to="`/products-list/product/${item.id}`"
                      >{{ item.title }}</router-link
                    >
                    <router-link
                      class="page__txt page__link subTxt  mb-2 me-7 pe-auto"
                      :to="`/products-list/company/${item.options.company.companyLink}`"
                      >{{ item.options.company.companyName }}</router-link
                    >
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="text-primary" v-if="!item.options.job.salaryInterView">
                      {{ item.price }} / 月薪
                    </p>
                    <p class="text-primary" v-if="item.options.job.salaryInterView">薪資面議</p>
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
      <div class="col-lg-6 col-12 d-lg-block d-none">
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
              <p class="text-primary fw-bold" v-if="!jobItem.options.job.salaryInterView">
                {{ jobItem.price }} / 月薪
              </p>
              <p class="text-primary fw-bold" v-if="jobItem.options.job.salaryInterView">
                薪資面議
              </p>
              <div class="d-flex align-items-center ">
                <p class="subTxt text-secondary me-2">
                  {{ $filters.date(jobItem.options.job.create) }}
                </p>
                <router-link
                  class="btn--applyJob btn btn-primary btn-bg d-flex align-items-center me-2"
                  type="button"
                  :to="`/apply-job/${jobItem.id}`"
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
            <div class="page__txt" v-html="jobItem.content"></div>
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
            <div class="page__txt" v-html="jobItem.options.job.otherRequirement"></div>
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
            <div class="page__txt" v-html="jobItem.options.job.otherApplyInfo"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <PagenationModal :jobs-list="jobsList" @change-page="changePage"></PagenationModal>
  <div class="sideBtnBox">
    <div
      class="sideFilter searchFilterBox  box--shadow mb-md-5 mb-0 p-5"
      v-if="filterBoxState"
      :class="{ active: filterBoxState }"
    >
      <div class="filterContent">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="subTitle text-dark">搜尋條件設定</h3>
          <div class="d-flex">
            <button type="button" class="btn btn-gray-light btn-lg btn--web" @click="cleanFilter">
              清除全部
            </button>
            <button type="button" class="btn d-md-none d-block" @click="openSideFilterBox">
              <i class="text-dark bi bi-x-lg"></i>
            </button>
          </div>
        </div>
        <div ref="searchFilterForm" class="searchFilterForm" v-if="mountState">
          <div class="row">
            <div class="col-md-6 col-12 mb-3">
              <div class="inputGroup--item">
                <label for="searchFilterForm-keyword" class="form-label inputItem__title"
                  >關鍵字</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="searchFilterForm-keyword"
                  placeholder="職位關鍵字"
                  aria-describedby="關鍵字"
                  v-model="filterData.keyword"
                />
              </div>
            </div>
            <div class="col-6 mb-md-0 mb-3">
              <div class="inputGroup--item">
                <label for="searchFilterForm-city" class="form-label inputItem__title">地區</label>
                <select
                  class="form-select"
                  aria-label="地區"
                  id="searchFilterForm-city"
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
            </div>
            <div class="col-6 mb-3">
              <div class="inputGroup--item">
                <label for="searchFilterForm-industry" class="form-label inputItem__title"
                  >產業類別</label
                >
                <select
                  class="form-select"
                  aria-label="產業類別"
                  id="searchFilterForm-industry"
                  v-model="filterData.industryCategory"
                >
                  <option disabled>請選擇產業類別</option>
                  <option selected value="不限">不限</option>
                  <option
                    v-for="(item, index) in formData.industryCategory"
                    :value="item"
                    :key="'產業類別' + index"
                    >{{ item }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col-6 mb-md-0 mb-3">
              <div class="inputGroup--item">
                <label for="searchFilterForm-jobCategory" class="form-label inputItem__title"
                  >職位類別</label
                >
                <select
                  class="form-select"
                  aria-label="職位類別"
                  id="searchFilterForm-jobCategory"
                  v-model="filterData.jobCategory"
                >
                  <option disabled>請選擇職位類別</option>
                  <option selected value="不限">不限</option>
                  <option
                    v-for="(item, index) in formData.jobCategory"
                    :value="item"
                    :key="'職位類別' + index"
                    >{{ item }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col-6  mb-3">
              <div class="inputGroup--item">
                <label for="searchFilterForm-workExp" class="form-label inputItem__title"
                  >工作經驗</label
                >
                <select
                  class="form-select"
                  aria-label="工作經驗"
                  id="searchFilterForm-workExp"
                  v-model="filterData.workExp"
                >
                  <option disabled>請選擇工作經驗</option>
                  <option
                    v-for="(item, index) in formData.workExp"
                    :value="item"
                    :selected="item === '不限'"
                    :key="'工作經驗' + index"
                    >{{ item }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col-6 mb-md-0 mb-3">
              <div class="inputGroup--item">
                <label for="searchFilterForm-education" class="form-label inputItem__title"
                  >學歷要求</label
                >
                <select
                  class="form-select"
                  aria-label="學歷要求"
                  id="searchFilterForm-education"
                  v-model="filterData.education"
                >
                  <option disabled>請選擇學歷要求</option>
                  <option
                    v-for="(item, index) in formData.education"
                    :value="item"
                    :selected="item === '不限'"
                    :key="'學歷要求' + index"
                    >{{ item }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col-6  mb-3">
              <div class="inputGroup--item">
                <label for="searchFilterForm-workType" class="form-label inputItem__title"
                  >工作性質</label
                >
                <select
                  class="form-select"
                  aria-label="工作性質"
                  id="searchFilterForm-workType"
                  v-model="filterData.workType"
                >
                  <option disabled>請選擇工作性質</option>
                  <option selected value="不限">不限</option>
                  <option
                    v-for="(item, index) in formData.workType"
                    :value="item"
                    :key="'工作性質' + index"
                    >{{ item }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col-6 mb-md-0 mb-3">
              <div class="inputGroup--item">
                <label for="searchFilterForm-workTime" class="form-label inputItem__title"
                  >工作時段</label
                >
                <select
                  class="form-select"
                  aria-label="工作時段"
                  id="searchFilterForm-workTime"
                  v-model="filterData.workTime"
                >
                  <option disabled>請選擇工作時段</option>
                  <option selected value="不限">不限</option>
                  <option
                    v-for="(item, index) in formData.workTime"
                    :value="item"
                    :key="'工作時段' + index"
                    >{{ item }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col-md-9 col-12 mb-md-0 mb-3">
              <div class="inputGroup--item">
                <label for="searchFilterForm-salary" class="form-label inputItem__title"
                  >薪資待遇</label
                >
                <div class="d-flex align-items-center">
                  <input
                    type="number"
                    class="form-control"
                    id="searchFilterForm-salary"
                    placeholder="最低"
                    aria-describedby="薪資待遇範圍起始"
                    v-model.number="filterData.salaryLow"
                  />
                  <p class="px-2">至</p>
                  <input
                    type="number"
                    class="form-control"
                    id="searchFilterForm-salary-end"
                    placeholder="最高"
                    aria-describedby="薪資待遇範圍結束"
                    v-model.number="filterData.salaryHight"
                  />
                  <div
                    class="form-check py-2 px-3 d-flex justify-content-center align-items-center"
                  >
                    <input
                      class="form-check-input ms-0 me-2"
                      type="checkbox"
                      value="面議"
                      id="searchFilterForm-salaryInterview"
                      v-model="filterData.salaryInterView"
                    />
                    <label
                      class="form-check-label text-nowrap"
                      for="searchFilterForm-salaryInterview"
                    >
                      面議
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-12">
              <div class="d-flex justify-content-end align-items-end h-100">
                <button type="button" class="btn btn-primary btn--applyJob" @click="searchJob">
                  查詢
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-cover--dark" v-if="filterBoxState" @click="openSideFilterBox"></div>
    <button type="button" class="sideIconBtn btn btn-light mb-2" @click="openSideFilterBox">
      <i class="jobIcon bi bi-funnel"></i>
    </button>
    <UpTopBtn></UpTopBtn>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';
import PagenationModal from '@/components/Pagenation.vue';
import GoodJobCard from '@/components/front/GoodJobCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import webData from '@/components/helpers/webData';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    PagenationModal,
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
      filterBoxState: false,
      mountState: false,
    };
  },
  watch: {
    fullWidth(newValue) {
      // console.log(newValue);
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
    openSideFilterBox() {
      if (this.filterBoxState) {
        this.filterBoxState = false;
      } else if (!this.filterBoxState) {
        this.filterBoxState = true;
      }
    },
    searchByJobCategory(jobCategory) {
      const keyword = '不限';
      const city = '不限';
      this.$router.push(`/search/?keyword=${keyword}&city=${city}&jobCategory=${jobCategory}`);
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
      this.selectJobFrist(this.nowPageList[0].id);
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
      this.selectJobFrist(this.jobsList[0].id);
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
    searchJob() {
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
          this.filterCity(this.jobsList);
          this.filterKeyword(this.jobsList);
          this.filterWorkTime(this.jobsList);
          this.filterWorkType(this.jobsList);
          this.filterEducation(this.jobsList);
          this.filterJobCategory(this.jobsList);
          this.filterIndustryCategory(this.jobsList);
          this.filterSalary(this.jobsList);
          this.filterSalaryInterView(this.jobsList);
          console.log(this.jobsList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterKeyword(temArray) {
      // console.log(temArray);
      if (this.filterData.keyword !== '') {
        // console.log(this.filterData.keyword);
        this.temData = temArray.filter((item) => {
          const text = item.title + item.options.company.companyName;
          const searchText = this.filterData.keyword.toLowerCase();
          const textResult = text.toLowerCase().includes(searchText);
          return textResult;
        });
      } else {
        this.temData = temArray;
      }
      this.jobsList = this.temData;
    },
    filterCity(temArray) {
      if (this.filterData.city !== '不限') {
        // console.log(this.filterData.city);
        this.temData = temArray.filter(
          (item) => item.options.company.companyAddressCity === this.filterData.city,
        );
      } else {
        this.temData = temArray;
      }
      this.jobsList = this.temData;
    },
    filterWorkTime(temArray) {
      if (this.filterData.workTime !== '不限') {
        console.log(this.filterData.workTime);
        this.temData = temArray.filter(
          (item) => item.options.job.workTime === this.filterData.workTime,
        );
      } else {
        this.temData = temArray;
      }
      this.jobsList = this.temData;
    },
    filterWorkExp(temArray) {
      if (this.filterData.workExp !== '不限') {
        console.log(this.filterData.workExp);
        this.temData = temArray.filter(
          (item) => item.options.job.workExp === this.filterData.workExp,
        );
      } else {
        this.temData = temArray;
      }
      this.jobsList = this.temData;
    },
    filterWorkType(temArray) {
      if (this.filterData.workType !== '不限') {
        console.log(this.filterData.workType);
        this.temData = temArray.filter(
          (item) => item.options.job.workType === this.filterData.workType,
        );
      } else {
        this.temData = temArray;
      }
      this.jobsList = this.temData;
    },
    filterEducation(temArray) {
      if (this.filterData.education !== '不限') {
        console.log(this.filterData.education);
        this.temData = temArray.filter(
          (item) => item.options.job.education === this.filterData.education,
        );
      } else {
        this.temData = temArray;
      }
      this.jobsList = this.temData;
    },
    filterJobCategory(temArray) {
      if (this.filterData.jobCategory !== '不限') {
        // console.log(this.filterData.jobCategory);
        this.temData = temArray.filter((item) => item.category === this.filterData.jobCategory);
      } else {
        this.temData = temArray;
      }
      this.jobsList = this.temData;
    },
    filterIndustryCategory(temArray) {
      if (this.filterData.industryCategory !== '不限') {
        console.log(this.filterData.industryCategory);
        this.temData = temArray.filter(
          (item) => item.options.job.industryCategory === this.filterData.industryCategory,
        );
      } else {
        this.temData = temArray;
      }
      this.jobsList = this.temData;
    },
    filterSalary(temArray) {
      const numLow = this.filterData.salaryLow;
      const numHight = this.filterData.salaryHight;
      if (numLow !== null && numHight !== null) {
        this.temData = temArray.filter((item) => item.price > numLow && item.price < numHight);
      } else if (numLow !== null || numHight !== null) {
        if (numLow !== null) {
          this.temData = temArray.filter((item) => item.price > numLow);
        } else if (numHight !== null) {
          this.temData = temArray.filter((item) => item.price < numHight);
        }
      } else {
        this.temData = temArray;
      }
      this.jobsList = this.temData;
    },
    filterSalaryInterView(temArray) {
      if (this.filterData.salaryInterView) {
        console.log('只找面議');
        this.temData = temArray.filter((item) => item.options.job.salaryInterView === true);
      } else {
        this.temData = temArray;
      }
      this.jobsList = this.temData;
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
    selectJob(id) {
      console.log(this.fullWidth);
      if (this.fullWidth > 991) {
        this.jobsList.forEach((item) => {
          if (item.id === id) {
            this.jobItem = item;
          }
        });
        this.$refs.jobSelectBox.scrollTop = 0;
      } else {
        this.$router.push(`/products-list/product/${id}`);
      }
    },
    selectJobFrist(id) {
      this.jobsList.forEach((item) => {
        if (item.id === id) {
          this.jobItem = item;
        }
      });
      this.$refs.jobSelectBox.scrollTop = 0;
    },
  },
  created() {
    this.getProductsData();
    this.formData = webData;
  },
  mounted() {
    this.mountState = true;
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
