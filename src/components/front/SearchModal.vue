<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-12">
        <div class="bg-white rounded box--shadow--lg p-md-6 p-3">
          <form class="banner__searchBar d-flex align-items-center" @submit="toSearchJob">
            <div
              class="d-flex justify-content-between align-items-md-end align-items-stretch
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
                    :key="`地區${index}`"
                    >{{ item }}</option
                  >
                </select>
              </div>
              <button type="submit" class="btn btn-primary">搜尋職位</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import webData from '@/methods/webData';

export default {
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
    };
  },
  methods: {
    toSearchJob() {
      const keyword = this.filterData.keyword || '不限';
      const { city, jobCategory } = this.filterData;
      this.$router.push(`/search/?keyword=${keyword}&city=${city}&jobCategory=${jobCategory}`);
      this.cleanFilter();
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
  },
};
</script>

<style lang="scss"></style>
