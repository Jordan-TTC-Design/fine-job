<template>
  <div class="pb-6">
    <div ref="adminSubHeader" class="admin__subHeader mb-6 box--shadow">
      <div class="container">
        <ul class="admin__subNav">
          <li class="d-flex align-items-center d-md-flex d-none">
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
        </ul>
      </div>
    </div>
    <div class="container position-relative">
      <div class="row">
        <div class="col-lg-4 col-12">
          <ul ref="adminSideList" class="admin-sideList list-group">
            <li
              class="border-bottom border-gray-line
              list-group-item d-flex justify-content-between align-items-center bg-white p-3"
            >
              <p class="subTxt" v-if="productCategorySelected === '企業'">
                目前共 {{ sideListOrders.length }} 間公司
              </p>
              <p class="subTxt" v-if="productCategorySelected === '職位'">
                目前共 {{ sideListOrders.length }} 個職位
              </p>
            </li>
            <li
              :ref="`sideListOrders-${item.id}`"
              :class="{ active: item.id === selectItem.id && fullWidth > 992 }"
              class="sideList__item list-group-item list-group-item-action"
              v-for="item in sideListOrders"
              :key="item.id"
              @click="selectListItem(item.id)"
            >
              <p class="sideList__item__title mb-1">
                {{ item.title }}
              </p>
              <p class="sideList__item__subTxt" v-if="productCategorySelected === '企業'">
                訂單時間：{{ $filters.date(item.options.create) }}
              </p>
              <p class="sideList__item__subTxt" v-if="productCategorySelected === '職位'">
                訂單時間：{{ $filters.date(item.options.job.create) }}
              </p>
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
          <!-- 企業 -->
          <div
            ref="adminSelectBox"
            class="adminSelectBox box--shadow"
            v-if="productCategorySelected === '企業'"
          >
            <div class="selectBox__section">
              <div class="row">
                <div class="col-md-7 col-12">
                  <h4 class="pageSubTitle mb-2">
                    {{ selectItem.title }}
                  </h4>
                  <p class="subTxt">更新時間：{{ $filters.date(selectItem.options.create) }}</p>
                </div>
                <div class="col-md-5 col-12">
                  <div class="adminSelectBox__btnList">
                    <select
                      class="form-select w-auto me-2"
                      @change="changeProductState(selectItem.id)"
                      v-model="selectItem.is_enabled"
                    >
                      <option :selected="selectItem.is_enabled === 1" value="1">發布中</option>
                      <option :selected="selectItem.is_enabled === 0" value="0">關閉企業</option>
                    </select>
                    <router-link
                      class="btn btn-gray-light me-2"
                      :to="`/admin/dashboard/products-list/edit-company/${selectItem.id}`"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </router-link>
                    <button
                      type="button"
                      class="btn btn-gray-light"
                      data-action="deleteItem"
                      :data-id="selectItem.id"
                      @click="openDeleteModal('刪除企業', selectItem.id, selectItem.title)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="selectBox__section position-relative">
              <h4 class="pageSubTitle mb-2">公司資料</h4>
              <div class="companyInfoBox mb-5 p-0 position-relative">
                <div
                  class="d-flex flex-md-row flex-column align-items-md-stretch align-items-center"
                >
                  <div class="companyInfoBox__logoImgBox mb-md-0 mb-4 me-md-4">
                    <img
                      class="logoImg"
                      :src="selectItem.imageUrl"
                      :alt="`${selectItem.title}公司logo`"
                    />
                  </div>
                  <div
                    class="companyInfoBox__txtBox d-flex flex-column justify-content-between
              align-items-md-start align-items-center pt-3"
                  >
                    <h2 class="page__title mb-3">
                      {{ selectItem.title }}
                    </h2>
                    <div
                      class="d-flex flex-md-row flex-column justify-content-between
                align-items-end w-100"
                    >
                      <div class="align-self-md-stretch align-self-center">
                        <p class="page__txt mb-3">
                          <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                          >{{ selectItem.options.companyAddressCity }}，{{
                            selectItem.options.companyAddressDetail
                          }}
                        </p>
                        <p class="page__txt">
                          <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                          {{ selectItem.category }}
                        </p>
                      </div>
                      <div>
                        <p class="subTxt text-secondary">
                          {{ $filters.date(selectItem.options.create) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="companyInfoBox mb-5 p-0">
                <h3 class="section__title--sub"><span class="title__icon"></span>公司照片</h3>
                <div class="d-flex justify-content-between flex-md-row flex-column">
                  <img
                    v-for="(item, index) in selectItem.imagesUrl"
                    class="companyPage__companyImage mb-md-0 mb-2 putPointer"
                    :src="item"
                    :alt="`${selectItem.title}公司圖片${index}`"
                    :key="index"
                  />
                </div>
              </div>
              <div class="companyInfoBox p-0">
                <h3 class="section__title--sub"><span class="title__icon"></span>公司簡介</h3>
                <div class="page__txt" v-html="selectItem.content"></div>
              </div>
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
                <div class="col-lg-7 col-12">
                  <h4 class="pageSubTitle mb-2">{{ selectItem.title }}</h4>
                  <p class="sideList__item__subTxt">
                    更新時間：{{ $filters.date(selectItem.options.job.create) }}
                  </p>
                </div>
                <div class="col-lg-5 col-12">
                  <div class="adminSelectBox__btnList">
                    <select
                      class="form-select w-auto me-2"
                      @change="changeProductState(selectItem.id)"
                      v-model="selectItem.is_enabled"
                    >
                      <option :selected="selectItem.is_enabled === 1" value="1">發布中</option>
                      <option :selected="selectItem.is_enabled === 0" value="0">關閉職位</option>
                    </select>
                    <router-link
                      class="btn btn-gray-light me-2"
                      :to="`/admin/dashboard/products-list/edit-job/${selectItem.id}`"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </router-link>
                    <button
                      type="button"
                      class="btn  btn-gray-light"
                      data-action="deleteItem"
                      :data-id="selectItem.id"
                      @click="openDeleteModal('刪除職位', selectItem.id, selectItem.title)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="selectBox__section">
              <h4 class="pageSubTitle mb-2">職位系統資訊</h4>
              <ul class="adminInfoList">
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">需求人數</p>
                  <p class="innerList__item__txt">{{ selectItem.num }}</p>
                </li>
                <li
                  class="innerList__item"
                  v-if="selectItem.options.job.promote === 0 || !selectItem.options.job.promote"
                >
                  <p class="innerList__item__subTxt">職位等級</p>
                  <p class="innerList__item__txt">
                    免費方案<button type="button" class="btn btn-primary ms-3">
                      立即付費推播，提高曝光度！
                    </button>
                  </p>
                </li>
                <li class="innerList__item" v-if="selectItem.options.job.promote === 1">
                  <p class="innerList__item__subTxt">職位等級</p>
                  <p class="innerList__item__txt">
                    付費方案<button type="button" class="btn btn-gray-light ms-3">
                      立即付費推播，提高曝光度！
                    </button>
                  </p>
                </li>
              </ul>
            </div>
            <div class="selectBox__section">
              <h4 class="pageSubTitle mb-2">職位資料</h4>
              <div class="jobInfoBox rounded-0 p-0 mb-5">
                <div class="d-flex flex-lg-row flex-column">
                  <div class="jobInfoBox__imgBox mb-md-0 mb-4">
                    <img
                      class="jobImg putPointer"
                      :src="selectItem.imageUrl"
                      :alt="`${selectItem.title}職位圖片`"
                    />
                    <div class="jobInfoBox__logoImgBox">
                      <img
                        class="logoImg"
                        :src="selectItem.options.company.companyLogoUrl"
                        :alt="`${selectItem.options.company.companyName}公司logo`"
                      />
                    </div>
                  </div>
                  <div class="jobInfoBox__txtBox d-flex flex-column justify-content-between">
                    <div class="pt-3 d-md-block d-flex flex-column align-items-center">
                      <h2 class="page__title">{{ selectItem.title }}</h2>
                      <p class="page__link subTxt mb-4 d-block pe-auto">
                        {{ selectItem.options.company.companyName }}
                      </p>
                    </div>
                    <div class="d-flex justify-content-between align-items-end mb-lg-0 mb-4">
                      <div>
                        <p class="mb-3">
                          <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                          >{{ selectItem.options.company.companyAddressCity }}
                        </p>
                        <p>
                          <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                            selectItem.num
                          }}
                        </p>
                      </div>
                      <div>
                        <p
                          class="text-primary fw-bold mb-3"
                          v-if="!selectItem.options.job.salaryInterView"
                        >
                          {{ selectItem.price }} / 月薪
                        </p>
                        <p
                          class="text-primary fw-bold mb-3"
                          v-if="selectItem.options.job.salaryInterView"
                        >
                          薪資面議
                        </p>
                        <p class="subTxt text-secondary text-end">
                          {{ $filters.date(selectItem.options.job.create) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="jobContentSection mb-5 p-0">
                <h3 class="section__title--sub"><span class="title__icon"></span>職位內容</h3>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-journal"></i>工作性質：{{
                    selectItem.options.job.workType
                  }}
                </p>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-clock"></i>工作時間：{{
                    selectItem.options.job.workTime
                  }}
                </p>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-building"></i>產業類別：{{
                    selectItem.options.company.industryCategory
                  }}
                </p>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-card-list"></i>工作類別：{{
                    selectItem.category
                  }}
                </p>
                <p class="page__txt mb-2">工作內容：</p>
                <div class="page__txt" v-html="selectItem.content"></div>
              </div>
              <div class="jobContentSection mb-5 p-0">
                <h3 class="section__title--sub"><span class="title__icon"></span>應徵條件</h3>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-book"> </i>學歷要求：{{
                    selectItem.options.job.education
                  }}
                </p>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-briefcase"></i>工作經驗：{{
                    selectItem.options.job.workExp
                  }}
                </p>
                <p class="page__txt mb-2">其他條件：</p>
                <div class="page__txt" v-html="selectItem.options.job.otherRequirement"></div>
              </div>
              <div class="jobContentSection p-0">
                <h3 class="section__title--sub"><span class="title__icon"></span>申請方法</h3>
                <p class="mb-2">
                  <i class="jobIcon--sm me-1 bi bi-person"></i>職位聯絡人：{{
                    selectItem.options.company.companyContact
                  }}
                </p>
                <a :href="`mailto:${selectItem.options.company.companyEmail}`" class="mb-2 d-block">
                  <i class="jobIcon--sm me-1 bi bi-envelope"></i>聯絡信箱：{{
                    selectItem.options.company.companyEmail
                  }}
                </a>
                <a class="mb-3 d-block" :href="`tel:${selectItem.options.company.companyTel}`">
                  <i class="jobIcon--sm me-1 bi bi-phone"></i>聯絡電話：{{
                    selectItem.options.company.companyTel
                  }}
                </a>
                <p class="mb-2">申請備註：</p>
                <div v-html="selectItem.options.company.otherApplyInfo"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SecondAskModal @delete-target="deleteProduct" />
