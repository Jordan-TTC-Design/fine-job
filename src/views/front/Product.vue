<template>
  <div class="page--py">
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
              <div class="d-flex flex-lg-row flex-column">
                <div class="jobInfoBox__imgBox mb-md-0 mb-4">
                  <img
                    class="jobImg putPointer"
                    :src="jobItem.imageUrl"
                    :alt="`${jobItem.title}職位圖片`"
                    @click="openImgModal(jobItem.imageUrl)"
                  />
                  <div class="jobInfoBox__logoImgBox">
                    <img
                      class="logoImg"
                      :src="jobItem.options.company.companyLogoUrl"
                      :alt="`${jobItem.options.company.companyName}logo`"
                    />
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
                      <p class="mb-3">
                        <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                        >{{ jobItem.options.company.companyAddressCity }}
                      </p>
                      <p>
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
                      <p
                        class="text-primary fw-bold mb-3"
                        v-if="jobItem.options.job.salaryInterView"
                      >
                        薪資面議
                      </p>
                      <p class="subTxt text-secondary text-end">
                        {{ $filters.date(jobItem.options.job.create) }}
                      </p>
                    </div>
                  </div>
                </div>
                <router-link
                  class="btn btn-lg btn-primary w-100 pe-auto d-lg-none d-block mb-3"
                  aria-current="page"
                  :to="`/apply-job/${jobItem.id}`"
                  >申請職位</router-link
                >
                <button class="btn btn-lg btn-gray-light w-100 pe-auto d-lg-none d-block">
                  收藏職位
                </button>
              </div>
            </div>
            <div class="jobContentSection  box--shadow  mb-3">
              <h3 class="section__title--sub"><span class="title__icon"></span>職位內容</h3>
              <p class="mb-2">
                <i class="jobIcon--sm me-1 bi bi-journal"></i>工作性質：{{
                  jobItem.options.job.workType
                }}
              </p>
              <p class="mb-2">
                <i class="jobIcon--sm me-1 bi bi-clock"></i>工作時間：{{
                  jobItem.options.job.workTime
                }}
              </p>
              <p class="mb-2">
                <i class="jobIcon--sm me-1 bi bi-building"></i>產業類別：{{
                  jobItem.options.company.industryCategory
                }}
              </p>
              <p class="mb-2">
                <i class="jobIcon--sm me-1 bi bi-card-list"></i>工作類別：{{ jobItem.category }}
              </p>
              <p class="mb-2">工作內容：</p>
              <div v-html="jobItem.content"></div>
            </div>
            <div class="jobContentSection box--shadow  mb-3">
              <h3 class="section__title--sub"><span class="title__icon"></span>應徵條件</h3>
              <p class="mb-2">
                <i class="jobIcon--sm me-1 bi bi-book"> </i>學歷要求：{{
                  jobItem.options.job.education
                }}
              </p>
              <p class="mb-2">
                <i class="jobIcon--sm me-1 bi bi-briefcase"></i>工作經驗：{{
                  jobItem.options.job.workExp
                }}
              </p>
              <p class="mb-2">其他條件：</p>
              <div v-html="jobItem.options.job.otherRequirement"></div>
            </div>
            <div class="jobContentSection box--shadow mb-lg-0 mb-3">
              <h3 class="section__title--sub"><span class="title__icon"></span>申請方法</h3>
              <p class="mb-2">
                <i class="jobIcon--sm me-1 bi bi-person"></i>職位聯絡人：{{
                  jobItem.options.company.companyContact
                }}
              </p>
              <p class="mb-2">
                <i class="jobIcon--sm me-1 bi bi-envelope"></i>聯絡信箱：{{
                  jobItem.options.company.companyEmail
                }}
              </p>
              <p class="mb-2">
                <i class="jobIcon--sm me-1 bi bi-phone"></i>聯絡電話：{{
                  jobItem.options.company.companyTel
                }}
              </p>
              <p class="mb-2">申請備註：</p>
              <div v-html="jobItem.options.job.otherApplyInfo"></div>
            </div>
          </div>
          <div class="col-lg-3 col-12">
            <div class="jobSubBox  box--shadow mb-lg-3 p-3 d-lg-block d-none">
              <img class="applyImg" src="https://i.imgur.com/2MEGlKs.png" alt="">
              <router-link
                class="btn btn-lg btn-primary w-100"
                aria-current="page"
                :to="`/apply-job/${jobItem.id}`"
                >申請職位</router-link
              >
            </div>
            <div
              v-if="jobItem.options.company.companyImagesUrl.length > 0"
              class="jobSubBox jobPage__companyImage box--shadow  mb-3"
            >
              <h5 class="jobSubBox__title">公司照片</h5>
              <div class="companyImgBox">
                <img
                  class="mb-2 putPointer"
                  :src="jobItem.options.company.companyImagesUrl[0]"
                  :alt="jobItem.options.company.companyName + '公司圖片一'"
                  @click="openImgModal(jobItem.options.company.companyImagesUrl)"
                />
                <div class="d-flex justify-content-between">
                  <img
                    v-if="jobItem.options.company.companyImagesUrl.length > 0"
                    class="companyImage--sub putPointer"
                    :src="jobItem.options.company.companyImagesUrl[1]"
                    :alt="jobItem.options.company.companyName + '公司圖片二'"
                    @click="openImgModal(jobItem.options.company.companyImagesUrl)"
                  />
                  <img
                    v-if="jobItem.options.company.companyImagesUrl.length > 1"
                    :src="jobItem.options.company.companyImagesUrl[2]"
                    :alt="jobItem.options.company.companyName + '公司圖片三'"
                    class="companyImage--sub putPointer"
                    @click="openImgModal(jobItem.options.company.companyImagesUrl)"
                  />
                </div>
              </div>
            </div>
            <JobReadRecord />
          </div>
        </div>
      </div>
      <div v-else-if="isExist == false" class="cantFoundProduct">
        <h5>找不到產品</h5>
      </div>
    </div>
  </div>

  <div class="sideBtnBox SideBtnBox--page">
    <UpTopBtn />
  </div>
  <ImgPopModal />
</template>

<script>
import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import ImgPopModal from '@/components/helpers/ImgPopModal.vue';
import JobReadRecord from '@/components/front/JobReadRecord.vue';

export default {
  inject: ['reload'],
  components: {
    UpTopBtn,
    ImgPopModal,
    JobReadRecord,
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
    openImgModal(imgUrl) {
      emitter.emit('imgPopModal-open', imgUrl);
    },
    getProductData() {
      emitter.emit('spinner-open');
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.isExist = true;
            this.jobItem = res.data.product;
            this.getAllJobs();
          } else {
            this.isExist = false;
          }
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
          this.jobsList = res.data.products;
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
          if (item.title === this.jobItem.options.company.companyName) {
            this.temCompany = item;
          }
        }
      });
      emitter.emit('spinner-close');
      const sendObj = {
        job: this.jobItem,
        company: this.temCompany,
      };
      emitter.emit('check-job-read-local', sendObj);
    },
  },
  created() {
    this.getProductData();
    emitter.emit('spinner-open-bg', 500);
  },
};
</script>

<style lang="scss"></style>
