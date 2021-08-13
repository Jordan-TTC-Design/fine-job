<template>
  <div
    class="sideFilterBox box--shadow mb-md-5 mb-0"
    v-if="filterBoxOpenState"
    :class="{ active: filterBoxOpenState }"
  >
    <div class="sideFilterBox__Header">
      <h3 class="section__title--sub mb-0"><span class="title__icon"></span>搜尋條件</h3>
      <button type="button" class="btn-close" @click="openFilter"></button>
    </div>
    <div ref="searchFilterForm" class="sideFilterBox__contentBox">
      <div class="sideFilterBox__section">
        <!-- 關鍵字 -->
        <div class="mb-3">
          <div class="inputGroup--item">
            <label for="searchFilterForm-keyword" class="form-label inputItem__title">關鍵字</label>
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
        <!-- 地區 -->
        <div class="mb-3">
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
              <option v-for="(item, index) in formData.city" :value="item" :key="`地區${index}`">{{
                item
              }}</option>
            </select>
          </div>
        </div>
        <!-- 薪資 -->
        <div class="mb-3">
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
                <label class="form-check-label text-nowrap" for="searchFilterForm-salaryInterview">
                  面議
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- 顯示更多按鈕 -->
        <div class="mb-3" v-if="openMoreFilterState === false">
          <button type="button" class="btn w-100 text-dark" @click="openMoreFilter">
            顯示更多條件
          </button>
        </div>
      </div>
      <div class="sideFilterBox__section" v-if="openMoreFilterState === true">
        <p class="sideFilterBox__section__tag">工作要求</p>
        <!-- 工作經驗 -->
        <div class="mb-3">
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
        <!-- 學歷要求 -->
        <div class="mb-3">
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
      <div class="sideFilterBox__section" v-if="openMoreFilterState === true">
        <p class="sideFilterBox__section__tag">職位相關</p>
        <!-- 產業類別 -->
        <div class="mb-3">
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
        <!-- 職位類別 -->
        <div class="mb-3">
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
        <!-- 工作時段 -->
        <div class="mb-3">
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
        <!-- 工作性質 -->
        <div class="mb-3">
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
      </div>
    </div>
    <div class="sideFilterBox__footer">
      <button type="button" class="btn btn-gray-light" @click="cleanFilter">
        清除全部
      </button>
      <button
        type="button"
        class="btn btn-primary btn--applyJob"
        @click="$emit('send-filter-data', this.filterData)"
      >
        查詢
      </button>
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
  emits: ['send-filter-data', 'get-filter-txt'],
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
      filterTxt: '',
      filterBoxOpenState: false,
      openMoreFilterState: false,
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
    openMoreFilter() {
      if (this.openMoreFilterState === true) {
        this.openMoreFilterState = false;
      } else if (this.openMoreFilterState === false) {
        this.openMoreFilterState = true;
      }
    },
    // 打開篩選彈跳視窗
    openFilter() {
      if (this.filterBoxOpenState === true) {
        this.filterBoxOpenState = false;
      } else if (this.filterBoxOpenState === false) {
        this.filterBoxOpenState = true;
      }
      if (this.openMoreFilterState === true) {
        this.openMoreFilterState = false;
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
    // 取得搜尋條件文字
    getFilterTxt() {
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
      this.$emit('get-filter-txt', this.filterTxt);
    },
  },
  created() {
    this.formData = webData;
    this.filterData = this.temFilterData;
  },
  mounted() {
    emitter.on('filterBtn-close', this.closeFilter);
    emitter.on('get-filter-txt', this.getFilterTxt);
  },
  unmounted() {
    emitter.off('filterBtn-close', this.closeFilter);
    emitter.off('get-filter-txt', this.getFilterTxt);
  },
};
</script>

<style></style>
