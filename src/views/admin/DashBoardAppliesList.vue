<template>
  <NewProductModal ref="newProductModal" @new-item="newItem"/>
  <div class="admin__subHeader mb-6 box--shadow">
    <div class="container">
      <div class="admin__subNav">
        <li class="d-flex align-items-center">
          <h2 class="admin__subNav__title">應徵管理</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="changeSideHeader('apply-new')"
          :class="{ active: applyListCategory === 'apply-new' }"
        >
          <p class="admin__subNav__txt me-1">新應徵</p>
          <p class="admin__subNav__txt">{{ appliesListList.length }}</p>
        </li>
        <li class="admin__subNav__item">
          <p class="admin__subNav__txt me-1">已同意應徵</p>
          <p class="admin__subNav__txt">{{ appliesListAllowList.length }}</p>
        </li>
      </div>
    </div>
  </div>
  <div class="container position-relative">
    <div class="row">
      <div class="col-4">
        <!-- 職位 -->
        <ul class="admin-sideList list-group box--shadow" v-if="applyListCategory === 'apply-new'">
          <li
            class="list-group-item d-flex justify-content-between align-items-center bg-white p-3"
          >
            <p class="subTxt">全部發布中職位</p>
            <button type="button" class="btn"><i class="bi bi-search"></i></button>
          </li>
          <template v-for="item in applyJobs" :key="item.id">
            <li
              class="sideList__item list-group-item list-group-item-action"
              @click="selectItem(item.id)"
            >
              <p class="sideList__item__title mb-1">{{ item.title }}</p>
              <p class="sideList__item__subTxt">申請人數：{{ item.applies.length }}</p>
            </li>
          </template>
        </ul>
      </div>
      <div class="col-8">
        <ul class="candidateList ">
          <template v-for="item in temItem.applies" :key="item.id">
            <li class="candidateList__person box--shadow">
              <div class="d-flex justify-content-between align-items-end">
                <div class="d-flex">
                  <img
                    class="person__personalImg me-3"
                    :src="item.user.options.personalImg"
                    :alt="`${item.user.name}個人求職照片`"
                  />
                  <div>
                    <p class="person__name">{{ item.user.name }}</p>
                    <p class="person__txt">目前職位：{{ item.user.options.nowJobName }}</p>
                    <p class="person__txt">學歷：{{ item.user.options.education ||'大學' }} </p>
                    <p class="person__txt">工作經驗：{{ item.user.options.workExp ||'無工作經驗'}} </p>
                    <p class="person__txt">聯絡電話：{{ item.user.tel }}</p>
                    <p class="person__txt">聯絡Email：{{ item.user.email }}</p>
                  </div>
                </div>
                <a
                  type="button"
                  class="btn btn-outline-primary  text-decoration-underline"
                  :href="item.user.options.cvLink"
                  target="_blank"
                  >打開履歷</a
                >
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import NewProductModal from '@/components/admin/DashBoardNewProductModal.vue';

export default {
  components: {
    NewProductModal,
  },
  data() {
    return {
      orders: [],
      pagination: {},
      products: [],
      FormData: {},
      jobCategory: [],
      applyListCategory: 'apply-new',
      appliesListList: [],
      jobsList: [],
      applyJobs: [],
      appliesListAllowList: [],
      temItem: {
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
    selectItem(id) {
      if (this.applyListCategory === 'apply-new') {
        this.applyJobs.forEach((item) => {
          if (item.id === id) {
            this.temItem = item;
          }
        });
      }
      console.log(this.temItem);
      document.documentElement.scrollTop = 0;
    },
    changeSideHeader(dataName) {
      this.applyListCategory = dataName;
      if (this.applyListCategory === 'apply-new') {
        this.selectItem(this.addJobOrders[0].id);
      }
    },
    classifyOrder() {
      const array = this.orders;
      array.forEach((item) => {
        if (item.user.options.pageAction !== undefined) {
          if (item.user.options.pageAction === 'apply-job') {
            this.appliesListList.push(item);
          }
        }
      });
      if (this.pagination.has_next) {
        this.pageNumber += 1;
        this.getOrder(this.pageNumber);
      } else {
        this.getProductsData();
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
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    newItem(temObj) {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      this.$http
        .post(url, temObj)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            // this.deleteOrder(this.temItem[0]);
          }
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
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
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    getProductsData() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          emitter.emit('spinner-close');
          this.classifyJob();
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    classifyJob() {
      this.products.forEach((item) => {
        if (item.description === '職位') {
          const Obj = item;
          this.jobsList.push(Obj);
        }
      });
      this.getJobCategory();
    },
    getJobCategory() {
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
      this.jobCategory = jobArray;
      this.classifyApplyJobsList();
    },
    classifyApplyJobsList() {
      this.appliesListList.forEach((item) => {
        this.jobCategory.forEach((job) => {
          if (job.id === item.user.options.appliedJob) {
            job.applies.push(item);
          }
        });
      });
      this.jobCategory.forEach((item) => {
        if (item.applies.length > 0) {
          this.applyJobs.push(item);
        }
      });
      [this.temItem] = this.applyJobs;
    },
  },
  created() {
    this.FormData = webData;
  },
  mounted() {
    this.getOrder();
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
