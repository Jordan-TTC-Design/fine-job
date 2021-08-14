<template>
  <div class="adminPage--py">
    <div class="admin__subHeader mb-6 box--shadow">
      <div class="container">
        <div class="admin__subNav">
          <li class="d-flex align-items-center">
            <h2 class="admin__subNav__title">應徵管理</h2>
          </li>
          <li
            class="admin__subNav__item"
            @click="changeSideHeader('apply-new')"
            :class="{ active: orderCategorySelected === 'apply-new' }"
          >
            <p class="admin__subNav__txt me-1">新應徵</p>
            <p class="admin__subNav__txt">{{ appliesList.length }}</p>
          </li>
        </div>
      </div>
    </div>
    <div class="container position-relative">
      <div class="row">
        <div class="col-4" v-if="dataOk">
          <ul class="admin-sideList list-group">
            <li
              class="border-bottom border-gray-line
              list-group-item d-flex justify-content-between align-items-center bg-white p-3"
            >
              <p class="subTxt">
                全部發布中職位
              </p>
            </li>
            <li
              :ref="`sideListOrders-${item.id}`"
              :class="{ active: item.id === selectItem.id }"
              class="sideList__item list-group-item list-group-item-action"
              v-for="item in applyJobs"
              :key="item.id"
              @click="selectListItem(item.id)"
            >
              <p class="sideList__item__title mb-1">
                {{ item.title }}
              </p>
              <p class="sideList__item__subTxt">申請人數：{{ item.applies.length }}</p>
            </li>
          </ul>
        </div>
        <div class="col-8" v-if="dataOk">
          <ul class="candidateList">
            <template v-for="item in selectItem.applies" :key="item.id">
              <ApplicantCard :ref="`candidate--${item.id}`" :sent-select-item="item" />
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <PersonTagging />
</template>

<script>
import emitter from '@/methods/emitter';
import ApplicantCard from '@/components/admin/ApplicantCard.vue';
import PersonTagging from '@/components/admin/PersonTagging.vue';

export default {
  components: {
    ApplicantCard,
    PersonTagging,
  },
  data() {
    return {
      dataOk: false,
      orders: [],
      pagination: {},
      products: [],
      jobCategory: [],
      orderCategorySelected: 'apply-new',
      appliesList: [],
      jobsList: [],
      applyJobs: [],
      appliesListAllowList: [],
      selectItem: {
        title: '',
        id: '',
        applies: [],
        otherData: {},
      },
      newOrder: {},
      modalName: '',
      pageNumber: 1,
      tempImgUrl:
        'https://images.unsplash.com/photo-1622495506073-56b1152a010c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80Í',
    };
  },
  methods: {
    selectListItem(id) {
      this.applyJobs.forEach((item) => {
        if (item.id === id) {
          this.selectItem = item;
        }
      });
      document.documentElement.scrollTop = 0;
    },
    classifyOrder() {
      const array = this.orders;
      array.forEach((item) => {
        if (item.user.options.pageAction !== undefined) {
          if (item.user.options.pageAction === 'apply-job') {
            this.appliesList.push(item);
          }
        }
      });
      if (this.pagination.has_next) {
        this.pageNumber += 1;
        this.getOrder(this.pageNumber);
      } else if (!this.pagination.has_next) {
        this.dataOk = true;
        this.getOgData();
        emitter.emit('spinner-close');
      }
    },
    getOrder(pageNum = 1) {
      emitter.emit('spinner-open');
      this.pageNumber = pageNum;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${pageNum}`;
      this.$http
        .get(url)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.classifyOrder();
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 取的全部資料
    getOgData() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.classifyJob();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 從資料中抓出職位
    classifyJob() {
      emitter.emit('spinner-open');
      this.products.forEach((item) => {
        if (item.description === '職位') {
          const Obj = item;
          this.jobsList.push(Obj);
        }
      });
      this.processJobsList();
      emitter.emit('spinner-close');
    },
    // 處理職位資料欄位
    processJobsList() {
      emitter.emit('spinner-open');
      const jobArray = new Set();
      this.jobsList.forEach((item) => {
        const obj = {
          title: item.title,
          id: item.id,
          applies: [],
          otherData: item,
        };
        jobArray.add(obj);
      });
      this.jobInfoList = jobArray;
      this.classifyApplyJobList();
      emitter.emit('spinner-close');
    },
    // 最後步驟是分類申請者至對應職位
    classifyApplyJobList() {
      emitter.emit('spinner-open');
      this.appliesList.forEach((item) => {
        this.jobInfoList.forEach((job) => {
          if (job.id === item.user.options.appliedJob) {
            job.applies.push(item);
          }
        });
      });
      this.jobInfoList.forEach((item) => {
        if (item.applies.length > 0) {
          this.applyJobs.push(item);
        }
      });
      [this.selectItem] = this.applyJobs;
      emitter.emit('spinner-close');
    },
    clearList() {
      this.applyJobs = [];
    },
  },
  created() {
    this.clearList();
  },
  mounted() {
    this.getOrder();
    emitter.emit('spinner-open-bg', 2000);
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
