<template>
  <div class="container-fuild">
    <div class="container jobPage">
      <div class="row">
        <div class="col-md-9">
          <div class="jobContentBox box--shadow mb-3">
            <div class="d-flex">
              <div class="jobContent__imgBox">
                <img class="jobImage" :src="jobItem.imageUrl" alt="" />
                <div class="logoImageBox">
                  <img class="logoImage" :src="jobItem.options.company.companyLogoUrl" alt="" />
                </div>
              </div>
              <div class="JobContent__txtBox">
                <div class="mb-3">
                  <h2 class="page__title">{{ jobItem.title }}</h2>
                  <p class="page__txt page__link">{{ jobItem.options.company.companyName }}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <div>
                    <p class="page__txt mb-2">
                      <span></span>{{ jobItem.options.company.companyAddressCity }}
                    </p>
                    <p class="page__txt"><span></span>需求人數：{{ jobItem.num }}</p>
                  </div>
                  <div>
                    <p>{{ jobItem.price }}/月薪</p>
                    <p>{{ $filters.date(jobItem.options.job.create) }}</p>
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
    <div v-if="isExist" class="productPage-container">
      <p>{{ jobItem.title }}</p>
    </div>
    <div v-else-if="isExist == false" class="cantFoundProduct">
      <h5>找不到產品</h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobItem: {
        options: {
          company: {
            companyImagesUrl: [],
          },
          job: {},
        },
      },
      isExist: null,
    };
  },
  methods: {
    getProductData() {
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
          } else {
            this.isExist = false;
          }
          //   console.log(this.isExist);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    // console.log(this.$route.params.id);
    this.getProductData();
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
