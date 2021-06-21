<template>
  <div class="container">
    <h2 class="text-center mb-4">全部產品列表</h2>
    <div class="productList">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">圖片</th>
            <th scope="col">產品名稱</th>
            <th scope="col">產品價格</th>
            <th scope="col">動作</th>
          </tr>
        </thead>
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
    </div>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';

export default {
  data() {
    return {
      products: [],
    //   pagination: {},
    //   temProduct: {},
    };
  },
  methods: {
    getProductsData() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=:1`;
      this.$http
        .get(url)
        .then((res) => {
          //   console.log(res);
          this.products = res.data.products;
          emitter.emit('spinner-close');
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
