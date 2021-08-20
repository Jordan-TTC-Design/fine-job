<template>
  <div class="pb-6">
    <div ref="adminSubHeader" class="admin__subHeader mb-5">
      <div class="container">
        <div class="admin__subNav">
          <li class="d-flex align-items-center d-md-flex d-none">
            <h2 class="admin__subNav__title">訂單管理</h2>
          </li>
          <li
            class="admin__subNav__item"
            @click="changeSideHeader('add-company')"
            :class="{ active: orderCategorySelected === 'add-company' }"
          >
            <p class="admin__subNav__txt me-1">企業</p>
            <p class="admin__subNav__txt">{{ addCompanyOrders.length }}</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="changeSideHeader('add-job')"
            :class="{ active: orderCategorySelected === 'add-job' }"
          >
            <p class="admin__subNav__txt me-1">職位</p>
            <p class="admin__subNav__txt">{{ addJobOrders.length }}</p>
          </li>
        </div>
      </div>
    </div>
    <!-- 下面著要內容 -->
    <div class="container position-relative">
      <div class="row">
        <!-- 側邊選單列表 -->
        <div class="col-lg-4 col-12" v-if="dataOk">
          <ul ref="adminSideList" class="admin-sideList list-group">
            <li
              class="border-bottom border-gray-line
              list-group-item d-flex justify-content-between align-items-center bg-white p-3"
            >
              <p class="subTxt" v-if="orderCategorySelected === 'add-company'">
                目前共 {{ sideListOrders.length }} 間公司
              </p>
              <p class="subTxt" v-if="orderCategorySelected === 'add-job'">
                目前共 {{ sideListOrders.length }} 個職位
              </p>
            </li>
            <li
              :ref="`sideListOrders-${item.id}`"
              :class="{ active: item.id === selectItem.id }"
              class="sideList__item list-group-item list-group-item-action"
              v-for="item in sideListOrders"
              :key="item.id"
              @click="selectListItem(item.id)"
            >
              <p class="sideList__item__title mb-1" v-if="orderCategorySelected === 'add-company'">
                {{ item.user.options.company.companyName }}
              </p>
              <p class="sideList__item__title mb-1" v-if="orderCategorySelected === 'add-job'">
                {{ item.user.options.job.jobName }}
              </p>
              <p class="sideList__item__subTxt">訂單時間：{{ $filters.date(item.create_at) }}</p>
            </li>
          </ul>
        </div>
        <!-- 主要內容 -->
        <div class="col-lg-8 col-12" v-if="selectItem.id">
          <button
            type="button"
            class="applyBackBtn btn btn-light text-dark mt-6 mb-4 d-lg-none"
            @click="backToList"
          >
            <i class="bi bi-chevron-left me-2"></i>返回訂單列表<span
              class="applyBackBtn__title ms-4"
            ></span>
          </button>
          <!-- 公司訂單資訊 -->
          <div
            ref="adminSelectBox"
            class="adminSelectBox box--shadow"
            v-if="orderCategorySelected === 'add-company' && dataOk"
          >
            <div class="selectBox__section">
              <div class="row">
                <div class="col-md-7 col-12">
                  <h4 class="pageSubTitle mb-2">
                    {{ selectItem.user.options.company.companyName }}
                  </h4>
                  <p class="subTxt">訂單建立時間：{{ $filters.date(selectItem.create_at) }}</p>
                </div>
                <div class="col-md-5 col-12">
                  <div class="adminSelectBox__btnList">
                    <button
                      type="button"
                      class="btn btn-outline-gray-line me-2"
                      @click="justNewItem('建立企業', selectItem)"
                    >
                      <p class="text-dark">審核通過</p>
                    </button>
                    <button
                      type="button"
                      class="btn btn-gray-light"
                      data-action="deleteItem"
                      :data-id="selectItem.id"
                      @click="
                        openDeleteModal(
                          '刪除企業訂單',
                          selectItem.id,
                          selectItem.user.options.company.companyName,
                        )
                      "
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="selectBox__section">
              <h4 class="pageSubTitle mb-2">訂單資料</h4>
              <ul class="adminInfoList">
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">編號</p>
                  <p class="innerList__item__txt">{{ selectItem.id }}</p>
                </li>
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">企業來源</p>
                  <p class="innerList__item__txt">
                    {{ selectItem.user.options.company.companyName }}
                  </p>
                </li>
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">聯絡人</p>
                  <p class="innerList__item__txt">{{ selectItem.user.name }}</p>
                </li>
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">聯絡電話</p>
                  <a class="innerList__item__txt" :href="`tel:${selectItem.user.tel}`">
                    {{ selectItem.user.tel }}
                  </a>
                </li>
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">聯絡Email</p>
                  <a class="innerList__item__txt" :href="`mailto:${selectItem.user.email}`">{{
                    selectItem.user.email
                  }}</a>
                </li>
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">企業剩餘額度</p>
                  <p class="innerList__item__txt">{{ selectItem.user.options.jobToken }}</p>
                </li>
              </ul>
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
                      :src="selectItem.user.options.company.companyLogoUrl"
                      :alt="`${selectItem.user.options.company.companyName}公司logo`"
                    />
                  </div>
                  <div
                    class="companyInfoBox__txtBox d-flex flex-column justify-content-between
              align-items-md-start align-items-center pt-3"
                  >
                    <h2 class="page__title mb-3">
                      {{ selectItem.user.options.company.companyName }}
                    </h2>
                    <div
                      class="d-flex flex-md-row flex-column justify-content-between
                align-items-end w-100"
                    >
                      <div class="align-self-md-stretch align-self-center">
                        <p class="page__txt mb-3">
                          <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                          >{{ selectItem.user.options.company.companyAddressCity }}，{{
                            selectItem.user.options.company.companyAddressDetail
                          }}
                        </p>
                        <p class="page__txt">
                          <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                          {{ selectItem.user.options.company.industryCategory }}
                        </p>
                      </div>
                      <div>
                        <p class="subTxt text-secondary">
                          {{ $filters.date(selectItem.create_at) }}
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
                    v-for="(item, index) in selectItem.user.options.company.companyImagesUrl"
                    class="companyPage__companyImage mb-md-0 mb-2 putPointer"
                    :src="item"
                    :alt="`${selectItem.user.options.company.companyName}公司圖片${index}`"
                    :key="index"
                  />
                </div>
              </div>
              <div class="companyInfoBox p-0">
                <h3 class="section__title--sub"><span class="title__icon"></span>公司簡介</h3>
                <div class="page__txt" v-html="selectItem.user.options.company.companyInfo"></div>
              </div>
            </div>
          </div>
          <!-- 職位 -->
          <div
            ref="adminSelectBox"
            class="adminSelectBox box--shadow"
            v-if="orderCategorySelected === 'add-job' && dataOk"
          >
            <div class="selectBox__section">
              <div class="row">
                <div class="col-md-7 col-12">
                  <h4 class="pageSubTitle mb-2">{{ selectItem.user.options.job.jobName }}</h4>
                  <p class="sideList__item__subTxt">
                    更新時間：{{ $filters.date(selectItem.create_at) }}
                  </p>
                </div>
                <div class="col-md-5 col-12">
                  <div class="adminSelectBox__btnList">
                    <button
                      type="button"
                      class="btn btn-outline-gray-line me-2"
                      @click="justNewItem('建立職位', selectItem)"
                    >
                      <p class="text-dark">審核通過</p>
                    </button>
                    <button
                      type="button"
                      class="btn btn-gray-light"
                      data-action="deleteItem"
                      :data-id="selectItem.id"
                      @click="
                        openDeleteModal(
                          '刪除職位訂單',
                          selectItem.id,
                          selectItem.user.options.job.jobName,
                        )
                      "
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="selectBox__section">
              <h4 class="pageSubTitle mb-2">訂單資料</h4>
              <ul class="adminInfoList">
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">訂單編號</p>
                  <p class="innerList__item__txt">{{ selectItem.id }}</p>
                </li>
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">企業來源</p>
                  <p class="innerList__item__txt">
                    {{ selectItem.user.options.company.companyName }}
                  </p>
                </li>
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">聯絡人</p>
                  <p class="innerList__item__txt">
                    {{ selectItem.user.name }}
                  </p>
                </li>
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">聯絡電話</p>
                  <a class="innerList__item__txt" :href="`tel:${selectItem.user.tel}`">
                    {{ selectItem.user.tel }}
                  </a>
                </li>
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">聯絡Email</p>
                  <a class="innerList__item__txt" :href="`mailto:${selectItem.user.email}`">
                    {{ selectItem.user.email }}
                  </a>
                </li>
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">剩餘額度</p>
                  <p class="innerList__item__txt">
                    {{ selectItem.user.options.company.companyJobToken }}
                  </p>
                </li>
                <li class="innerList__item" v-if="selectItem.user.options.company.costToken === 0">
                  <p class="innerList__item__subTxt">職位等級</p>
                  <p class="innerList__item__txt">免費方案</p>
                </li>
                <li class="innerList__item" v-if="selectItem.user.options.company.costToken === 1">
                  <p class="innerList__item__subTxt">職位等級</p>
                  <p class="innerList__item__txt">付費方案</p>
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
                      :src="selectItem.user.options.job.jobImageUrl"
                      :alt="`${selectItem.user.options.job.jobName}職位圖片`"
                    />
                    <div class="jobInfoBox__logoImgBox">
                      <img
                        class="logoImg"
                        :src="selectItem.user.options.company.companyLogoUrl"
                        :alt="`${selectItem.user.options.company.companyName}公司logo`"
                      />
                    </div>
                  </div>
                  <div class="jobInfoBox__txtBox d-flex flex-column justify-content-between">
                    <div class="pt-3 d-md-block d-flex flex-column align-items-center">
                      <h2 class="page__title">{{ selectItem.user.options.job.jobName }}</h2>
                      <p class="page__link subTxt mb-4 d-block pe-auto">
                        {{ selectItem.user.options.company.companyName }}
                      </p>
                    </div>
                    <div class="d-flex justify-content-between align-items-end mb-lg-0 mb-4">
                      <div>
                        <p class="mb-3">
                          <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                          >{{ selectItem.user.options.company.companyAddressCity }}
                        </p>
                        <p>
                          <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                            selectItem.user.options.job.needPerson
                          }}
                        </p>
                      </div>
                      <div>
                        <p
                          class="text-primary fw-bold mb-3"
                          v-if="!selectItem.user.options.job.salaryInterView"
                        >
                          {{ selectItem.user.options.job.salary }} / 月薪
                        </p>
                        <p
                          class="text-primary fw-bold mb-3"
                          v-if="selectItem.user.options.job.salaryInterView"
                        >
                          薪資面議
                        </p>
                        <p class="subTxt text-secondary text-end">
                          {{ $filters.date(selectItem.create_at) }}
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
                    selectItem.user.options.job.workType
                  }}
                </p>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-clock"></i>工作時間：{{
                    selectItem.user.options.job.workTime
                  }}
                </p>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-building"></i>產業類別：{{
                    selectItem.user.options.company.industryCategory
                  }}
                </p>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-card-list"></i>工作類別：{{
                    selectItem.user.options.job.jobCategory
                  }}
                </p>
                <p class="page__txt mb-2">工作內容：</p>
                <div class="page__txt" v-html="selectItem.user.options.job.jobContent"></div>
              </div>
              <div class="jobContentSection mb-5 p-0">
                <h3 class="section__title--sub"><span class="title__icon"></span>應徵條件</h3>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-book"> </i>學歷要求：{{
                    selectItem.user.options.job.education
                  }}
                </p>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-briefcase"></i>工作經驗：{{
                    selectItem.user.options.job.workExp
                  }}
                </p>
                <p class="page__txt mb-2">其他條件：</p>
                <div class="page__txt" v-html="selectItem.user.options.job.otherRequirement"></div>
              </div>
              <div class="jobContentSection p-0">
                <h3 class="section__title--sub"><span class="title__icon"></span>申請方法</h3>
                <p class="mb-2">
                  <i class="jobIcon--sm me-1 bi bi-person"></i>職位聯絡人：{{
                    selectItem.user.name
                  }}
                </p>
                <a :href="`mailto:${selectItem.user.email}`" class="mb-2 d-block">
                  <i class="jobIcon--sm me-1 bi bi-envelope"></i>聯絡信箱：{{
                    selectItem.user.email
                  }}
                </a>
                <a class="mb-3 d-block" :href="`tel:${selectItem.user.tel}`">
                  <i class="jobIcon--sm me-1 bi bi-phone"></i>聯絡電話：{{ selectItem.user.tel }}
                </a>
                <p class="mb-2">申請備註：</p>
                <div v-html="selectItem.user.options.job.otherApplyInfo"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SecondAskModal @delete-target="deleteOrder" />
