<template>
  <div class="container-fuild">
    <div class="container jobPage" v-if="isExist">
      <div class="row">
        <div class="col-lg-9 col-12">
          <div class="jobInfoBox box--shadow mb-3 position-relative">
            <button
              class="collectBtn btn btn-outline-gray-line position-absolute pageState"
              type="button"
            >
              <i class="jobIcon bi bi-bookmark-fill"></i>
            </button>
            <div class="d-flex flex-md-row flex-column">
              <div class="jobInfoBox__imgBox mb-md-0 mb-4">
                <img class="jobImg" :src="jobItem.imageUrl" alt="" />
                <div class="jobInfoBox__logoImgBox">
                  <img class="logoImg" :src="jobItem.options.company.companyLogoUrl" alt="" />
                </div>
              </div>
              <div class="jobInfoBox__txtBox d-flex flex-column justify-content-between">
                <div class="pt-3 d-md-block d-flex flex-column align-items-center">
                  <h2 class="page__title">{{ jobItem.title }}</h2>
                  <router-link
                    class=" page__link subTxt  mb-4 d-block pe-auto"
                    :to="`/products-list/company/${temCompany.id}`"
                    >{{ jobItem.options.company.companyName }}</router-link
                  >
                </div>
                <div class="d-flex justify-content-between align-items-end mb-lg-0 mb-4">
                  <div>
                    <p class=" mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                      >{{ jobItem.options.company.companyAddressCity }}
                    </p>
                    <p class="">
                      <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                        jobItem.num
                      }}
                    </p>
                  </div>
                  <div>
                    <p
                      class="text-primary fw-bold mb-3"
                      v-if="!jobItem.options.job.salaryInterView"
                    >
                      {{ jobItem.price }} / 月薪
                    </p>
                    <p class="text-primary fw-bold mb-3" v-if="jobItem.options.job.salaryInterView">
                      薪資面議
                    </p>
                    <p class="subTxt text-secondary text-end">
                      {{ $filters.date(jobItem.options.job.create) }}
                    </p>
                  </div>
                </div>
              </div>
              <router-link
                class="btn btn-lg btn-primary w-100 pe-auto d-lg-none d-block"
                aria-current="page"
                :to="`/apply-job/${jobItem.id}`"
                >申請職位</router-link
              >
            </div>
          </div>
          <div class="jobContentSection  box--shadow  mb-3">
            <h3 class="section__title--sub"><span class="title__icon"></span>職位內容</h3>
            <p class=" mb-2">
              <i class="jobIcon--sm me-1 bi bi-journal"> </i>工作性質：{{
                jobItem.options.job.workType
              }}
            </p>
            <p class=" mb-2">
              <i class="jobIcon--sm me-1 bi bi-clock"> </i>工作時間：{{
                jobItem.options.job.workTime
              }}
            </p>
            <p class=" mb-2">
              <i class="jobIcon--sm me-1 bi bi-building"> </i>產業類別：{{
                jobItem.options.company.industryCategory
              }}
            </p>
            <p class=" mb-2">
              <i class="jobIcon--sm me-1 bi bi-card-list"> </i>工作類別：{{ jobItem.category }}
            </p>
            <p class=" mb-2">工作內容：</p>
            <div class="" v-html="jobItem.content"></div>
          </div>
          <div class="jobContentSection box--shadow  mb-3">
            <h3 class="section__title--sub"><span class="title__icon"> </span>應徵條件</h3>
            <p class=" mb-2">
              <i class="jobIcon--sm me-1 bi bi-book"> </i>學歷要求：{{
                jobItem.options.job.education
              }}
            </p>
            <p class=" mb-2">
              <i class="jobIcon--sm me-1 bi bi-briefcase"> </i>工作經驗：{{
                jobItem.options.job.workExp
              }}
            </p>
            <p class=" mb-2">其他條件：</p>
            <div class="" v-html="jobItem.options.job.otherRequirement"></div>
          </div>
          <div class="jobContentSection box--shadow mb-lg-0 mb-3">
            <h3 class="section__title--sub"><span class="title__icon"> </span>申請方法</h3>
            <p class=" mb-2">
              <i class="jobIcon--sm me-1 bi bi-person"> </i>職位聯絡人：{{
                jobItem.options.company.companyContact
              }}
            </p>
            <p class=" mb-2">
              <i class="jobIcon--sm me-1 bi bi-envelope"> </i>聯絡信箱：{{
                jobItem.options.company.companyEmail
              }}
            </p>
            <p class=" mb-2">
              <i class="jobIcon--sm me-1 bi bi-phone"> </i>聯絡電話：{{
                jobItem.options.company.companyTel
              }}
            </p>
            <p class=" mb-2">申請備註：</p>
            <div class="" v-html="jobItem.options.job.otherApplyInfo"></div>
          </div>
        </div>
        <div class="col-lg-3 col-12">
          <div class="jobSubBox apply box--shadow mb-lg-3 p-3 d-lg-block d-none">
            <router-link
              class="btn btn-lg btn-primary w-100 pe-auto"
              aria-current="page"
              :to="`/apply-job/${jobItem.id}`"
              >申請職位</router-link
            >
          </div>
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
          <div class="jobSubBox box--shadow mb-3" v-if="recentJobRead.length">
            <h5 class="list__title">瀏覽紀錄</h5>
            <ul>
              <template v-for="(jobRead, index) in recentJobRead" :key="jobRead.id">
                <li class="list__item" v-if="index < 6">
                  <p
                    class="list__item__link mb-2"
                    @click="gotoJobRead(jobRead.id)"
                    >{{ jobRead.title }}</p
                  >
                  <router-link
                    class="list__item__link--sub"
                    aria-current="page"
                    :to="`/products-list/company/${jobRead.companyId}`"
                    >{{ jobRead.company }}</router-link
                  >
                  <p class="list__item__time">{{ $filters.date(jobRead.time) }}</p>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isExist == false" class="cantFoundProduct">
      <h5>找不到產品</h5>
    </div>
  </div>
  <div class="sideBtnBox SideBtnBox--page">
    <UpTopBtn></UpTopBtn>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';

export default {
  inject: ['reload'],
  components: {
    UpTopBtn,
  },
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
      recentJobRead: [],
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
            console.log(this.jobItem);
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
          // console.log(this.jobsList);
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
            this.checkLocalJobRead(this.jobItem.id);
          }
        }
      });
      // console.log(this.temCompany);
      emitter.emit('spinner-close');
    },
    // 瀏覽紀錄相關方法
    // 取得瀏覽紀錄
    getLocalStorage() {
      const teMJobReadArray = JSON.parse(localStorage.getItem('recentJobRead'));
      if (teMJobReadArray) {
        this.recentJobRead = teMJobReadArray;
      }
    },
    // 檢查是否已經存在
    checkLocalJobRead(id) {
      this.getLocalStorage();
      const checkData = this.recentJobRead.some((item) => item.id === id);
      if (!checkData) {
        this.saveJobReadToLocal();
      }
    },
    // 存入local
    saveJobReadToLocal() {
      const Obj = {
        title: this.jobItem.title,
        company: this.jobItem.options.company.companyName,
        companyId: this.temCompany.id,
        id: this.jobItem.id,
        time: this.jobItem.options.job.create,
      };
      this.recentJobRead.push(Obj);
      const temData = JSON.stringify(this.recentJobRead);
      localStorage.setItem('recentJobRead', temData);
      console.log(localStorage.getItem('recentJobRead'));
    },
    // 跳轉紀錄的職位
    gotoJobRead(id) {
      this.$router.push(`/products-list/product/${id}`);
      this.reload();
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
