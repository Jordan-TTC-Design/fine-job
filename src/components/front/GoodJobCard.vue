<template>
  <router-link class="card goodJobCard" :to="`/products-list/product/${jobItem.id}`">
    <div class="goodJobCard__imgBox">
      <img
        class="goodJobCard__img card-img-top"
        :src="jobItem.imageUrl"
        :alt="`${jobItem.title}職位圖片`"
      />
      <div class="img-cover"></div>
      <div class="goodJobCard__jobInfoBox">
        <div class="d-flex">
          <img
            class="goodJobCard__logo me-2"
            :src="jobItem.options.company.companyLogoUrl"
            :alt="`${jobItem.options.company.companyName}公司logo`"
          />
          <div>
            <router-link
              class="card__link mb-2 d-block pe-auto"
              :to="`/products-list/product/${jobItem.id}`"
              >{{ jobItem.title }}</router-link
            >
            <router-link
              class="card__link subTxt d-block pe-auto"
              :to="`/products-list/company/${jobItem.options.company.companyLink}`"
              >{{ jobItem.options.company.companyName }}</router-link
            >
          </div>
        </div>
        <img class="goodJobCard__img" :src="jobItem.imageUrl" :alt="`${jobItem.title}職位圖片`" />
      </div>
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <p class="subTxt" v-if="!jobItem.options.job.salaryInterView">{{ jobItem.price }} / 月薪</p>
        <p class="subTxt" v-if="jobItem.options.job.salaryInterView">
          薪資面議
        </p>
        <p class="subTxt">{{ jobItem.options.company.companyAddressCity }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>

export default {
  props: ['goodJob'],
  data() {
    return {
      jobItem: {},
    };
  },
  watch: {
    goodJob: {
      deep: true,
      handler(newValue) {
        this.jobItem = newValue;
      },
    },
  },
  methods: {

  },
  created() {
    this.jobItem = this.goodJob;
  },
};
</script>

<style lang="scss"></style>
