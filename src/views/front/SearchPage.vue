<template>
  <div class="page--py">
    <div class="container d-md-block d-none">
      <div class="row">
        <div class="col-12">
          <div class="filterBox bg-white mb-6 rounded p-6">
            <div class="filterBox__section">
              <p class="filterBox__section__tag--title">搜尋條件</p>
              <div class="row flex-grow-1">
                <div class="col-xl-4 col-lg-3 col-6 mb-lg-0 mb-3">
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
                <div class="col-lg-3 col-6">
                  <div class="inputGroup--item">
                    <label for="searchFilterForm-city" class="form-label inputItem__title"
                      >地區</label
                    >
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
                        :key="`地區${index}`"
                        >{{ item }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="col-xl-5 col-lg-6 col-12">
                  <div class="d-flex align-items-end h-100">
                    <button
                      type="button"
                      class="btn btn-primary btn--applyJob me-2 flex-grow-1"
                      @click="filterJobs"
                    >
                      搜尋職位
                    </button>
                    <button type="button" class="btn btn-gray-light me-2" @click="cleanFilter">
                      清除全部
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-gray-line text-dark"
                      @click="openMoreFilter"
                    >
                      更多條件
                      <i
                        v-if="openMoreFilterState === true"
                        class="jobIcon--sm ms-1 text-dark bi bi-chevron-up"
                      ></i>
                      <i
                        v-if="openMoreFilterState === false"
                        class="jobIcon--sm ms-1 text-dark bi bi-chevron-down"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="filterBox__section" v-if="openMoreFilterState === true">
              <p class="filterBox__section__tag">薪資條件</p>
              <div class="filterBox__section__content row flex-grow-1">
                <div class="col-xl-6 col-lg-8 col-12">
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
                        class="form-check
                        py-2 px-3 d-flex justify-content-center align-items-center"
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
              </div>
            </div>
            <div class="filterBox__section" v-if="openMoreFilterState === true">
              <p class="filterBox__section__tag">工作要求</p>
              <div class="filterBox__section__content row flex-grow-1">
                <div class="col-lg-3 col-md-6 col-12">
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
                        :key="`工作經驗${index}`"
                        >{{ item }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 col-12">
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
                        :key="`學歷要求${index}`"
                        >{{ item }}</option
                      >
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="filterBox__section" v-if="openMoreFilterState === true">
              <p class="filterBox__section__tag">職位相關</p>
              <div class="filterBox__section__content row flex-grow-1">
                <div class="col-lg-3 col-md-6 col-12">
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
                        :key="`工作性質${index}`"
                        >{{ item }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 col-12">
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
                        :key="`工作時段${index}`"
                        >{{ item }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 col-12">
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
                        :key="`職位類別${index}`"
                        >{{ item }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 col-12">
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
                        :key="`產業類別${index}`"
                        >{{ item }}</option
                      >
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="jobsListContainer container">
      <h3 class="pageTitle ps-3">搜尋結果</h3>
      <p class="ps-3 mb-6 text-primary" v-if="filterTxt !== ''">
        <span class="text-gray-dark">搜尋條件：</span>{{ filterTxt }}
      </p>
      <div class="row">
        <div class="col-lg-6 col-12" v-if="jobsList.length > 0">
          <div class="jobListBox">
            <div class="d-flex justify-content-between align-items-center ps-3 mb-3">
              <p class="text-secondary fw-normal text-nowrap">
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
          <img class="img--searchNoJob" src="https://storage.googleapis.com/vue-course-api.appspot.com/jordanttcdesign/1629385211015.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=F0Wk9lSjiNEPR9Oc2yUH%2FsytXi9oZAK9mQfxq5pEsNm%2FkYws1ORyXtgI3GxhfKA144%2F70tZX5321YS22Ta%2B9sdNPTtUUUIdWY1fQgSf95yMxikEYSVSpb%2FtKGlZvlcJy6kFokL6Ktv3CYncDq%2B1AVDPtZf7avLr8bdcDYoxsDgeSNoKESY%2BZIQDcLI6c3t%2BfROBH3NZkBTBrTa98P%2FeCywVqtNkfMfZpoewZyqptrn0rptafi6iQurKFCpTbOTvUAdiM0dnsHiEyzVwigDrN%2FNtaxR%2BwdTPDnAE2fS6QMx%2B2kjNa32GEjbkQ7fCcbYTPiQ0%2FQMDTpX8lfSwhG5knbA%3D%3D" alt="搜不到職位" />
        </div>
      </div>
    </div>
    <PagenationModal :jobs-list="jobsList" @change-page="changePage" />
  </div>
  <div class="sideBtnBox">
    <FilterBtn
      :tem-filter-data="filterData"
      @send-filter-data="filter"
      @get-filter-txt="getFilterTxt"
    />
    <UpTopBtn />
  </div>
  <JobCollect ref="jobCollectModal" @return-job-collection="getJobCollect" />
</template>

<script>
import emitter from '@/methods/emitter';
import searchFilter from '@/methods/searchFilter';
import webData from '@/methods/webData';
import PagenationModal from '@/components/helpers/Pagenation.vue';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import FilterBtn from '@/components/helpers/FilterBtn.vue';
import JobListCard from '@/components/front/JobListCard.vue';
import JobCollect from '@/components/helpers/JobCollect.vue';
import JobListSideJobBox from '@/components/front/JobListSideJobBox.vue';

export default {
  components: {
    PagenationModal,
    UpTopBtn,
    FilterBtn,
    JobListCard,
    JobListSideJobBox,
    JobCollect,
  },
  inject: ['reload'],
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      swiperNum: 1,
      searchFilterMethods: {},
      searchByJobCategoryState: false,
      products: [],
      jobsList: [],
      jobItem: {
        options: {
          company: {
            companyImagesUrl: [],
          },
          job: {},
        },
      },
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
      filterTxt: '',
      temData: [],
      nowPageJobs: [],
      sortWay: 'time',
      filterQuery: {},
      openMoreFilterState: false,
      jobCollectionList: [],
    };
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
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.reload();
      }
    },
  },
  methods: {
    getJobCollect(collection) {
      this.jobCollectionList = collection;
      this.checkJobCollect();
    },
    checkJobCollect() {
      if (this.nowPageJobs.length > 0 && this.jobCollectionList.length > 0) {
        this.nowPageJobs.forEach((temItem, index) => {
          let check = false;
          this.jobCollectionList.forEach((folder) => {
            folder.jobs.forEach((item) => {
              if (item.id === temItem.id) {
                check = true;
              }
            });
          });
          this.nowPageJobs[index].jobCollectCheck = check;
        });
      }
    },
    openMoreFilter() {
      if (this.openMoreFilterState === true) {
        this.openMoreFilterState = false;
      } else if (this.openMoreFilterState === false) {
        this.openMoreFilterState = true;
      }
    },
    // 根據職位類別搜尋
    searchByJobCategory(jobCategory) {
      this.cleanFilter();
      this.searchByJobCategoryState = true;
      const keyword = '不限';
      const city = '不限';
      this.filterData.jobCategory = jobCategory;
      this.$router.push(`/search/?keyword=${keyword}&city=${city}&jobCategory=${jobCategory}`);
      this.reload();
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
    filterJobs() {
      emitter.emit('spinner-open');
      this.classifyJob();
      const temArray = this.searchFilterMethods.filter(this.jobsList, this.filterData);
      this.jobsList = temArray;
      this.changePage(1);
      emitter.emit('get-filter-txt');
      emitter.emit('filterBtn-close');
      emitter.emit('spinner-close');
    },
    filter(value) {
      emitter.emit('spinner-open');
      this.filterData = value;
      this.classifyJob();
      const temArray = this.searchFilterMethods.filter(this.jobsList, this.filterData);
      this.jobsList = temArray;
      this.changePage(1);
      emitter.emit('get-filter-txt');
      emitter.emit('filterBtn-close');
      emitter.emit('spinner-close');
    },
    // 取得搜尋條件文字
    getFilterTxt(txt) {
      this.filterTxt = txt;
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
      this.nowPageJobs = [];
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
      this.nowPageJobs = JSON.parse(JSON.stringify(temPageJobs));
      this.checkJobCollect();
      setTimeout(() => {
        if (this.nowPageJobs.length > 0) {
          this.selectJobFrist(this.nowPageJobs[0].id);
        }
      }, 10);
    },
    // 篩選出所有職位
    classifyJob() {
      this.jobsList = [];
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
    },
    // 抓全部資料
    getOgData() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.filterJobs();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 抓取動態路由參數
    getSearchFilterData() {
      const { keyword, city, jobCategory } = this.filterQuery;
      if (keyword !== '不限') {
        this.filterData.keyword = keyword;
      }
      this.filterData.city = city;
      this.filterData.jobCategory = jobCategory;
    },
  },
  created() {
    this.getOgData();
    this.formData = webData;
    this.searchFilterMethods = searchFilter;
    this.filterQuery = this.$route.query;
    this.getSearchFilterData();
    emitter.emit('spinner-open-bg', 1200);
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
