<template>
  <DeleteProductModal
    ref="DeleteProductModal"
    :tem-product="temProduct"
    @deltet-product="deleteProduct"
  />
  <EditProductModal ref="EditProductModal" @update-product="updateProduct" />
  <div class="admin__subHeader mb-6 box--shadow">
    <div class="container">
      <div class="admin__subNav">
        <li class="d-flex align-items-center">
          <h2 class="admin__subNav__title">產品管理</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="changeSideHeader('企業')"
          :class="{ active: productCategorySelected === '企業' }"
        >
          <p class="admin__subNav__txt me-1">企業</p>
          <p class="admin__subNav__txt">{{ companiesList.length }}</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="changeSideHeader('職位')"
          :class="{ active: productCategorySelected === '職位' }"
        >
          <p class="admin__subNav__txt me-1">職位</p>
          <p class="admin__subNav__txt">{{ jobsList.length }}</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="changeSideHeader('系統')"
          :class="{ active: productCategorySelected === '系統' }"
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
        <ul class="admin-sideList list-group box--shadow" v-if="productCategorySelected === '企業'">
          <li
            class="list-group-item d-flex justify-content-between align-items-center bg-white p-3"
          >
            <p class="subTxt">目前共 {{ companiesList.length }} 間公司</p>
            <button type="button" class="btn"><i class="bi bi-search"></i></button>
          </li>
          <li
            class="sideList__item list-group-item list-group-item-action"
            :class="{ active: item.id === temItem.id }"
            v-for="item in companiesList"
            :key="item.id"
            @click="selectItem(item.id)"
          >
            <p class="sideList__item__title mb-1">{{ item.title }}</p>
            <p class="sideList__item__subTxt">創建時間：{{ $filters.date(item.options.create) }}</p>
          </li>
        </ul>
        <!-- 職位 -->
        <ul class="admin-sideList list-group box--shadow" v-if="productCategorySelected === '職位'">
          <li
            class="list-group-item d-flex justify-content-between align-items-center bg-white p-3"
          >
            <p class="subTxt">目前共 {{ jobsList.length }} 個職位</p>
            <button type="button" class="btn"><i class="bi bi-search"></i></button>
          </li>
          <li
            class="sideList__item list-group-item list-group-item-action"
            :class="{ active: item.id === temItem.id }"
            v-for="item in jobsList"
            :key="item.id"
            @click="selectItem(item.id)"
          >
            <p class="sideList__item__title mb-1">{{ item.title }}</p>
            <p class="sideList__item__subTxt">
              創建時間：{{ $filters.date(item.options.job.create) }}
            </p>
          </li>
        </ul>
      </div>
      <div class="col-8">
        <!-- 企業 -->
        <div
          ref="adminSelectBox"
          class="adminSelectBox box--shadow"
          v-if="productCategorySelected === '企業'"
        >
          <div class="selectBox__section">
            <div class="row">
              <div class="col-7">
                <h4 class="pageSubTitle mb-2">{{ temItem.title }}</h4>
                <p class="sideList__item__subTxt">
                  更新時間：{{ $filters.date(temItem.options.create) }}
                </p>
              </div>
              <div class="col-5">
                <div class="d-flex justify-content-end">
                  <select class="form-select w-auto me-2">
                    <option selected value="發布中">發布中</option>
                    <option value="關閉">關閉企業</option>
                  </select>
                  <button
                    type="button"
                    class="btn  btn-gray-light me-2"
                    data-action="editCompany"
                    :data-id="temItem.id"
                    @click="editItemModal($event)"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    class="btn  btn-gray-light"
                    data-action="deleteItem"
                    :data-id="temItem.id"
                    @click="openModal($event, temItem)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="selectBox__section  position-relative">
            <button
              class="collectBtn btn btn-outline-gray-line position-absolute pageState"
              type="button"
              @click="emitter.emit('open-collect-modal')"
            >
              <i class="jobIcon bi bi-bookmark-fill"></i>
            </button>
            <div class="d-flex">
              <div class="jobContent__imgBox company">
                <div class="logoImageBox company">
                  <img
                    class="logoImage"
                    :src="temItem.imageUrl"
                    :alt="`${temItem.title}公司logo`"
                  />
                </div>
              </div>
              <div class="JobContent__txtBox d-flex flex-column justify-content-between pt-3">
                <h2 class="page__title mb-3">{{ temItem.title }}</h2>
                <div class="d-flex justify-content-between align-items-end">
                  <div>
                    <p class="page__txt mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                      >{{ temItem.options.companyAddressCity }}，{{
                        temItem.options.companyAddressDetail
                      }}
                    </p>
                    <p class="page__txt">
                      <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                      {{ temItem.category }}
                    </p>
                  </div>
                  <div>
                    <p class="subTxt text-secondary">
                      {{ $filters.date(temItem.options.create) }}
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
                v-for="(item, index) in temItem.imagesUrl"
                class="companyPage__companyImage"
                :src="item"
                :alt="`${temItem.title}公司圖片${index}`"
                :key="index"
              />
            </div>
          </div>
          <div class="selectBox__section">
            <h3 class="page__title--sub"><span class="title__icon"></span>公司簡介</h3>
            <p class="page__txt">{{ temItem.content }}</p>
          </div>
        </div>
        <!-- 職位 -->
        <div
          ref="adminSelectBox"
          class="adminSelectBox box--shadow"
          v-if="productCategorySelected === '職位'"
        >
          <div class="selectBox__section">
            <div class="row">
              <div class="col-7">
                <h4 class="pageSubTitle mb-2">{{ temItem.title }}</h4>
                <p class="sideList__item__subTxt">
                  更新時間：{{ $filters.date(temItem.options.job.create) }}
                </p>
              </div>
              <div class="col-5">
                <div class="d-flex justify-content-end">
                  <select class="form-select w-auto me-2">
                    <option selected value="發布中">發布中</option>
                    <option value="關閉">關閉職位</option>
                  </select>
                  <button
                    type="button"
                    class="btn  btn-gray-light me-2"
                    data-action="editJob"
                    :data-id="temItem.id"
                    @click="editItemModal($event)"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    class="btn  btn-gray-light"
                    data-action="deleteItem"
                    :data-id="temItem.id"
                    @click="openModal($event, temItem)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="selectBox__section">
            <h4 class="pageSubTitle mb-2">職位狀態</h4>
            <ul>
              <li class="innerList__item">
                <p>需求人數：{{ temItem.num }} 人</p>
              </li>
              <li class="innerList__item">
                <p>創建時間：{{ $filters.date(temItem.options.job.create) }}</p>
              </li>
              <li class="innerList__item">
                <div class="d-flex align-items-center" v-if="!temItem.options.job.promote">
                  <p class="me-2">方案：免費方案</p>
                  <button type="button" class="btn btn-primary">立即付費推播，提高曝光度！</button>
                </div>

                <div class="d-flex align-items-center" v-if="temItem.options.job.promote === 1">
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
                <img class="jobImage" :src="temItem.imageUrl" :alt="`${temItem.title}職位圖片`" />
                <div class="logoImageBox">
                  <img
                    class="logoImage"
                    :src="temItem.options.company.companyLogoUrl"
                    :alt="`${temItem.options.company.companyName}公司logo`"
                  />
                </div>
              </div>
              <div class="JobContent__txtBox d-flex flex-column justify-content-between">
                <div class="pt-3">
                  <h2 class="page__title">{{ temItem.title }}</h2>
                  <p class="page__txt page__link subTxt  mb-4 d-block">
                    {{ temItem.options.company.companyName }}
                  </p>
                </div>
                <div class="d-flex justify-content-between align-items-end">
                  <div>
                    <p class="page__txt mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                      >{{ temItem.options.company.companyAddressCity }}
                    </p>
                    <p class="page__txt">
                      <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                        temItem.num
                      }}
                    </p>
                  </div>
                  <div>
                    <p
                      class="text-primary fw-bold mb-3"
                      v-if="!temItem.options.job.salaryInterView"
                    >
                      {{ temItem.price }} / 月薪
                    </p>
                    <p class="text-primary fw-bold mb-3" v-if="temItem.options.job.salaryInterView">
                      薪資面議
                    </p>
                    <p class="subTxt text-secondary text-end">
                      {{ $filters.date(temItem.options.job.create) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="selectBox__section   mb-3">
            <h3 class="page__title--sub"><span class="title__icon"></span>職位內容</h3>
            <p class="page__txt mb-2">工作性質：{{ temItem.options.job.workType }}</p>
            <p class="page__txt mb-2">工作時間：{{ temItem.options.job.workTime }}</p>
            <p class="page__txt mb-2">產業類別：{{ temItem.options.company.industryCategory }}</p>
            <p class="page__txt mb-2">工作類別：{{ temItem.category }}</p>
            <p class="page__txt mb-2">工作內容：</p>
            <p class="page__txt">{{ temItem.content }}</p>
          </div>
          <div class="selectBox__section  mb-3">
            <h3 class="page__title--sub"><span class="title__icon"> </span>應徵條件</h3>
            <p class="page__txt mb-2">學歷要求：{{ temItem.options.job.education }}</p>
            <p class="page__txt mb-2">工作經驗：{{ temItem.options.job.workExp }}</p>
            <p class="page__txt mb-2">其他條件：</p>
            <p class="page__txt">{{ temItem.options.job.otherRequirement }}</p>
          </div>
          <div class="selectBox__section">
            <h3 class="page__title--sub"><span class="title__icon"> </span>申請方法</h3>
            <p class="page__txt mb-2">職位聯絡人：{{ temItem.options.company.companyContact }}</p>
            <p class="page__txt mb-2">聯絡信箱：{{ temItem.options.company.companyEmail }}</p>
            <p class="page__txt mb-2">聯絡電話：{{ temItem.options.company.companyTel }}</p>
            <p class="page__txt mb-2">申請備註：</p>
            <p class="page__txt">
              • 有意者請透過系統寄送應徵履歷，合者約談，不適任者恕不另行通知，謝謝。 • 請附上cover
              letter 、 CV/Resume 以及作品集。 • 需自備電腦。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import EditProductModal from '@/components/admin/DashBoardEditProductModal.vue';
import DeleteProductModal from '@/components/admin/DashBoardProductDeleteModal.vue';

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
      temItem: {
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
        options: {
          job: {},
          company: {
            companyLogoUrl: '',
          },
        },
      },
    };
  },
  watch: {
    productCategorySelected(nv) {
      console.log(nv);
    },
  },
  methods: {
    selectItem(id) {
      console.log(id);
      if (this.productCategorySelected === '職位') {
        this.jobsList.forEach((item) => {
          if (item.id === id) {
            this.temItem = item;
          }
        });
      } else if (this.productCategorySelected === '企業') {
        this.companiesList.forEach((item) => {
          if (item.id === id) {
            this.temItem = item;
          }
        });
      }
      // console.log(this.temItem);
      document.documentElement.scrollTop = 0;
    },
    changeSideHeader(dataName) {
      this.productCategorySelected = dataName;
      if (this.productCategorySelected === '職位') {
        this.selectItem(this.jobsList[0].id);
      } else if (this.productCategorySelected === '企業') {
        this.selectItem(this.companiesList[0].id);
      }
    },
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
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
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
      // console.log(this.companiesList);
      // console.log(this.jobsList);
      // console.log(this.systemList);
      this.selectItem(this.companiesList[0].id);
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
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
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
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
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
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
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
