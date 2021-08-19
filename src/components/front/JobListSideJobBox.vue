<template>
  <div ref="sideJobBox" class="sideJobBox sideJobBox--sticky box--shadow">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="mb-3">
        <button type="button" class="jobTag btn" @click="searchByJobCategory">
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
        <button
          class="collectBtn btn btn-outline-gray-line"
          type="button"
          :class="{'collected':jobItem.jobCollectCheck}"
          @click="collectJob(jobItem)"
        >
          <i class="jobIcon bi bi-bookmark-fill"></i>
        </button>
      </div>
    </div>
    <div class="pb-5 border-bottom border-gray-line">
      <div class="d-flex mb-3">
        <div class="sideJobBox__imgBox">
          <img class="jobImage" :src="jobItem.imageUrl" :alt="`${jobItem.title}職位圖片`" />
          <div class="logoImageBox">
            <img
              class="logoImage"
              :src="jobItem.options.company.companyLogoUrl"
              :alt="`${jobItem.options.company.companyName}logo`"
            />
          </div>
        </div>
        <div class="sideJobBox__txtBox">
          <div>
            <router-link
              class="sideJobBox__title mb-3 d-block"
              type="button"
              :to="`/products-list/product/${jobItem.id}`"
              >{{ jobItem.title }}</router-link
            >
            <router-link
              class="page__txt page__link subTxt mb-4 d-block"
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
              <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{ jobItem.num }}
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
        <div class="d-flex align-items-center">
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
    <div class="sideJobBox__section">
      <h3 class="section__title--sub"><span class="title__icon"></span>職位內容</h3>
      <p class="mb-3">
        <i class="jobIcon--sm me-1 bi bi-journal"></i>工作性質：{{ jobItem.options.job.workType }}
      </p>
      <p class="mb-3">
        <span><i class="jobIcon--sm me-1 bi bi-clock"></i></span>工作時間：{{
          jobItem.options.job.workTime
        }}
      </p>
      <p class="mb-3">
        <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>產業類別：{{
          jobItem.options.company.industryCategory
        }}
      </p>
      <p class="mb-3">
        <span><i class="jobIcon--sm me-1 bi bi-card-list"></i></span>工作類別：{{
          jobItem.category
        }}
      </p>
      <p class="mb-3">工作內容：</p>
      <div class="page__txt" v-html="jobItem.content"></div>
    </div>
    <div class="sideJobBox__section">
      <h3 class="section__title--sub"><span class="title__icon"> </span>應徵條件</h3>
      <p class="mb-3">
        <span><i class="jobIcon--sm me-1 bi bi-book"></i></span>學歷要求：{{
          jobItem.options.job.education
        }}
      </p>
      <p class="mb-3">
        <span><i class="jobIcon--sm me-1 bi bi-briefcase"></i></span>工作經驗：{{
          jobItem.options.job.workExp
        }}
      </p>
      <p class="mb-3">其他條件：</p>
      <div class="page__txt" v-html="jobItem.options.job.otherRequirement"></div>
    </div>
    <div class="sideJobBox__section">
      <h3 class="section__title--sub"><span class="title__icon"></span>申請方法</h3>
      <p class="mb-3">
        <span><i class="jobIcon--sm me-1 bi bi-person"></i></span>職位聯絡人：{{
          jobItem.options.company.companyContact
        }}
      </p>
      <a class="mb-3 d-block" :href="`mailto:${jobItem.options.company.companyEmail}`">
        <span><i class="jobIcon--sm me-1 bi bi-envelope"></i></span>聯絡信箱：{{
          jobItem.options.company.companyEmail
        }}
      </a>
      <a class="mb-3 d-block" :href="`tel:${jobItem.options.company.companyTel}`">
        <span><i class="jobIcon--sm me-1 bi bi-phone"></i></span>聯絡電話：{{
          jobItem.options.company.companyTel
        }}
      </a>
      <p class="mb-3">申請備註：</p>
      <div class="page__txt" v-html="jobItem.options.job.otherApplyInfo"></div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  props: ['selectJobItem'],
  emits: ['search-by-job-category'],
  data() {
    return {
      jobItem: {},
    };
  },
  watch: {
    selectJobItem: {
      deep: true,
      handler(newValue) {
        this.jobItem = newValue;
      },
    },
  },
  methods: {
    searchByJobCategory() {
      this.$emit('search-by-job-category', this.jobItem.category);
    },
    // 收藏職位
    collectJob(item) {
      emitter.emit('open-collect-modal', item);
    },
    toTop() {
      this.$refs.sideJobBox.scrollTop = 0;
    },
  },
  created() {
    this.jobItem = this.selectJobItem;
  },
};
</script>

<style lang="scss"></style>
