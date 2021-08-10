<template>
  <div class="page--py">
    <div ref="recommedJobs" class="section">
      <div class="container">
        <h3 class="section__title ps-3">推薦職位</h3>
        <swiper
          v-if="hotJobs.length > 0"
          :slides-per-view="swiperNum"
          :space-between="20"
          :autoplay="swiperDetail.autoPlay"
          :pagination="swiperDetail.pagination"
          :navigation="swiperDetail.navigation"
        >
          <swiper-slide v-for="item in hotJobs" :key="item.id">
            <GoodJobCard :good-job="item" />
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
    <div ref="jobsListContainer" class="jobsListContainer container">
      <h3 class="section__title ps-3">全部職位</h3>
      <p class="ps-3 mb-6 text-primary" v-if="filterTxt !== ''">
        <span class="text-gray-dark">搜尋條件：</span>{{ filterTxt }}
      </p>
      <div class="row">
        <div class="col-lg-6 col-12" v-if="jobsList.length > 0">
          <div class="jobListBox">
            <div class="d-flex justify-content-between align-items-center ps-3 mb-3">
              <p class="text-secondary fw-normal  text-nowrap">
                目前共 {{ jobsList.length }} 個職位
              </p>
              <select
                class="form-select form-select-lg w-auto border-0 text-gray-dark"
                @change="changeJobSort($event)"
                v-model="sortWay"
              >
                <option selected value="time">最新至最舊</option>
                <option value="money">薪水高至低</option>
              </select>
            </div>
            <ul ref="jobList" class="allJobList">
              <template v-for="item in nowPageJobs" :key="item.id">
                <li v-if="nowPageJobs.length > 0">
                  <JobListCard
                    :ref="`jobList__item--${item.id}`"
                    :job-list-item="item"
                    @select-job="selectJob"
                    @search-by-job-category="searchByJobCategory"
                  />
                </li>
              </template>
            </ul>
          </div>
        </div>
        <div class="col-lg-6 col-12 d-lg-block d-none" v-if="jobsList.length > 0">
          <JobListSideJobBox
            ref="jobSelectBox"
            :select-job-item="jobItem"
            @search-by-job-category="searchByJobCategory"
          />
        </div>
        <div class="col-12 d-flex justify-content-center" v-if="jobsList.length === 0">
          <img class="img--searchNoJob" src="https://i.imgur.com/a1OATil.png" alt="" />
        </div>
      </div>
    </div>
    <PagenationModal
      :jobs-list="jobsList"
      @change-page="changePage"
      @search-by-job-category="searchByJobCategory"
    />
  </div>
  <div class="sideBtnBox">
    <FilterBtn :tem-filter-data="filterData" @send-filter-data="filter" />
    <UpTopBtn />
  </div>
  <JobCollect ref="JobCollectModal" />
</template>