</template>

<script>
import emitter from '@/methods/emitter';
import SecondAskModal from '@/components/helpers/SecondAskModal.vue';
import adminNewItem from '@/methods/adminNewItem';

export default {
  components: {
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
      pageNumber: 1,
      orderCategory: [
        { value: '新企業列表', action: 'add-company' },
        { value: '新職位列表', action: 'add-job' },
        { value: '新申請列表', action: 'apply-job' },
      ],
      orderCategorySelected: 'add-company',
      addCompanyOrders: [],
      addJobOrders: [],
      selectItem: {},
      sideListOrders: [],
      newOrder: {},
      temJob: {},
      modalName: '',
      adminNewItemMethods: {},
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
          this.selectItem = item;
          setTimeout(() => {
            this.$refs.adminSelectBox.classList.add('checked');
            this.$refs.adminSideList.classList.add('checked');
            this.$refs.adminSubHeader.classList.add('checked');
          }, 100);
          document.documentElement.scrollTop = 0;
        }
      });
    },
    // 傳資料與狀態至側列表選單
    changeSideHeader(navName) {
      this.sideListOrders = [];
      if (navName === 'add-job') {
        this.orderCategorySelected = navName;
        this.sideListOrders = this.addJobOrders;
      } else if (navName === 'add-company') {
        this.orderCategorySelected = navName;
        this.sideListOrders = this.addCompanyOrders;
      }
      if (this.fullWidth > 992) {
        this.selectListItem(this.sideListOrders[0].id);
      }
    },
    // 處理訂單分類
    classifyOrder() {
      emitter.emit('spinner-open');
      const array = this.orders;
      array.forEach((item) => {
        if (item.user.options.formAction !== undefined) {
          if (item.user.options.formAction === 'add-company') {
            this.addCompanyOrders.push(item);
          } else if (item.user.options.formAction === 'add-job') {
            this.addJobOrders.push(item);
          }
        }
      });
      // 如果還有下一頁就再回去呼叫取訂單資料
      if (this.pagination.has_next) {
        this.pageNumber += 1;
        this.getOrder(this.pageNumber);
      } else if (!this.pagination.has_next) {
        this.dataOk = true;
        this.changeSideHeader('add-company');
        emitter.emit('spinner-close');
      }
    },
    // 進入畫面先取得訂單資料
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
    clearList() {
      this.addCompanyOrders = [];
      this.addJobOrders = [];
    },
    justNewItem(action, item) {
      let temObj = {};
      if (action === '建立企業') {
        temObj = this.adminNewItemMethods.justNewCompanyData(item);
      } else if (action === '建立職位') {
        temObj = this.adminNewItemMethods.justNewJobData(item);
      }
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      this.$http
        .post(url, temObj)
        .then((res) => {
          if (res.data.success) {
            emitter.emit('alertMessage-open', res.data.message);
          }
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 刪除訂單
    deleteOrder(id) {
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
  },
  created() {
    this.addCompanyOrders = [];
    this.addJobOrders = [];
    this.adminNewItemMethods = adminNewItem;
  },
  mounted() {
    this.getOrder();
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
