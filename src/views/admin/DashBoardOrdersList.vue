<template>
  <NewCompanyModal
    ref="NewCompanyModal"
    :tem-item="temItem"
    @new-company="newCompany"
  ></NewCompanyModal>
  <!-- <DeleteProductModal
    ref="DeleteProductModal"
    :tem-product="temProduct"
    v-on:deltetProduct="deleteProduct"
  ></DeleteProductModal> -->
  <div class="container-fuild">
    <div class="container">
      <h3 class="text-center mb-4">全部企業創建訂單列表</h3>

      <ul class="row" v-for="(item, index) in addCompanysOrders" :key="item.id">
        <li class="col-12">
          <div class="listBox row">
            <div class="col-6 d-flex align-items-center">
              <img class="listBox__logo" :src="item.user.options.company.companyLogoUrl" alt="" />
              <p>{{ index + 1 }} {{ item.user.options.company.companyName }}{{ item.id }}</p>
            </div>

            <div class="input-group d-flex justify-content-end col-6 w-auto">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-action="newItem"
                :data-id="item.id"
                @click="checkCompany($event)"
              >
                創建
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-action="deleteItem"
                :data-id="item.id"
              >
                刪除
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="150">是否啟用</th>
          <th width="120">刪除</th>
        </tr>
      </thead>

      <!-- <tbody id="productList">
        <tr
          v-is="'OrderCard'"
          v-for="order in orders"
          v-on:change-product-state="changeProductState"
          v-on:open-modal="openModal"
          :key="order.id"
          :item="product"
        ></tr>
      </tbody> -->
    </table>
    <p>
      <!-- 目前有 <span id="productCount">{{ orders.length }}</span> 項產品 -->
    </p>
  </div>
  <!-- <ProductModal ref="ProductModal" :tem-product="temProduct"></ProductModal>
  <DeleteProductModal
    ref="DeleteProductModal"
    :tem-product="temProduct"
    v-on:deltetProduct="deleteProduct"
  ></DeleteProductModal> -->
</template>

<script>
// import OrderCard from '@/components/admin/DashBoardOrderCard.vue';
import NewCompanyModal from '@/components/admin/DashBoardNewCompanyModal.vue';
// import DeleteProductModal from '@/components/admin/DashBoardProductDeleteModal.vue';
import emitter from '@/components/helpers/emitter';
import webData from '@/components/helpers/webData';

export default {
  components: {
    NewCompanyModal,
    // OrderCard,
    // DeleteProductModal,
  },
  data() {
    return {
      orders: [],
      pagination: {},
      addCompanysOrders: [],
      temItem: {},
    };
  },
  methods: {
    classifyOrder() {
      const array = this.orders;
      this.addCompanysOrders = [];
      array.forEach((item) => {
        if (item.user.options.formAction !== undefined) {
          // console.log(item);
          if (item.user.options.formAction === 'add-company') {
            this.addCompanysOrders.push(item);
          }
        } else if (!item.user.options.formAction) {
          console.log('沒有formAction');
        }
      });
      console.log(this.addCompanysOrders);
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
          this.classifyOrder();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkCompany(e) {
      const nowId = e.target.dataset.id;
      // const nowAction = e.target.dataset.action;
      this.temItem = this.addCompanysOrders.filter((item) => item.id === nowId);
      emitter.emit('open-new-company');
    },
    newCompany(newCompanyitem) {
      console.log(newCompanyitem);
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      this.$http
        .post(url, newCompanyitem)
        .then((res) => {
          console.log(res.data);
          emitter.emit('spinner-close');
          // this.getOrder();
          if (res.data.success) {
            this.deleteOrder();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteOrder() {
      emitter.emit('spinner-open');
      const { id } = this.temItem[0];
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
