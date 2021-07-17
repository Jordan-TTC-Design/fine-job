<template>
  <NewProductModal ref="newProductModal" @new-item="newItem"></NewProductModal>
  <div class="admin__subHeader mb-6 box--shadow">
    <div class="container">
      <div class="admin__subNav">
        <li class="d-flex align-items-center">
          <h2 class="admin__subNav__title">訂單管理</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="changeSideHeader('add-company')"
          :class="{ active: orderCategorySelected === 'add-company' }"
        >
          <p class="admin__subNav__txt me-1">企業</p>
          <p class="admin__subNav__txt">{{ addCompanyOrders.length }}</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="changeSideHeader('add-job')"
          :class="{ active: orderCategorySelected === 'add-job' }"
        >
          <p class="admin__subNav__txt me-1">職位</p>
          <p class="admin__subNav__txt">{{ addJobOrders.length }}</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="changeSideHeader('系統')"
          :class="{ active: orderCategorySelected === '系統' }"
        >
          <p class="admin__subNav__txt">系統</p>
        </li>
      </div>
    </div>
  </div>
  <div class="container position-relative">
    <div class="row">
      <div class="col-4">
        <!-- 企業 -->
        <ul
          class="admin-sideList list-group box--shadow"
          v-if="orderCategorySelected === 'add-company'"
        >
          <li
            class="list-group-item d-flex justify-content-between align-items-center bg-white p-3"
          >
            <p class="subTxt">目前共 {{ addCompanyOrders.length }} 間公司</p>
            <button type="button" class="btn"><i class="bi bi-search"></i></button>
          </li>
          <li
            class="sideList__item list-group-item list-group-item-action"
            :class="{ active: item.id === temItem.id }"
            v-for="item in addCompanyOrders"
            :key="item.id"
            @click="selectItem(item.id)"
          >
            <p class="sideList__item__title mb-1">{{ item.user.options.company.companyName }}</p>
            <p class="sideList__item__subTxt">創建時間：{{ $filters.date(item.create_at) }}</p>
          </li>
        </ul>
        <!-- 職位 -->
        <ul
          class="admin-sideList list-group box--shadow"
          v-if="orderCategorySelected === 'add-job'"
        >
          <li
            class="list-group-item d-flex justify-content-between align-items-center bg-white p-3"
          >
            <p class="subTxt">目前共 {{ addJobOrders.length }} 個職位</p>
            <button type="button" class="btn"><i class="bi bi-search"></i></button>
          </li>
          <li
            class="sideList__item list-group-item list-group-item-action"
            :class="{ active: item.id === temItem.id }"
            v-for="item in addJobOrders"
            :key="item.id"
            @click="selectItem(item.id)"
          >
            <p class="sideList__item__title mb-1">{{ item.user.options.job.jobName }}</p>
            <p class="sideList__item__subTxt">創建時間：{{ $filters.date(item.create_at) }}</p>
          </li>
        </ul>
      </div>
      <div class="col-8">
        <!-- 企業 -->
        <div
          ref="adminSelectBox"
          class="adminSelectBox box--shadow"
          v-if="orderCategorySelected === 'add-company'"
        >
          <div class="selectBox__section">
            <div class="row">
              <div class="col-7">
                <h4 class="pageSubTitle mb-2">{{ temItem.user.options.company.companyName }}</h4>
                <p class="sideList__item__subTxt">
                  更新時間：{{ $filters.date(temItem.create_at) }}
                </p>
              </div>
              <div class="col-5">
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-outline-gray-line me-2">
                    <p class="text-dark">審核通過</p>
                  </button>
                  <button
                    type="button"
                    class="btn  btn-gray-light me-2"
                    data-action="newCompany"
                    :data-id="temItem.id"
                    @click="newItemModal($event)"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    class="btn  btn-gray-light"
                    data-action="deleteItem"
                    :data-id="temItem.id"
                    @click="deleteOrder(temItem.id)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="selectBox__section">
            <h4 class="pageSubTitle mb-2">訂單資料</h4>
            <ul>
              <li class="innerList__item">
                <p>編號：{{ temItem.id }}</p>
              </li>
              <li class="innerList__item">
                <p>企業來源：{{ temItem.user.options.company.companyName }}</p>
              </li>
              <li class="innerList__item">
                <p>聯絡人：{{ temItem.user.name }}</p>
              </li>
              <li class="innerList__item">
                <p>聯絡電話：{{ temItem.user.tel }}</p>
              </li>
              <li class="innerList__item">
                <p>聯絡Email：{{ temItem.user.email }}</p>
              </li>
              <li class="innerList__item">
                <p>企業剩餘額度：{{ temItem.user.options.jobToken }}</p>
              </li>
            </ul>
          </div>
          <div class="selectBox__section  position-relative">
            <button
              class="collectBtn btn btn-outline-gray-line position-absolute pageState"
              type="button"
            >
              <i class="jobIcon bi bi-bookmark-fill"></i>
            </button>
            <div class="d-flex">
              <div class="jobContent__imgBox company">
                <div class="logoImageBox company">
                  <img
                    class="logoImage"
                    :src="temItem.user.options.company.companyLogoUrl"
                    alt=""
                  />
                </div>
              </div>
              <div class="JobContent__txtBox d-flex flex-column justify-content-between pt-3">
                <h2 class="page__title mb-3">{{ temItem.user.options.company.companyName }}</h2>
                <div class="d-flex justify-content-between align-items-end">
                  <div>
                    <p class="page__txt mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                      >{{ temItem.user.options.company.companyAddressCity }}，{{
                        temItem.user.options.company.companyAddressDetail
                      }}
                    </p>
                    <p class="page__txt">
                      <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                      {{ temItem.user.options.company.industryCategory }}
                    </p>
                  </div>
                  <div>
                    <p class="subTxt text-secondary">
                      {{ $filters.date(temItem.create_at) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="selectBox__section">
            <h3 class="page__title--sub"><span class="title__icon"></span>公司照片</h3>
            <div class="d-flex justify-content-between">
              <img
                v-for="(item, index) in temItem.user.options.company.companyImagesUrl"
                class="companyPage__companyImage"
                :src="item"
                alt=""
                :key="index"
              />
            </div>
          </div>
          <div class="selectBox__section">
            <h3 class="page__title--sub"><span class="title__icon"></span>公司簡介</h3>
            <div class="page__txt" v-html="temItem.user.options.company.companyInfo"></div>
          </div>
        </div>
        <!-- 職位 -->
        <div
          ref="adminSelectBox"
          class="adminSelectBox box--shadow"
          v-if="orderCategorySelected === 'add-job'"
        >
          <div class="selectBox__section">
            <div class="row">
              <div class="col-7">
                <h4 class="pageSubTitle mb-2">{{ temItem.user.options.job.jobName }}</h4>
                <p class="sideList__item__subTxt">
                  更新時間：{{ $filters.date(temItem.create_at) }}
                </p>
              </div>
              <div class="col-5">
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-outline-gray-line me-2">
                    <p class="text-dark">審核通過</p>
                  </button>
                  <button
                    type="button"
                    class="btn  btn-gray-light me-2"
                    data-action="newJob"
                    :data-id="temItem.id"
                    @click="newItemModal($event)"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    class="btn  btn-gray-light"
                    data-action="deleteItem"
                    :data-id="temItem.id"
                    @click="deleteOrder(temItem.id)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="selectBox__section">
            <h4 class="pageSubTitle mb-2">訂單資料</h4>
            <ul>
              <li class="innerList__item">
                <p>編號：{{ temItem.id }}</p>
              </li>
              <li class="innerList__item">
                <p>企業來源：{{ temItem.user.options.company.companyName }}</p>
              </li>
              <li class="innerList__item">
                <p>聯絡人：{{ temItem.user.name }}</p>
              </li>
              <li class="innerList__item">
                <p>聯絡電話：{{ temItem.user.tel }}</p>
              </li>
              <li class="innerList__item">
                <p>聯絡Email：{{ temItem.user.email }}</p>
              </li>
              <li class="innerList__item">
                <p>企業剩餘額度：{{ temItem.user.options.company.companyJobToken }}</p>
              </li>
              <li class="innerList__item">
                <div
                  class="d-flex align-items-center"
                  v-if="!temItem.user.options.company.costToken"
                >
                  <p class="me-2">方案：免費方案</p>
                  <button type="button" class="btn btn-primary">立即付費推播，提高曝光度！</button>
                </div>

                <div
                  class="d-flex align-items-center"
                  v-if="temItem.user.options.company.costToken === 1"
                >
                  <p class="me-2">方案：付費方案</p>
                  <button type="button" class="btn btn-gray-light">
                    立即付費推播，提高曝光度！
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div class="selectBox__section">
            <button
              class="collectBtn btn btn-outline-gray-line position-absolute pageState"
              type="button"
            >
              <i class="jobIcon bi bi-bookmark-fill"></i>
            </button>
            <div class="d-flex">
              <div class="jobContent__imgBox">
                <img class="jobImage" :src="temItem.user.options.job.jobImageUrl" alt="" />
                <div class="logoImageBox">
                  <img
                    class="logoImage"
                    :src="temItem.user.options.company.companyLogoUrl"
                    alt=""
                  />
                </div>
              </div>
              <div class="JobContent__txtBox d-flex flex-column justify-content-between">
                <div class="pt-3">
                  <h2 class="page__title">{{ temItem.user.options.job.jobName }}</h2>
                  <p class="page__txt page__link subTxt  mb-4 d-block">
                    {{ temItem.user.options.company.companyName }}
                  </p>
                </div>
                <div class="d-flex justify-content-between align-items-end">
                  <div>
                    <p class="page__txt mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                      >{{ temItem.user.options.company.companyAddressCity }}
                    </p>
                    <p class="page__txt">
                      <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                        temItem.user.options.job.needPerson
                      }}
                    </p>
                  </div>
                  <div>
                    <p class="text-primary fw-bold mb-3">
                      {{ temItem.user.options.job.salary }}/月薪
                    </p>
                    <p class="subTxt text-secondary text-end">
                      {{ $filters.date(temItem.create_at) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="selectBox__section   mb-3">
            <h3 class="page__title--sub"><span class="title__icon"></span>職位內容</h3>
            <p class="page__txt mb-2">工作性質：{{ temItem.user.options.job.workType }}</p>
            <p class="page__txt mb-2">工作時間：{{ temItem.user.options.job.workTime }}</p>
            <p class="page__txt mb-2">
              產業類別：{{ temItem.user.options.company.industryCategory }}
            </p>
            <p class="page__txt mb-2">工作類別：{{ temItem.user.options.job.jobCategory }}</p>
            <p class="page__txt mb-2">工作內容：</p>
            <div class="page__txt" v-html="temItem.user.options.job.jobContent"></div>
          </div>
          <div class="selectBox__section  mb-3">
            <h3 class="page__title--sub"><span class="title__icon"> </span>應徵條件</h3>
            <p class="page__txt mb-2">學歷要求：{{ temItem.user.options.job.education }}</p>
            <p class="page__txt mb-2">工作經驗：{{ temItem.user.options.job.workExp }}</p>
            <p class="page__txt mb-2">其他條件：</p>
            <div class="page__txt" v-html="temItem.user.options.job.otherRequirement"></div>
          </div>
          <div class="selectBox__section">
            <h3 class="page__title--sub"><span class="title__icon"> </span>申請方法</h3>
            <p class="page__txt mb-2">職位聯絡人：{{ temItem.user.name }}</p>
            <p class="page__txt mb-2">聯絡信箱：{{ temItem.user.email }}</p>
            <p class="page__txt mb-2">聯絡電話：{{ temItem.user.tel }}</p>
            <p class="page__txt mb-2">申請備註：</p>
            <div class="page__txt" v-html="temItem.user.options.job.otherApplyInfo"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewProductModal from '@/components/admin/DashBoardNewProductModal.vue';
// import DeleteProductModal from '@/components/admin/DashBoardProductDeleteModal.vue';
import emitter from '@/components/helpers/emitter';
import webData from '@/components/helpers/webData';

export default {
  components: {
    NewProductModal,
    // DeleteProductModal,
  },
  data() {
    return {
      orders: [],
      pagination: {},
      pageNumber: 1,
      orderCategory: [
        { value: '新企業列表', action: 'add-company' },
        { value: '新職位列表', action: 'add-job' },
        { value: '新申請列表', action: 'apply-job' },
      ],
      orderCategorySelected: 'add-company',
      addCompanyOrders: [],
      addJobOrders: [],
      temItem: {
        user: {
          options: {
            company: {
              companyName: '',
            },
          },
        },
      },
      newOrder: {},
      temJob: {},
      modalName: '',
      tempImgUrl:
        'https://images.unsplash.com/photo-1622495506073-56b1152a010c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80Í',
    };
  },
  // computed: {
  //   filterOrder() {
  //     return this.orders.filter(
  //       (item) => item.user.options.formAction === this.orderCategorySelected,
  //     );
  //   },
  // },
  methods: {
    selectItem(id) {
      console.log(id);
      if (this.orderCategorySelected === 'add-job') {
        this.addJobOrders.forEach((item) => {
          if (item.id === id) {
            this.temItem = item;
          }
        });
      } else if (this.orderCategorySelected === 'add-company') {
        this.addCompanyOrders.forEach((item) => {
          if (item.id === id) {
            this.temItem = item;
          }
        });
      }
      // console.log(this.temItem);
      document.documentElement.scrollTop = 0;
    },
    changeSideHeader(dataName) {
      this.orderCategorySelected = dataName;
      if (this.orderCategorySelected === 'add-job') {
        this.selectItem(this.addJobOrders[0].id);
      } else if (this.orderCategorySelected === 'add-company') {
        this.selectItem(this.addCompanyOrders[0].id);
      }
    },
    classifyOrder() {
      const array = this.orders;

      array.forEach((item) => {
        if (item.user.options.formAction !== undefined) {
          if (item.user.options.formAction === 'add-company') {
            this.addCompanyOrders.push(item);
          } else if (item.user.options.formAction === 'add-job') {
            this.addJobOrders.push(item);
          }
        } else if (!item.user.options.formAction) {
          console.log('沒有formAction');
        }
      });
      if (this.pagination.has_next) {
        this.pageNumber += 1;
        this.getOrder(this.pageNumber);
      }
      // console.log(this.addCompanyOrders);
      // console.log(this.addJobOrders);
      this.selectItem(this.addCompanyOrders[0].id);
    },
    getOrder(pageNum = 1) {
      emitter.emit('spinner-open');
      this.pageNumber = pageNum;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${pageNum}`;
      this.$http
        .get(url)
        .then((res) => {
          emitter.emit('spinner-close');
          console.log(res.data);
          console.log(res.data.orders);
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.classifyOrder();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newItemModal(e) {
      const nowId = e.target.dataset.id;
      const nowAction = e.target.dataset.action;
      console.log(nowAction, nowId);
      if (nowAction === 'newCompany') {
        this.modalName = 'newCompany';
        this.newOrder = this.addCompanyOrders.filter((item) => item.id === nowId);
        console.log(this.newOrder);
        emitter.emit('open-new-modal', [this.newOrder, this.modalName]);
      } else if (nowAction === 'newJob') {
        this.modalName = 'newJob';
        this.newOrder = this.addJobOrders.filter((item) => item.id === nowId);
        console.log(this.newOrder);
        emitter.emit('open-new-modal', [this.newOrder, this.modalName]);
      }
    },
    newCompany(newCompanyItem) {
      console.log(newCompanyItem);
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      this.$http
        .post(url, newCompanyItem)
        .then((res) => {
          console.log(res.data);
          emitter.emit('spinner-close');
          // this.getOrder();
          if (res.data.success) {
            // this.deleteOrder();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newItem(temObj) {
      console.log(temObj);
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      this.$http
        .post(url, temObj)
        .then((res) => {
          console.log(res.data);
          // this.getOrder();
          if (res.data.success) {
            // this.deleteOrder(this.temItem[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      emitter.emit('spinner-close');
    },
    deleteOrder(id) {
      emitter.emit('spinner-open');
      // const { id } = this.temItem[0];
      console.log(id);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          console.log(res);
          this.getOrder();
          emitter.emit('spinner-close');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.addCompanyOrders = [];
    this.addJobOrders = [];
  },
  mounted() {
    this.getOrder();
    console.log(webData);
  },
};
</script>

<style lang="scss">
.listBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 12px;
  &__logo {
    width: 160px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    margin-right: 12px;
  }
}
</style>
