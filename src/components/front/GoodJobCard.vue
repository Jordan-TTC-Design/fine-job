<template>
  <div class=" card goodJobCard">
    <div class="goodJobCard__imgBox">
      <img class="goodJobCard__img card-img-top" :src="jobItem.imageUrl" alt="" />
      <div class="img-cover"></div>
      <div class="goodJobCard__jobInfoBox">
        <div class="d-flex">
          <img
            class="goodJobCard__logo me-2"
            :src="jobItem.options.company.companyLogoUrl"
            :alt="jobItem.title"
          />
          <div>
            <router-link
              class="mb-2 text-white d-block"
              type="button"
              :to="`/products-list/product/${jobItem.id}`"
              >{{ jobItem.title }}</router-link
            >
            <router-link
              class="subTxt text-white d-block"
              type="button"
              :to="`/products-list/company/${jobItem.options.company.companyLink}`"
              >{{ jobItem.options.company.companyName }}</router-link
            >
          </div>
        </div>
        <img class="goodJobCard__img" :src="jobItem.imageUrl" alt="" />
      </div>
    </div>

    <div class="card-body">
      <div class="d-flex justify-content-between">
        <p class="subTxt">{{ jobItem.price }} / 月薪</p>
        <p class="subTxt">{{ jobItem.options.company.companyAddressCity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import emitter from '@/components/helpers/emitter';

export default {
  props: ['goodJob'],
  name: 'goodJobCard',
  data() {
    return {
      jobItem: {},
    };
  },
  methods: {
    checkData() {
      console.log(this.jobItem);
    },
  },
  watch: {
    goodJob: {
      deep: true,
      handler(newValue) {
        this.jobItem = newValue;
        console.log(this.jobItem);
      },
    },
  },
  created() {
    this.jobItem = this.goodJob;
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
