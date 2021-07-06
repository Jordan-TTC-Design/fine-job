<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="jobListBox">
          <ul class="jobList" v-for="item in jobsList" :key="item.id">
            <li
              type="button"
              @click="selectJob(item.id)"
              :data-id="item.id"
              class="jobList__item d-flex box--shadow flex-column align-items-start"
            >
              <button class="collectBtn btn btn-outline-gray-line position-absolute" type="button">
                <i class="jobIcon bi bi-bookmark-fill"></i>
              </button>
              <div class="mb-3">
                <p class="jobTag">
                  {{ item.category }}
                </p>
              </div>
              <div class="d-flex">
                <div class="jobList__item__imgBox">
                  <img class="jobImage" :src="item.imageUrl" alt="" />
                  <div class="logoImageBox">
                    <img class="logoImage" :src="item.options.company.companyLogoUrl" alt="" />
                  </div>
                </div>
                <div
                  class="jobList__item__txtBox
                  flex-grow-1 d-flex flex-column
                  justify-content-between"
                >
                  <div class="mb-3 d-flex flex-column align-items-start">
                    <router-link
                      class="jobList__item__title text-dark mb-3 me-7"
                      type="button"
                      :to="`/products-list/product/${item.id}`"
                      >{{ item.title }}</router-link
                    >
                    <router-link
                      class="page__txt page__link subTxt  mb-2 me-7"
                      type="button"
                      :to="`/products-list/company/${item.options.company.companyLink}`"
                      >{{ item.options.company.companyName }}</router-link
                    >
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="text-primary">{{ item.price }} / 月薪</p>
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
      <div class="col-md-6">
        <div class="jobSelectBox box--shadow ">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="mb-3">
              <p class="jobTag">
                {{ jobItem.category }}
              </p>
            </div>
            <div class="d-flex">
              <router-link
                class="btn btn-outline-gray-line btn-bg text-dark d-flex align-items-center me-2"
                type="button"
                :to="`/products-list/product/${jobItem.id}`"
                >開新頁面</router-link
              >
              <button class="collectBtn btn btn-outline-gray-line" type="button">
                <i class="jobIcon bi bi-bookmark-fill"></i>
              </button>
            </div>
          </div>
          <div class="pb-5 border-bottom border-gray-line">
            <div class="d-flex mb-3">
              <div class="jobContent__imgBox">
                <img class="jobImage" :src="jobItem.imageUrl" alt="" />
                <div class="logoImageBox">
                  <img class="logoImage" :src="jobItem.options.company.companyLogoUrl" alt="" />
                </div>
              </div>
              <div class="JobContent__txtBox">
                <div>
                  <router-link class="jobSelectBox__title mb-3 d-block"
                  type="button"
                      :to="`/products-list/product/${jobItem.id}`"
                      >{{ jobItem.title }}</router-link>
                  <router-link
                      class="page__txt page__link subTxt  mb-4 d-block"
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
                    <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                      jobItem.num
                    }}
                  </p>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p class="text-primary fw-bold">{{ jobItem.price }}/月薪</p>
              <div class="d-flex align-items-center ">
                <p class="subTxt text-secondary me-2">
                  {{ $filters.date(jobItem.options.job.create) }}
                </p>
                <router-link
                  class="btn--applyJob btn btn-primary btn-bg d-flex align-items-center me-2"
                  type="button"
                  :to="`/apply-job`"
                  >申請</router-link
                >
              </div>
            </div>
          </div>
          <div class="py-5 border-bottom border-gray-line">
            <h3 class="page__title--sub"><span class="title__icon"></span>職位內容</h3>
            <p class="page__txt mb-3">工作性質：{{ jobItem.options.job.workType }}</p>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-clock"></i></span>工作時間：{{
                jobItem.options.job.workTime
              }}
            </p>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>產業類別：{{
                jobItem.options.company.industryCategory
              }}
            </p>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-card-list"></i></span>工作類別：{{
                jobItem.category
              }}
            </p>
            <p class="page__txt mb-3">工作內容：</p>
            <p class="page__txt">{{ jobItem.content }}</p>
          </div>
          <div class="py-5 border-bottom border-gray-line">
            <h3 class="page__title--sub"><span class="title__icon"> </span>應徵條件</h3>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-book"></i></span>學歷要求：{{
                jobItem.options.job.education
              }}
            </p>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-briefcase"></i></span>工作經驗：{{
                jobItem.options.job.workExp
              }}
            </p>
            <p class="page__txt mb-3">其他條件：</p>
            <p class="page__txt">{{ jobItem.options.job.otherRequirement }}</p>
          </div>
          <div class="pt-5">
            <h3 class="page__title--sub"><span class="title__icon"> </span>申請方法</h3>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-person"></i></span>職位聯絡人：{{
                jobItem.options.company.companyContact
              }}
            </p>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-envelope"></i></span>聯絡信箱：{{
                jobItem.options.company.companyEmail
              }}
            </p>
            <p class="page__txt mb-3">
              <span><i class="jobIcon--sm me-1 bi bi-phone"></i></span>聯絡電話：{{
                jobItem.options.company.companyTel
              }}
            </p>
            <p class="page__txt mb-3">申請備註：</p>
            <p class="page__txt">
              • 有意者請透過系統寄送應徵履歷，合者約談，不適任者恕不另行通知，謝謝。 • 請附上cover
              letter 、 CV/Resume 以及作品集。 • 需自備電腦。
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="productList">
      <table class="table table-striped">
        <tbody>
          <template v-for="product in products" :key="product.id">
            <tr>
              <th scope="row">
                <img
                  v-if="product.imageUrl"
                  :src="product.imageUrl"
                  :alt="product.title"
                  style="height: 40px"
                />
                <p v-else>圖片丟失</p>
              </th>
              <td>
                {{ product.title }}
              </td>
              <td>{{ product.origin_price }}/{{ product.price }}</td>
              <td>
                <div class="btn-group" role="group">
                  <router-link
                    type="button"
                    class="btn btn-outline-secondary"
                    :to="`/products-list/product/${product.id}`"
                  >
                    查看詳細資訊
                  </router-link>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addCart(product.id)"
                  >
                    加入購物車
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div> -->
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';

