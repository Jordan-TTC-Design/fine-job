<template>
  <DeleteProductModal
    ref="DeleteProductModal"
    :tem-product="temProduct"
    @deltet-product="deleteProduct"
  ></DeleteProductModal>
  <EditProductModal ref="EditProductModal" @update-product="updateProduct"></EditProductModal>
  <!-- :edit-item="editItem"
    :modal-name="modalName" -->
  <div class="container">
    <ul class="d-flex btn-group">
      <li v-for="(item, index) in productCategory" :key="index">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="productCategorySelected = item.value"
        >
          {{ item.value }}
        </button>
      </li>
    </ul>
    <ul class="row" v-if="productCategorySelected === '企業'">
      <li class="col-12" v-for="(item, index) in companiesList" :key="item.id">
        <div class="listBox row">
          <div class="col-6 d-flex align-items-center">
            <img class="listBox__logo" :src="item.imageUrl" alt="" />
            <p>{{ index + 1 }} {{ item.title }}{{ item.id }}</p>
          </div>
          <div class="input-group d-flex justify-content-end col-6 w-auto">
            <p class="me-4">{{ $filters.date(item.options.create) }}</p>
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-action="editCompany"
              :data-id="item.id"
              @click="editItemModal($event)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-action="deleteItem"
              :data-id="item.id"
              @click="openModal($event, item)"
            >
              刪除
            </button>
          </div>
        </div>
      </li>
    </ul>
    <ul class="row" v-if="productCategorySelected === '職位'">
      <li class="col-12" v-for="(item, index) in jobsList" :key="index">
        <div class="listBox row">
          <div class="col-6 d-flex align-items-center">
            <img class="listBox__logo" :src="item.imageUrl || tempImgUrl" alt="" />
            <p>{{ index + 1 }} {{ item.options.company.companyName }} -</p>
            <p>{{ item.title }}{{ item.id }}</p>
          </div>

          <div class="input-group d-flex justify-content-end col-6 w-auto">
            <p class="me-4">{{ $filters.date(item.options.job.create) }}</p>
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-action="editJob"
              :data-id="item.id"
              @click="editItemModal($event)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-action="deleteItem"
              :data-id="item.id"
              @click="openModal($event, item)"
            >
              刪除
            </button>
          </div>
        </div>
      </li>
    </ul>
    <!-- <pagination-compo
        :page="pagination"
        @get-product="getProductData"
      ></pagination-compo> -->
  </div>
</template>

<script>
// import ProductCard from '@/components/admin/DashBoardProductCard.vue';
import EditProductModal from '@/components/admin/DashBoardEditProductModal.vue';
import DeleteProductModal from '@/components/admin/DashBoardProductDeleteModal.vue';
import emitter from '@/components/helpers/emitter';

export default {
  components: {
    EditProductModal,
    DeleteProductModal,
  },
  data() {
    return {
      products: [],
      apiToken: '',
      pagination: {},
      jobsList: [],
      companiesList: [],
      systemList: [],
      productCategory: [
        { value: '企業', action: '企業' },
        { value: '職位', action: '職位' },
        { value: '系統', action: '系統' },
      ],
      productCategorySelected: '企業',
      editItem: {},
      editAction: '',
      temJob: {},
      modalName: '',
      nowAction: '',
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
  watch: {
    productCategorySelected(nv) {
      console.log(nv);
    },
  },
  methods: {
    editItemModal(e) {
      const nowId = e.target.dataset.id;
      const nowAction = e.target.dataset.action;
      console.log(nowAction, nowId);
      if (nowAction === 'editCompany') {
        this.modalName = 'editCompany';
        this.editItem = this.companiesList.filter((item) => item.id === nowId);
        console.log(this.editItem);
        emitter.emit('open-edit-company', [this.editItem, this.modalName]);
      } else if (nowAction === 'editJob') {
        this.modalName = 'editJob';
        this.editItem = this.jobsList.filter((item) => item.id === nowId);
        console.log(this.editItem);
        emitter.emit('open-edit-company', [this.editItem, this.modalName]);
      }
    },
    updateProduct(temObj) {
      console.log(temObj);
      emitter.emit('spinner-open');
      const { id } = temObj.data;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http
        .put(url, temObj)
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
    classifyProduct() {
      // const array = this.products;
      this.companiesList = [];
      this.jobsList = [];
      this.products.forEach((item) => {
        if (item.description === '企業') {
          this.companiesList.push(item);
        } else if (item.description === '職位') {
          this.jobsList.push(item);
        } else if (item.description === '系統') {
          this.systemList.push(item);
        }
      });
      console.log(this.companiesList);
      // console.log(this.jobsList);
      // console.log(this.systemList);
    },
    getProductData() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          // this.products = res.data.products;
          // 物件轉陣列
          this.products = Object.keys(res.data.products).map((_) => res.data.products[_]);
          console.log(this.products);
          this.pagination = res.data.pagination;
          this.classifyProduct();
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
      } else if (nowAction === 'deleteItem') {
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
      // const id = '-M_uRTTxSgaZiP7aaArW';
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
  },
  mounted() {},
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
