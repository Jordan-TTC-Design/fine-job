<template>
  <div class="adminPage--py">
    <div ref="adminSubHeader" class="admin__subHeader mb-6 box--shadow">
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
        <div class="col-lg-4 col-12" v-if="dataOk">
          <ul ref="adminSideList" class="admin-sideList list-group">
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
        <div class="col-lg-8 col-12" v-if="selectItem.id">
          <button
            type="button"
            class="applyBackBtn btn btn-light text-dark mt-6 mb-4 d-lg-none"
            @click="backToList"
          >
            <i class="bi bi-chevron-left me-2"></i>返回<span class="applyBackBtn__title ms-4">{{
              selectItem.title
            }}</span>
          </button>
          <ul ref="candidateList" class="candidateList">
            <template v-for="item in selectItem.applies" :key="item.id">
              <ApplicantCard :ref="`candidate--${item.id}`" :sent-select-item="item" />
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <PersonTagging />
  <SecondAskModal @delete-target="deleteApplication" />
</template>

<script>
import emitter from '@/methods/emitter';
import ApplicantCard from '@/components/admin/ApplicantCard.vue';
import PersonTagging from '@/components/admin/PersonTagging.vue';
import SecondAskModal from '@/components/helpers/SecondAskModal.vue';

export default {
  components: {
    ApplicantCard,
    PersonTagging,
    SecondAskModal,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      dataOk: false,
      orders: [],
      pagination: {},
      products: [],
      jobCategory: [],
      orderCategorySelected: 'apply-new',
      appliesList: [],
      jobsList: [],
      applyJobs: [],
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
    backToList() {
      this.selectItem = {};
      this.$refs.candidateList.classList.remove('checked');
      this.$refs.adminSideList.classList.remove('checked');
      this.$refs.adminSubHeader.classList.remove('checked');
    },
    selectListItem(id) {
      this.applyJobs.forEach((item) => {
        if (item.id === id) {
          this.selectItem = {};
          this.selectItem = JSON.parse(JSON.stringify(item));
          setTimeout(() => {
            this.$refs.candidateList.classList.add('checked');
            this.$refs.adminSideList.classList.add('checked');
            this.$refs.adminSubHeader.classList.add('checked');
          }, 100);
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
      if (this.fullWidth > 992) {
        [this.selectItem] = this.applyJobs;
      }
      emitter.emit('spinner-close');
    },
    // 退回申請
    deleteApplication(id) {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      this.$http
        .delete(url)
        .then(() => {
          this.clearList();
          this.getOrder();
          emitter.emit('alertMessage-open', '刪除成功！');
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    clearList() {
      this.orders = [];
      this.jobsList = [];
      this.applyJobs = [];
      this.appliesList = [];
    },
  },
  created() {
    this.clearList();
  },
  mounted() {
    this.getOrder();
    emitter.emit('spinner-open-bg', 2000);
    const vm = this;
    vm.fullWidth = window.innerWidth;
    vm.fullHeight = window.innerHeight;
    window.onresize = () => {
      vm.fullWidth = window.innerWidth;
      vm.fullHeight = window.innerHeight;
    };
  },
};
</script>

<style lang="scss"></style>
