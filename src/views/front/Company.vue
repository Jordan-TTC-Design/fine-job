<template>
  <div class="container-fuild">
    <div class="container jobPage">
      <div class="row">
        <div class="col-md-9">
          <div class="jobContentBox box--shadow mb-3">
            <div class="d-flex">
              <div class="jobContent__imgBox">
                <img class="jobImage" :src="companyItem.imageUrl" alt="" />
                <div class="logoImageBox">
                  <img class="logoImage" :src="companyItem.imageUrl" alt="" />
                </div>
              </div>
              <div class="JobContent__txtBox">
                <div class="mb-3">
                  <h2 class="page__title">{{ companyItem.title }}</h2>
                </div>
                <div class="d-flex justify-content-between">
                  <div>
                    <p class="page__txt mb-2">
                      <span></span>{{ companyItem.options.companyAddressCity }}
                    </p>
                    <p class="page__txt"><span></span>需求人數：{{ companyItem.num }}</p>
                  </div>
                  <div>
                    <p>{{ companyItem.price }}/月薪</p>
                    <p>{{ $filters.date(companyItem.options.create) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="jobContentBox  box--shadow  mb-3">
            <h3 class="page__title--sub"><span class="title__icon"></span>企業簡介</h3>
            <p class="page__txt mb-2">
              產業類別：{{ companyItem.category }}
            </p>
            <p class="page__txt">{{ companyItem.content }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div
            v-if="companyItem.imagesUrl.length > 0"
            class="jobSubBox jobPage__companyImage box--shadow  mb-3"
          >
            <h5 class="list__title">公司照片</h5>
            <div class="companyImageBox">
              <img class="mb-2" :src="companyItem.imagesUrl[0]" alt="" />
              <div class="d-flex justify-content-between">
                <img
                  v-if="companyItem.imagesUrl.length > 0"
                  class="companyImage--sub"
                  :src="companyItem.imagesUrl[1]"
                  alt=""
                />
                <img
                  v-if="companyItem.imagesUrl.length > 1"
                  :src="companyItem.imagesUrl[2]"
                  alt=""
                  class="companyImage--sub"
                />
              </div>
            </div>
          </div>
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
    <div v-if="isExist" class="productPage-container">
      <p>{{ companyItem.title }}</p>
    </div>
    <div v-else-if="isExist == false" class="cantFoundProduct">
      <h5>找不到產品</h5>
    </div>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';

export default {
  data() {
    return {
      companyItem: {
        options: {
          company: {
            companyImagesUrl: [],
            companyLogoUrl: '',
          },
          job: {},
        },
      },
      companyJobs: [],
      jobsList: [],
      isExist: null,
    };
  },
  methods: {
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
      this.jobsList.forEach((item) => {
        if (item.options.company.companyName === this.companyItem.title) {
          console.log(item.options.company.companyName);
          this.companyJobs.push(item);
        }
      });
      console.log(this.companyJobs);
    },
  },
  created() {
    // console.log(this.$route.params.id);
    this.getCompanyData();
    this.getJobs();
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
