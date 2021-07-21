<template>
  <div class="container-fuild">
    <div v-if="isExist" class="container companyPage">
      <div class="row">
        <div class="col-lg-9 col-12">
          <div class="jobContentBox box--shadow mb-3  position-relative">
            <button
              class="collectBtn btn btn-outline-gray-line position-absolute pageState"
              type="button"
            >
              <i class="jobIcon bi bi-bookmark-fill"></i>
            </button>
            <div class="d-flex flex-md-row flex-column align-items-md-start align-items-center">
              <div class="jobContent__imgBox mb-md-0 mb-4">
                <div class="logoImageBox">
                  <img class="logoImage" :src="companyItem.imageUrl" alt="" />
                </div>
              </div>
              <div
                class="JobContent__txtBox d-flex flex-column justify-content-between
              align-items-md-start align-items-center pt-3"
              >
                <h2 class="page__title mb-3">{{ companyItem.title }}</h2>
                <div
                  class="d-flex flex-md-row flex-column justify-content-between
                align-items-end w-100"
                >
                  <div class="align-self-md-stretch align-self-center">
                    <p class="page__txt mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                      >{{ companyItem.options.companyAddressCity }}，{{
                        companyItem.options.companyAddressDetail
                      }}
                    </p>
                    <p class="page__txt">
                      <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                      {{ companyItem.category }}
                    </p>
                  </div>
                  <div>
                    <p class="subTxt text-secondary">
                      {{ $filters.date(companyItem.options.create) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="jobContentBox box--shadow mb-3">
            <h3 class="page__title--sub"><span class="title__icon"></span>公司照片</h3>
            <div class="d-flex justify-content-between flex-md-row flex-column">
              <img
                v-for="(item, index) in companyItem.imagesUrl"
                class="companyPage__companyImage mb-md-0 mb-2"
                :src="item"
                alt=""
                :key="index"
              />
            </div>
          </div>
          <div class="jobContentBox  box--shadow  mb-3">
            <h3 class="page__title--sub"><span class="title__icon"></span>公司簡介</h3>
            <p class="page__txt">{{ companyItem.content }}</p>
          </div>
          <div class="jobContentBox  box--shadow  mb-lg-0 mb-3">
            <h3 class="page__title--sub"><span class="title__icon"></span>公司職位</h3>
            <ul class="jobList d-flex flex-wrap justify-content-between">
              <li
                :data-id="item.id"
                v-for="item in companyJobs"
                :key="item.id"
                class="jobList__item d-flex border border-gray-line flex-column align-items-start
                  mb-4 "
              >
                <button
                  class="collectBtn btn btn-outline-gray-line position-absolute"
                  type="button"
                >
                  <i class="jobIcon bi bi-bookmark-fill"></i>
                </button>
                <div class="mb-3">
                  <button
                    type="button"
                    class="jobTag btn"
                    @click="searchByJobCategory(item.category)"
                  >
                    {{ item.category }}
                  </button>
                </div>
                <div class="d-flex">
                  <div class="jobList__item__imgBox me-3">
                    <img class="jobImage" :src="item.imageUrl" alt="" />
                  </div>
                  <div
                    class="jobList__item__txtBox
                  flex-grow-1 d-flex flex-column justify-content-between"
                  >
                    <div class="mb-3 d-flex flex-column">
                      <router-link
                        class="jobList__item__title text-dark mb-3 me-7 pe-auto"
                        :to="`/products-list/product/${item.id}`"
                        >{{ item.title }}</router-link
                      >
                      <p class="page__txt  subTxt mb-2 me-7">
                        {{ item.options.company.companyName }}
                      </p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                      <p class="text-primary" v-if="!item.options.job.salaryInterView">
                        {{ item.price }} / 月薪
                      </p>
                      <p class="text-primary" v-if="item.options.job.salaryInterView">
                        薪資面議
                      </p>
                      <p class="subTxt text-secondary">
                        {{ $filters.date(item.options.job.create) }}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-12">
          <div class="jobSubBox box--shadow  mb-3">
            <h5 class="list__title">瀏覽紀錄</h5>
            <ul>
              <li class="list__item">
                <a class="mb-2">UI Designer</a>
                <a>六角學院</a>
              </li>
              <li class="list__item">
                <a class="mb-2">UI Designer</a>
                <a>六角學院</a>
              </li>
              <li class="list__item">
                <a class="mb-2">UI Designer</a>
                <a>六角學院</a>
              </li>
              <li class="list__item">
                <a class="mb-2">UI Designer</a>
                <a>六角學院</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isExist == false" class="cantFoundProduct">
      <h5>找不到產品</h5>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn></UpTopBtn>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';

export default {
  components: {
    UpTopBtn,
  },
  data() {
    return {
      companyItem: {
        imagesUrl: [],
        imageUrl: '',
        options: {
          company: {},
          job: {},
        },
      },
      companyJobs: [],
      jobsList: [],
      isExist: null,
    };
  },
  methods: {
    searchByJobCategory(jobCategory) {
      const keyword = '不限';
      const city = '不限';
      this.$router.push(`/search/?keyword=${keyword}&city=${city}&jobCategory=${jobCategory}`);
    },
    getCompanyData() {
      emitter.emit('spinner-open');
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.isExist = true;
            // console.log(res);
            this.companyItem = res.data.product;
            console.log(this.companyItem);
          } else {
            this.isExist = false;
          }
          emitter.emit('spinner-close');
          //   console.log(this.isExist);
          this.getJobs();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getJobs() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          //   console.log(res);
          this.jobsList = [];
          this.jobsList = res.data.products;
          console.log(this.jobsList);
          this.findCompanyJobs();
        })
        .catch((error) => {
          console.log(error);
        });
      emitter.emit('spinner-close');
    },
    findCompanyJobs() {
      emitter.emit('spinner-open');
      this.jobsList.forEach((item) => {
        if (item.description === '職位') {
          console.log(item);
          if (item.options.company.companyName === this.companyItem.title) {
            console.log(item.options.company.companyName);
            this.companyJobs.push(item);
          }
        }
      });
      // console.log(this.companyJobs);
      emitter.emit('spinner-close');
    },
  },
  created() {
    // console.log(this.$route.params.id);
    this.getCompanyData();
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