export default {
  data() {
    return {
      products: [],
      jobsList: [],
      companiesList: [],
      //   pagination: {},
      jobItem: {
        options: {
          company: {
            companyImagesUrl: [],
          },
          job: {},
        },
      },
    };
  },
  methods: {
    selectJob(id) {
      console.log(id);
      this.jobsList.forEach((item) => {
        if (item.id === id) {
          this.jobItem = { ...item };
        }
      });
      console.log(this.jobItem);
    },
    classifyJob() {
      this.products.forEach((item) => {
        if (item.description === '職位') {
          const Obj = item;
          this.companiesList.forEach((temCompany) => {
            if (Obj.options.company.companyName === temCompany.title) {
              console.log(temCompany.id);
              Obj.options.company.companyLink = temCompany.id;
            }
          });
          this.jobsList.push(Obj);
        }
      });
      console.log(this.jobsList);
      this.selectJob(this.jobsList[0].id);
    },
    classifyCompany() {
      this.products.forEach((item) => {
        if (item.description === '企業') {
          this.companiesList.push(item);
        }
      });
      console.log(this.companiesList);
      this.classifyJob();
    },
    cleanList() {
      this.jobsList = [];
      this.companiesList = [];
    },
    getProductsData() {
      this.cleanList();
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          //   console.log(res);
          this.products = res.data.products;
          emitter.emit('spinner-close');
          this.classifyCompany();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addCart(id, qty = 1) {
      // console.log(qty);
      const product = { data: { product_id: id, qty } };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, product)
        .then((res) => {
          console.log(`${res.data.message}:${id}`);
          emitter.emit('get-cart');
          // this.$refs.productModal.modal.hide();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getProductsData();
    // console.log(process.env.VUE_APP_API);
    // console.log(process.env.VUE_APP_PATH);
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
