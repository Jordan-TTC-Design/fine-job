<template>
  <NewProductModal ref="newProductModal" @new-item="newItem"></NewProductModal>
  <div class="container-fuild">
    <div class="container">
      <h3 class="text-center mb-4">全部企業創建訂單列表</h3>
      <ul class="d-flex btn-group">
        <li v-for="(item, index) in orderCategory" :key="index">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click.prevent="orderCategorySelected = item.action"
          >
            {{ item.value }}
          </button>
        </li>
      </ul>
      <ul class="row" v-if="orderCategorySelected === 'add-company'">
        <li class="col-12" v-for="(item, index) in addCompanyOrders" :key="item.id">
          <div class="listBox row">
            <div class="col-6 d-flex align-items-center">
              <img class="listBox__logo" :src="item.user.options.company.companyLogoUrl" alt="" />
              <p>{{ index + 1 }} {{ item.user.options.company.companyName }}{{ item.id }}</p>
            </div>

            <div class="input-group d-flex justify-content-end col-6 w-auto">
              <p class="me-4">{{ $filters.date(item.create_at) }}</p>
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-action="newCompany"
                :data-id="item.id"
                @click="newItemModal($event)"
              >
                創建
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-action="deleteItem"
                :data-id="item.id"
                @click="deleteOrder(item.id)"
              >
                刪除
              </button>
            </div>
          </div>
        </li>
      </ul>
      <ul class="row" v-if="orderCategorySelected === 'add-job'">
        <li class="col-12" v-for="(item, index) in addJobOrders" :key="index">
          <div class="listBox row">
            <div class="col-6 d-flex align-items-center">
              <img
                class="listBox__logo"
                :src="item.user.options.job.jobImageUrl || tempImgUrl"
                alt=""
              />
              <p>{{ index + 1 }} {{ item.user.options.job.jobName }}{{ item.id }}</p>
            </div>

            <div class="input-group d-flex justify-content-end col-6 w-auto">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-action="newJob"
                :data-id="item.id"
                @click="newItemModal($event)"
              >
                創建
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-action="deleteItem"
                :data-id="item.id"
                @click="deleteOrder(item.id)"
              >
                刪除
              </button>
            </div>
          </div>
        </li>
      </ul>
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
      orderCategory: [
        { value: '新企業列表', action: 'add-company' },
        { value: '新職位列表', action: 'add-job' },
        { value: '新申請列表', action: 'apply-job' },
      ],
      orderCategorySelected: 'add-company',
      addCompanyOrders: [],
      addJobOrders: [],
      temItem: {},
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
    classifyOrder() {
      const array = this.orders;
      this.addCompanyOrders = [];
      this.addJobOrders = [];
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
      console.log(this.addCompanyOrders);
      console.log(this.addJobOrders);
    },
    getOrder(pageNum = 1) {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${pageNum}`;
      this.$http
        .get(url)
        .then((res) => {
          emitter.emit('spinner-close');
          console.log(res.data);
          console.log(res.data.orders);
          this.orders = res.data.orders;
          // this.pagination = res.data.pagination;
          this.addCompanyOrders = [];
          this.addjobOrders = [];
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
  created() {},
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
