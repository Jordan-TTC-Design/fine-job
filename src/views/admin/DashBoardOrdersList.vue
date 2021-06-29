<template>
    <div class="container-fuild">
    全部訂單列表
    <div class="text-end mt-4">
      <button class="btn btn-primary" data-action="newProduct" >
        建立新的產品
      </button>
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
      <tbody id="productList">
        <!-- <tr
          v-is="'ProductCard'"
          v-for="product in orders"
          v-on:change-product-state="changeProductState"
          v-on:open-modal="openModal"
          :key="product.id"
          :item="product"
        ></tr> -->
      </tbody>
    </table>
    <p>
      <!-- 目前有 <span id="productCount">{{ orders.length }}</span> 項產品 -->
    </p>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
    };
  },
  methods: {
    getOrder(pageNum = 1) {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${pageNum}`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res.data);
          console.log(res.data.orders);
          //   this.orders = res.data.products;
          this.pagination = res.data.pagination;
          emitter.emit('spinner-close');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {

  },
  mounted() {
    this.getOrder();
  },
};
</script>

<style lang="scss">

</style>
