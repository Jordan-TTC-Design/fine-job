<template>
  <ProductModal ref="ProductModal" :tem-product="temProduct"></ProductModal>
  <DeleteProductModal
    ref="DeleteProductModal"
    :tem-product="temProduct"
    v-on:deltetProduct="deleteProduct"
  ></DeleteProductModal>
  <div class="container-fuild">
    全部產品列表
    <div class="text-end mt-4">
      <button class="btn btn-primary" data-action="newProduct" @click="openModal($event, item)">
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
        <tr
          v-is="'ProductCard'"
          v-for="product in products"
          v-on:change-product-state="changeProductState"
          v-on:open-modal="openModal"
          :key="product.id"
          :item="product"
        ></tr>
      </tbody>
    </table>
    <p>
      目前有 <span id="productCount">{{ products.length }}</span> 項產品
    </p>
    <!-- <pagination-compo
        :page="pagination"
        @get-product="getProductData"
      ></pagination-compo> -->
  </div>
</template>

<script>
import ProductCard from '@/components/admin/DashBoardProductCard.vue';
import ProductModal from '@/components/admin/DashBoardProductModal.vue';
import DeleteProductModal from '@/components/admin/DashBoardProductDeleteModal.vue';
import emitter from '@/components/helpers/emitter';

export default {
  components: {
    ProductModal,
    ProductCard,
    DeleteProductModal,
  },
  data() {
    return {
      products: [],
      apiToken: '',
      pagination: {},
      temProduct: {
        title: '',
        imageUrl: null,
        imagesUrl: [],
        category: '',
        content: '',
        description: '',
        id: '',
        is_enabled: null,
        num: null,
        origin_price: null,
        price: null,
        unit: '',
      },
    };
  },
  methods: {
    getProductData(pageNum = 1) {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${pageNum}`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          emitter.emit('spinner-close');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateProduct(updatedProduct) {
      let id = `/${updatedProduct.id}`;
      const product = {
        data: updatedProduct,
      };
      console.log(updatedProduct);
      let axiosAction = 'put';
      if (this.nowAction === 'newProduct') {
        axiosAction = 'post';
        id = '';
      }
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http[axiosAction](url, product)
        .then((res) => {
          console.log(res);
          emitter.emit('open-product-detail');
          this.getProductData();
          this.temProduct = {
            imagesUrl: [],
          };
          emitter.emit('spinner-close');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal(e, item) {
      // console.log(item);
      console.log(e.target.dataset.action);
      const nowAction = e.target.dataset.action;
      if (nowAction === 'newProduct') {
        this.nowAction = e.target.dataset.action;
        this.temProduct = {
          imagesUrl: [],
        };
        // console.log(this.temProduct)
        // console.log(this.productModal);
        emitter.emit('open-product-detail');
        // console.log(ProductModal);
        // ProductModal.methods.openModal();
      } else if (nowAction === 'editProduct') {
        this.nowAction = e.target.dataset.action;
        console.log(item);
        if (!item.imagesUrl) {
          this.temProduct = { ...item, imagesUrl: [] };
        } else {
          this.temProduct = { ...item };
        }
        // console.log(this.temProduct)
        emitter.emit('open-product-detail');
        // ProductModal.openModal();
      } else if (nowAction === 'deleteProduct') {
        this.nowAction = e.target.dataset.action;
        console.log(item);
        if (!item.imagesUrl) {
          this.temProduct = { ...item, imagesUrl: [] };
        } else {
          this.temProduct = { ...item };
        }
        // console.log(this.temProduct.id)
        emitter.emit('open-product-delete');
        // this.refs.DeleteProductModal.openModal();
      }
    },
    // 檢查無誤
    deleteProduct() {
      emitter.emit('spinner-open');
      const { id } = this.temProduct;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          console.log(res);
          this.getProductData();
          emitter.emit('close-product-delete');
          emitter.emit('spinner-close');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 檢查無誤
    changeProductState(id) {
      // console.log(id);
      const product = {};
      this.products.forEach((item) => {
        const that = item;
        if (that.id === id) {
          if (that.is_enabled > 0) {
            that.is_enabled = 0;
          } else {
            that.is_enabled = 1;
          }
          product.data = that;
        }
      });
      emitter.emit('spinner-open');
      // console.log(product);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http
        .put(url, product)
        .then((res) => {
          console.log(res);
          this.getProductData();
          emitter.emit('spinner-close');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getProductData();
    console.log(ProductModal);
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
