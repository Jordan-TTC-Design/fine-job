<template>
  <div
    @click="selectJob"
    :data-id="jobItem.id"
    :ref="`list__item${jobItem.id}`"
    class="list__item d-flex box--shadow flex-column align-items-start pe-auto"
  >
    <button
      class="collectBtn btn btn-outline-gray-line position-absolute"
      :class="{'collected':jobItem.jobCollectCheck}"
      type="button"
      @click.stop="collectJob(jobItem)"
    >
      <i class="jobIcon bi bi-bookmark-fill"></i>
    </button>
    <div class="list__item__tagBox mb-3">
      <button type="button" class="jobTag btn" @click="searchByJobCategory">
        {{ jobItem.category }}
      </button>
    </div>
    <div class="d-flex w-100 flex-md-row flex-column">
      <div class="list__item__imgBox">
        <img class="jobImage" :src="jobItem.imageUrl" :alt="`${jobItem.title}職位圖片`" />
        <div class="img-cover d-md-none d-block"></div>
        <div class="list__item__logoImgBox">
          <img
            class="logoImg"
            :src="jobItem.options.company.companyLogoUrl"
            :alt="`${jobItem.options.company.companyName}logo`"
          />
        </div>
      </div>
      <div
        class="list__item__txtBox flex-grow-1 d-flex flex-column
        justify-content-between"
      >
        <div class="mb-3 d-flex flex-column align-items-start">
          <router-link
            class="list__item__title mb-3 me-7 pe-auto"
            :to="`/products-list/product/${jobItem.id}`"
            >{{ jobItem.title }}</router-link
          >
          <router-link
            class="page__link subTxt mb-2 me-7 pe-auto"
            :to="`/products-list/company/${jobItem.options.company.companyLink}`"
            >{{ jobItem.options.company.companyName }}</router-link
          >
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <p class="text-primary" v-if="!jobItem.options.job.salaryInterView">
            {{ jobItem.price }} / 月薪
          </p>
          <p class="text-primary" v-if="jobItem.options.job.salaryInterView">薪資面議</p>
          <p class="subTxt text-secondary">
            {{ $filters.date(jobItem.options.job.create) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  props: ['jobListItem'],
  emits: ['select-job', 'search-by-job-category'],
  data() {
    return {
      jobItem: {},
    };
  },
  watch: {
    jobListItem: {
      deep: true,
      handler(newValue) {
        this.jobItem = newValue;
      },
    },
  },
  methods: {
    // 收藏職位
    collectJob(item) {
      emitter.emit('open-collect-modal', item);
    },
    selectJob() {
      this.$emit('select-job', this.jobItem.id);
    },
    searchByJobCategory() {
      this.$emit('search-by-job-category', this.jobItem.category);
    },
    openSelectEffect() {
      this.$refs[`list__item${this.jobItem.id}`].classList.add('active');
    },
    closeSelectEffect() {
      this.$refs[`list__item${this.jobItem.id}`].classList.remove('active');
    },
  },
  created() {
    this.jobItem = this.jobListItem;
  },
};
</script>

<style lang="scss"></style>