</template>

<script>
import emitter from '@/methods/emitter';
import SecondAskModal from '@/components/helpers/SecondAskModal.vue';

export default {
  components: {
    SecondAskModal,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      products: [],
      apiToken: '',
      pagination: {},
      jobsList: [],
      companiesList: [],
      sideListOrders: [],
      systemList: [],
      productCategory: [
        { value: '企業', action: '企業' },
        { value: '職位', action: '職位' },
        { value: '系統', action: '系統' },
      ],
      productCategorySelected: '企業',
      modalName: '',
      nowAction: '',
      selectItem: {
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
  methods: {
    openDeleteModal(txt, id, name) {
      const Obj = {
        action: txt,
        itemId: id,
        itemName: name,
      };
      emitter.emit('open-delete-product-modal', Obj);
    },
    backToList() {
      this.selectItem = {};
      this.$refs.adminSelectBox.classList.remove('checked');
      this.$refs.adminSideList.classList.remove('checked');
      this.$refs.adminSubHeader.classList.remove('checked');
    },
    selectListItem(itemId) {
      this.sideListOrders.forEach((item) => {
        if (item.id === itemId) {
          this.selectItem = {};
          this.selectItem = JSON.parse(JSON.stringify(item));
          setTimeout(() => {
            this.$refs.adminSelectBox.classList.add('checked');
            this.$refs.adminSideList.classList.add('checked');
            this.$refs.adminSubHeader.classList.add('checked');
          }, 100);
        }
      });
    },
    changeSideHeader(navName) {
      this.sideListOrders = [];
      if (navName === '職位') {
        this.productCategorySelected = navName;
        this.sideListOrders = this.jobsList;
      } else if (navName === '企業') {
        this.productCategorySelected = navName;
        this.sideListOrders = this.companiesList;
      }
      if (this.fullWidth > 992) {
        this.selectListItem(this.sideListOrders[0].id);
      }
    },
    updateProduct(temObj) {
      emitter.emit('spinner-open');
      const { id } = temObj.data;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http
        .put(url, temObj)
        .then(() => {
          emitter.emit('spinner-close');
          this.getOgData();
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    classifyProduct() {
      emitter.emit('spinner-open');
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
      this.changeSideHeader('企業');
      emitter.emit('spinner-close');
    },
    getOgData() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          // 物件轉陣列
          this.products = Object.keys(res.data.products).map((_) => res.data.products[_]);
          this.pagination = res.data.pagination;
          this.classifyProduct();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    deleteProduct() {
      emitter.emit('spinner-open');
      const { id } = this.selectItem;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http
        .delete(url)
        .then(() => {
          this.getOgData();
          emitter.emit('close-product-delete');
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    changeProductState(id) {
      this.selectItem.options.create = `${Math.floor(Date.now() / 1000)}`;
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      const companyData = {
        data: this.selectItem,
      };
      this.$http
        .put(url, companyData)
        .then((res) => {
          emitter.emit('spinner-close');
          if (res.data.success) {
            emitter.emit('alertMessage-open', res.data.message);
            this.$router.push('/admin/dashboard/products-list');
          }
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
  },
  created() {
    this.getOgData();
  },
  mounted() {
    emitter.emit('spinner-open-bg', 1000);
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
