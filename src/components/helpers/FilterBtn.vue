<template>
  <div
    class="sideFilter searchFilterBox box--shadow mb-md-5 mb-0 p-5"
    v-if="filterBoxOpenState"
    :class="{ active: filterBoxOpenState }"
  >
    <div class="filterContent">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="subTitle text-dark">搜尋條件設定</h3>
        <div class="d-flex">
          <button type="button" class="btn btn-gray-light btn-lg btn--web" @click="cleanFilter">
            清除全部
          </button>
          <button type="button" class="btn d-md-none d-block" @click="openFilter">
            <i class="text-dark bi bi-x-lg"></i>
          </button>
        </div>
      </div>
      <div ref="searchFilterForm" class="searchFilterForm">
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
                <div class="form-check py-2 px-3 d-flex justify-content-center align-items-center">
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
              <button
                type="button"
                class="btn btn-primary btn--applyJob"
                @click="$emit('send-filter-data', this.filterData)"
              >
                查詢
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-cover--dark d-md-none" v-if="filterBoxOpenState" @click="openFilter"></div>
  <button type="button" class="sideIconBtn btn btn-light mb-2" @click="openFilter">
    <i class="jobIcon bi bi-funnel"></i>
  </button>
</template>

<script>
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';

export default {
  props: ['temFilterData'],
  emits: ['send-filter-data'],
  data() {
    return {
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
      filterBoxOpenState: false,
      mountState: false,
    };
  },
  watch: {
    temFilterData: {
      deep: true,
      handler(newValue) {
        this.filterData = newValue;
      },
    },
  },
  methods: {
    // 打開篩選彈跳視窗
    openFilter() {
      if (this.filterBoxOpenState === true) {
        this.filterBoxOpenState = false;
      } else if (this.filterBoxOpenState === false) {
        this.filterBoxOpenState = true;
      }
    },
    closeFilter() {
      this.filterBoxOpenState = false;
    },
    getFilterData(temFilter) {
      this.cleanFilter();
      this.filterData = temFilter;
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
  },
  created() {
    this.formData = webData;
    this.filterData = this.temFilterData;
    emitter.on('filterBtn-close', () => {
      this.closeFilter();
    });
  },
  // mounted() {
  //   const vm = this;
  //   vm.fullWidth = window.innerWidth;
  //   vm.fullHeight = window.innerHeight;
  //   vm.scrollTop = window.scrollY;
  //   window.onresize = () => {
  //     vm.fullWidth = window.innerWidth;
  //     vm.fullHeight = window.innerHeight;
  //   };
  //   window.onscroll = () => {
  //     vm.scrollTop = window.scrollY;
  //   };
  // },
};
</script>

<style></style>
