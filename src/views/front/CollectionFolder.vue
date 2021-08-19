<template>
  <div class="page--py">
    <div ref="jobsListContainer" class="jobsListContainer container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="section__title ps-3 mb-0">職位收藏夾 - {{ jobFolder.title }}</h3>
        <button type="button" class="btn btn-outline-secondary" @click="deleteFolder">
          刪除收藏夾
        </button>
      </div>
      <div class="row" v-if="nowPageJobs.length">
        <div class="col-lg-6 col-12">
          <div class="jobListBox">
            <div class="d-flex justify-content-between align-items-center ps-3 mb-3">
              <div class="d-flex flex-wrap">
                <p class="text-primary me-2" v-if="filterTxt !== ''">
                  <span class="text-secondary">搜尋條件：</span>{{ filterTxt }}
                </p>
                <p class="text-secondary fw-normal text-nowrap">
                  共 {{ jobFolderDetail.length }} 個職位
                </p>
              </div>
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
        <div class="col-lg-6 col-12 d-lg-block d-none">
          <JobListSideJobBox ref="jobSelectBox" :select-job-item="jobItem" />
        </div>
      </div>
      <p class="text-center text-secondary mt-md-6 mt-2" v-if="nowPageJobs.length === 0">
        尚未收藏任何職位
      </p>
    </div>
    <PagenationModal :jobs-list="jobFolderDetail" @change-page="changePage" />
  </div>
  <div class="sideBtnBox">
    <FilterBtn :tem-filter-data="filterData" @send-filter-data="filter" />
    <UpTopBtn />
  </div>
  <JobCollect ref="jobCollectModal" @return-job-collection="returnJobCollection" />
</template>

<script>
import emitter from '@/methods/emitter';
import searchFilter from '@/methods/searchFilter';
import webData from '@/methods/webData';
import PagenationModal from '@/components/helpers/Pagenation.vue';
import JobListCard from '@/components/front/JobListCard.vue';
import JobListSideJobBox from '@/components/front/JobListSideJobBox.vue';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import FilterBtn from '@/components/helpers/FilterBtn.vue';
import JobCollect from '@/components/helpers/JobCollect.vue';

export default {
  components: {
    PagenationModal,
    JobListCard,
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
      swiperOption: {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
        },
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView: this.swiperNum,
        spaceBetween: '20',
      },
      jobCollectionList: [],
      jobFolder: {},
      jobFolderDetail: [],
    };
  },
  watch: {
    fullWidth(newValue) {
      if (newValue > 768) {
        this.swiperNum = 3;
      } else if (newValue > 576) {
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
    deleteFolder() {
      emitter.emit('delete-collect-folder-modal', this.jobFolder.id);
    },
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
        this.jobFolderDetail.sort((a, b) => b.options.job.create - a.options.job.create);
      } else if (this.sortWay === 'money') {
        this.jobFolderDetail.sort((a, b) => b.price - a.price);
      }
    },
    // 切換頁面
    changePage(nowPageNum) {
      this.pageNumber = nowPageNum;
      this.getNowPageJobs();
    },
    // 篩選查詢
    filter(value) {
      emitter.emit('spinner-open');
      this.filterData = value;
      this.getfolderJobs();
      const temArray = this.searchFilterMethods.filter(this.jobFolderDetail, this.filterData);
      this.jobFolderDetail = temArray;
      this.changePage(1);
      emitter.emit('get-filter-txt');
      emitter.emit('filterBtn-close');
      emitter.emit('spinner-close');
    },
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
        if (this.nowPageJobs.length > 0) {
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
      }
    },
    // 本頁職位
    getNowPageJobs() {
      const temPageJobs = [];
      if (this.jobFolderDetail.length !== []) {
        const pageFrist = this.pageNumber * 10 - 10;
        this.jobFolderDetail.forEach((item, index) => {
          if (pageFrist <= index && index < this.pageNumber * 10) {
            temPageJobs.push(item);
          }
        });
        document.documentElement.scrollTop = 0;
        [this.jobItem] = temPageJobs;
      }
      this.nowPageJobs = temPageJobs;
      this.checkJobCollect();
      setTimeout(() => {
        if (this.nowPageJobs.length > 0) {
          this.selectJobFrist(this.nowPageJobs[0].id);
        }
      }, 10);
    },
    getfolderJobs() {
      this.jobFolderDetail = [];
      this.jobFolder.jobs.forEach((item) => {
        this.jobsList.forEach((job) => {
          if (item.id === job.id) {
            this.jobFolderDetail.push(job);
          }
        });
      });
      this.changeJobSort();
      this.changePage(1);
    },
    // 篩選出所有職位
    classifyJob() {
      this.jobsList = [];
      this.products.forEach((item) => {
        if (item.description === '職位') {
          const Obj = JSON.parse(JSON.stringify(item));
          this.sortCompany.forEach((temCompany) => {
            if (Obj.options.company.companyName === temCompany.title) {
              Obj.options.company.companyLink = temCompany.id;
            }
          });
          this.jobsList.push(Obj);
        }
      });
      this.getfolderJobs();
    },
    // 抓全部資料
    getOgData() {
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
    // 取得收藏職位資料
    returnJobCollection(array) {
      this.jobCollectionList = array;
      const { id } = this.$route.params;
      this.jobCollectionList.forEach((item) => {
        if (item.id === id) {
          this.jobFolder = JSON.parse(JSON.stringify(item));
        }
      });
      this.getOgData();
    },
  },
  created() {
    this.formData = webData;
    this.searchFilterMethods = searchFilter;
    emitter.emit('spinner-open-bg', 1000);
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
    emitter.emit('return-local-collection');
  },
};
</script>

<style lang="scss"></style>
