<template>
  <div class="container-fuild">
    <div class="container jobPage" v-if="isExist">
      <div class="row">
        <div class="col-md-9">
          <div class="jobContentBox box--shadow mb-3 position-relative">
            <button
              class="collectBtn btn btn-outline-gray-line position-absolute pageState"
              type="button"
            >
              <i class="jobIcon bi bi-bookmark-fill"></i>
            </button>
            <div class="d-flex">
              <div class="jobContent__imgBox">
                <img class="jobImage" :src="jobItem.imageUrl" alt="" />
                <div class="logoImageBox">
                  <img class="logoImage" :src="jobItem.options.company.companyLogoUrl" alt="" />
                </div>
              </div>
              <div class="JobContent__txtBox d-flex flex-column justify-content-between">
                <div class="pt-3">
                  <h2 class="page__title">{{ jobItem.title }}</h2>
                  <router-link
                    class="page__txt page__link subTxt  mb-4 d-block"
                    type="button"
                    :to="`/products-list/company/${temCompany.id}`"
                    >{{ jobItem.options.company.companyName }}</router-link
                  >
                </div>
                <div class="d-flex justify-content-between align-items-end">
                  <div>
                    <p class="page__txt mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                      >{{ jobItem.options.company.companyAddressCity }}
                    </p>
                    <p class="page__txt">
                      <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                        jobItem.num
                      }}
                    </p>
                  </div>
                  <div>
                    <p class="text-primary fw-bold mb-3">{{ jobItem.price }}/月薪</p>
                    <p class="subTxt text-secondary text-end">
                      {{ $filters.date(jobItem.options.job.create) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="jobContentBox  box--shadow  mb-3">
            <h3 class="page__title--sub"><span class="title__icon"></span>職位內容</h3>
            <p class="page__txt mb-2">工作性質：{{ jobItem.options.job.workType }}</p>
            <p class="page__txt mb-2">工作時間：{{ jobItem.options.job.workTime }}</p>
            <p class="page__txt mb-2">產業類別：{{ jobItem.options.company.industryCategory }}</p>
            <p class="page__txt mb-2">工作類別：{{ jobItem.category }}</p>
            <p class="page__txt mb-2">工作內容：</p>
            <p class="page__txt">{{ jobItem.content }}</p>
          </div>
          <div class="jobContentBox box--shadow  mb-3">
            <h3 class="page__title--sub"><span class="title__icon"> </span>應徵條件</h3>
            <p class="page__txt mb-2">學歷要求：{{ jobItem.options.job.education }}</p>
            <p class="page__txt mb-2">工作經驗：{{ jobItem.options.job.workExp }}</p>
            <p class="page__txt mb-2">其他條件：</p>
            <p class="page__txt">{{ jobItem.options.job.otherRequirement }}</p>
          </div>
          <div class="jobContentBox box--shadow">
            <h3 class="page__title--sub"><span class="title__icon"> </span>申請方法</h3>
            <p class="page__txt mb-2">職位聯絡人：{{ jobItem.options.company.companyContact }}</p>
            <p class="page__txt mb-2">聯絡信箱：{{ jobItem.options.company.companyEmail }}</p>
            <p class="page__txt mb-2">聯絡電話：{{ jobItem.options.company.companyTel }}</p>
            <p class="page__txt mb-2">申請備註：</p>
            <p class="page__txt">
              • 有意者請透過系統寄送應徵履歷，合者約談，不適任者恕不另行通知，謝謝。 • 請附上cover
              letter 、 CV/Resume 以及作品集。 • 需自備電腦。
            </p>
          </div>
        </div>
        <div class="col-md-3">
          <div
            v-if="jobItem.options.company.companyImagesUrl.length > 0"
            class="jobSubBox jobPage__companyImage box--shadow  mb-3"
          >
            <h5 class="list__title">公司照片</h5>
            <div class="companyImageBox">
              <img class="mb-2" :src="jobItem.options.company.companyImagesUrl[0]" alt="" />
              <div class="d-flex justify-content-between">
                <img
                  v-if="jobItem.options.company.companyImagesUrl.length > 0"
                  class="companyImage--sub"
                  :src="jobItem.options.company.companyImagesUrl[1]"
                  alt=""
                />
                <img
                  v-if="jobItem.options.company.companyImagesUrl.length > 1"
                  :src="jobItem.options.company.companyImagesUrl[2]"
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
      jobItem: {
        options: {
          company: {
            companyLogoUrl: '',
            companyImagesUrl: [],
          },
          job: {},
        },
      },
      jobsList: [],
      isExist: null,
      temCompany: {},
    };
  },
  methods: {

    getProductData() {
      emitter.emit('spinner-open');
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.isExist = true;
            // console.log(res);
            this.jobItem = res.data.product;
            // console.log(this.jobItem);
            this.getAllJobs();
          } else {
            this.isExist = false;
          }
          //   console.log(this.isExist);
        })
        .catch((error) => {
          console.log(error);
        });
      emitter.emit('spinner-close');
    },
    getAllJobs() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          //   console.log(res);
          this.jobsList = res.data.products;
          console.log(this.jobsList);
          this.findCompany();
        })
        .catch((error) => {
          console.log(error);
        });
      emitter.emit('spinner-close');
    },
    findCompany() {
      emitter.emit('spinner-open');
      this.jobsList.forEach((item) => {
        if (item.description === '企業') {
          // console.log(item);
          if (item.title === this.jobItem.options.company.companyName) {
            this.temCompany = item;
          }
        }
      });
      // console.log(this.temCompany);
      emitter.emit('spinner-close');
    },
  },
  created() {
    console.log(this.$route.params);
    this.getProductData();
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