<script>
import emitter from '@/methods/emitter';
import searchFilter from '@/methods/searchFilter';
import webData from '@/methods/webData';
import PagenationModal from '@/components/helpers/Pagenation.vue';
import GoodJobCard from '@/components/front/GoodJobCard.vue';
import JobListCard from '@/components/front/JobListCard.vue';
import JobListSideJobBox from '@/components/front/JobListSideJobBox.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import FilterBtn from '@/components/helpers/FilterBtn.vue';
import JobCollect from '@/components/helpers/JobCollect.vue';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    PagenationModal,
    GoodJobCard,
    JobListCard,
    Swiper,
    SwiperSlide,
    UpTopBtn,
    FilterBtn,
    JobListSideJobBox,
    JobCollect,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      products: [],
      jobsList: [],
      hotJobs: [],
      nowPageJobs: [],
      jobItem: {
        options: {
          company: {
            companyImagesUrl: [],
          },
          job: {},
        },
      },
      searchFilterMethods: {},
      searchByJobCategoryState: false,
      pageNumber: 1,
      sortWay: 'time',
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
      // 篩選框顯示與否狀態
      filterBoxState: false,
      filterTxt: '',
      mountState: false,
      // swiper
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
    // 所有企業
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
  },
  methods: {
    // 打開篩選彈跳視窗
    openSideFilterBox() {
      if (this.filterBoxState) {
        this.filterBoxState = false;
      } else if (!this.filterBoxState) {
        this.filterBoxState = true;
      }
    },
    // 根據職位類別搜尋
    searchByJobCategory(jobCategory) {
      // 為了不要錯誤多加一個判斷，不會觸發selectJob
      this.searchByJobCategoryState = true;
      const keyword = '不限';
      const city = '不限';
      this.$router.push(`/search/?keyword=${keyword}&city=${city}&jobCategory=${jobCategory}`);
    },
    // 調整列表排序方式
    changeJobSort() {
      if (this.sortWay === 'time') {
        this.jobsList.sort((a, b) => b.options.job.create - a.options.job.create);
      } else if (this.sortWay === 'money') {
        this.jobsList.sort((a, b) => b.price - a.price);
      }
    },
    // 切換頁面
    changePage(nowPageNum) {
      this.pageNumber = nowPageNum;
      this.getNowPageJobs();
    },
    // 篩選查詢
    filter(value) {
      this.filterData = value;
      emitter.emit('spinner-open');
      this.classifyJob();
      const temArray = this.searchFilterMethods.filter(this.jobsList, this.filterData);
      this.jobsList = temArray;
      this.changePage(1);
      this.getfilterTxt();
      emitter.emit('filterBtn-close');
      emitter.emit('spinner-close');
    },
    // 取得搜尋條件文字
    getfilterTxt() {
      const keyWord = this.filterData.keyword === '' ? '' : `${this.filterData.keyword}、`;
      const city = this.filterData.city === '不限' ? '' : `${this.filterData.city}、`;
      const industryCategory = this.filterData.industryCategory === '不限' ? '' : `${this.filterData.industryCategory}、`;
      const jobCategory = this.filterData.jobCategory === '不限' ? '' : `${this.filterData.jobCategory}、`;
      const workExp = this.filterData.workExp === '不限' ? '' : `${this.filterData.workExp}、`;
      const education = this.filterData.education === '不限' ? '' : `${this.filterData.education}、`;
      const workType = this.filterData.workType === '不限' ? '' : `${this.filterData.workType}、`;
      const workTime = this.filterData.workTime === '不限' ? '' : `${this.filterData.workTime}、`;
      const salaryLow = this.filterData.salaryLow === null ? '' : `最低薪資${this.filterData.salaryLow}、`;
      const salaryHight = this.filterData.salaryHight === null ? '' : `最高薪資${this.filterData.salaryHight}、`;
      const salaryInterView = this.filterData.salaryInterView === false ? '' : '薪資面議、';
      const temTxt = keyWord
        + city
        + industryCategory
        + jobCategory
        + workExp
        + education
        + workType
        + workTime
        + salaryLow
        + salaryHight
        + salaryInterView;
      if (temTxt.length > 1) {
        this.filterTxt = temTxt.slice(0, temTxt.length - 1);
      } else {
        this.filterTxt = temTxt;
      }
    },
    // 清除篩選條件
    cleanFilter() {
      this.searchFilterMethods.getFilterData(this.filterData);
      this.searchFilterMethods.cleanFilter();
      this.filterData = this.searchFilterMethods.returnFilter();
    },
    // 點擊卡片：pc->選擇右側職位，pad->跳轉至該職位頁面
    selectJob(id) {
      if (this.fullWidth > 991) {
        if (this.searchByJobCategoryState === false) {
          this.nowPageJobs.forEach((item) => {
            if (item.id === id) {
              this.jobItem = item;
              this.$refs[`jobList__item--${item.id}`].openSelectEffect();
            } else if (item.id !== id) {
              this.$refs[`jobList__item--${item.id}`].closeSelectEffect();
            }
          });
          this.$refs.jobSelectBox.toTop();
        }
      } else {
        this.$router.push(`/products-list/product/${id}`);
      }
    },
    selectJobFrist(id) {
      if (this.fullWidth > 991) {
        this.nowPageJobs.forEach((item) => {
          if (item.id === id) {
            this.jobItem = item;
            this.$refs[`jobList__item--${item.id}`].openSelectEffect();
          } else if (item.id !== id) {
            this.$refs[`jobList__item--${item.id}`].closeSelectEffect();
          }
        });
        this.$refs.jobSelectBox.toTop();
      }
    },
    // 本頁職位
    getNowPageJobs() {
      const temPageJobs = [];
      if (this.jobsList.length !== []) {
        const pageFrist = this.pageNumber * 10 - 10;
        this.jobsList.forEach((item, index) => {
          if (pageFrist <= index && index < this.pageNumber * 10) {
            temPageJobs.push(item);
          }
        });
        document.documentElement.scrollTop = 0;
        [this.jobItem] = temPageJobs;
      }
      this.nowPageJobs = temPageJobs;
      setTimeout(() => {
        if (this.nowPageJobs.length > 0) {
          this.selectJobFrist(this.nowPageJobs[0].id);
        }
      }, 10);
    },
    // 熱門職位
    sortHotJobs() {
      this.hotJobs = [];
      if (this.jobsList.length > 0) {
        const temGoodJob = this.jobsList.filter((item) => item.options.job.promote === 1);
        const arr = new Set([]);
        for (let index = 0; arr.size < 6; index += 1) {
          const num = Math.floor(Math.random() * temGoodJob.length);
          arr.add(num);
        }
        arr.forEach((i) => {
          this.hotJobs.push(temGoodJob[i]);
        });
      }
    },
    // 篩選出所有職位
    classifyJob() {
      this.jobsList = [];
      this.changePage(1);
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
      if (!this.hotJobs.length) {
        this.sortHotJobs(); // 不用再重新撈一次
      }
      this.getNowPageJobs();
    },
    // 抓全部資料
    getOgData() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          emitter.emit('spinner-close');
          this.classifyJob();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getOgData();
    this.formData = webData;
    this.searchFilterMethods = searchFilter;
    emitter.emit('spinner-open-bg', 1200);
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
