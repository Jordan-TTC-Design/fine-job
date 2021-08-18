<template>
  <!-- 訂單 -->
  <div ref="adminSelectBox" class="adminSelectBox box--shadow" v-if="navState === 'add-company'">
    <div class="selectBox__section">
      <div class="row">
        <div class="col-7">
          <h4 class="pageSubTitle mb-2">{{ selectItem.user.options.company.companyName }}</h4>
          <p class="sideList__item__subTxt">更新時間：{{ $filters.date(selectItem.create_at) }}</p>
        </div>
        <div class="col-5">
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-gray-line me-2">
              <p class="text-dark">審核通過</p>
            </button>
            <button
              type="button"
              class="btn  btn-gray-light me-2"
              data-action="newCompany"
              :data-id="selectItem.id"
              @click="newItemModal($event)"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
            <button
              type="button"
              class="btn  btn-gray-light"
              data-action="deleteItem"
              :data-id="selectItem.id"
              @click="deleteOrder(selectItem.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="selectBox__section">
      <h4 class="pageSubTitle mb-2">訂單資料</h4>
      <ul>
        <li class="innerList__item">
          <p>編號：{{ selectItem.id }}</p>
        </li>
        <li class="innerList__item">
          <p>企業來源：{{ selectItem.user.options.company.companyName }}</p>
        </li>
        <li class="innerList__item">
          <p>聯絡人：{{ selectItem.user.name }}</p>
        </li>
        <li class="innerList__item">
          <p>聯絡電話：{{ selectItem.user.tel }}</p>
        </li>
        <li class="innerList__item">
          <p>聯絡Email：{{ selectItem.user.email }}</p>
        </li>
        <li class="innerList__item">
          <p>企業剩餘額度：{{ selectItem.user.options.jobToken }}</p>
        </li>
      </ul>
    </div>
    <div class="selectBox__section  position-relative">
      <button
        class="collectBtn btn btn-outline-gray-line position-absolute pageState"
        type="button"
      >
        <i class="jobIcon bi bi-bookmark-fill"></i>
      </button>
      <div class="d-flex">
        <div class="jobContent__imgBox company">
          <div class="logoImageBox company">
            <img
              class="logoImage"
              :src="selectItem.user.options.company.companyLogoUrl"
              :alt="`${selectItem.user.options.company.companyName}公司logo`"
            />
          </div>
        </div>
        <div class="JobContent__txtBox d-flex flex-column justify-content-between pt-3">
          <h2 class="page__title mb-3">{{ selectItem.user.options.company.companyName }}</h2>
          <div class="d-flex justify-content-between align-items-end">
            <div>
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
    <div class="selectBox__section">
      <h3 class="page__title--sub"><span class="title__icon"></span>公司照片</h3>
      <div class="d-flex justify-content-between">
        <img
          v-for="(item, index) in selectItem.user.options.company.companyImagesUrl"
          class="companyPage__companyImage"
          :src="item"
          :alt="`${selectItem.user.options.company.companyName}公司圖片${index}`"
          :key="index"
        />
      </div>
    </div>
    <div class="selectBox__section">
      <h3 class="page__title--sub"><span class="title__icon"></span>公司簡介</h3>
      <div class="page__txt" v-html="selectItem.user.options.company.companyInfo"></div>
    </div>
  </div>
  <!-- 職位 -->
  <div ref="adminSelectBox" class="adminSelectBox box--shadow" v-if="navState === 'add-job'">
    <div class="selectBox__section">
      <div class="row">
        <div class="col-7">
          <h4 class="pageSubTitle mb-2">{{ selectItem.user.options.job.jobName }}</h4>
          <p class="sideList__item__subTxt">更新時間：{{ $filters.date(selectItem.create_at) }}</p>
        </div>
        <div class="col-5">
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-gray-line me-2">
              <p class="text-dark">審核通過</p>
            </button>
            <button
              type="button"
              class="btn  btn-gray-light me-2"
              data-action="newJob"
              :data-id="selectItem.id"
              @click="newItemModal($event)"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
            <button
              type="button"
              class="btn  btn-gray-light"
              data-action="deleteItem"
              :data-id="selectItem.id"
              @click="deleteOrder(selectItem.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="selectBox__section">
      <h4 class="pageSubTitle mb-2">訂單資料</h4>
      <ul>
        <li class="innerList__item">
          <p>編號：{{ selectItem.id }}</p>
        </li>
        <li class="innerList__item">
          <p>企業來源：{{ selectItem.user.options.company.companyName }}</p>
        </li>
        <li class="innerList__item">
          <p>聯絡人：{{ selectItem.user.name }}</p>
        </li>
        <li class="innerList__item">
          <p>聯絡電話：{{ selectItem.user.tel }}</p>
        </li>
        <li class="innerList__item">
          <p>聯絡Email：{{ selectItem.user.email }}</p>
        </li>
        <li class="innerList__item">
          <p>企業剩餘額度：{{ selectItem.user.options.company.companyJobToken }}</p>
        </li>
        <li class="innerList__item">
          <div class="d-flex align-items-center" v-if="!selectItem.user.options.company.costToken">
            <p class="me-2">方案：免費方案</p>
            <button type="button" class="btn btn-primary">
              立即付費推播，提高曝光度！
            </button>
          </div>
          <div
            class="d-flex align-items-center"
            v-if="selectItem.user.options.company.costToken === 1"
          >
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
          <img
            class="jobImage"
            :src="selectItem.user.options.job.jobImageUrl"
            :alt="`${selectItem.user.options.job.jobName}職位圖片`"
          />
          <div class="logoImageBox">
            <img
              class="logoImage"
              :src="selectItem.user.options.company.companyLogoUrl"
              :alt="`${selectItem.user.options.company.companyName}公司logo`"
            />
          </div>
        </div>
        <div class="JobContent__txtBox d-flex flex-column justify-content-between">
          <div class="pt-3">
            <h2 class="page__title">{{ selectItem.user.options.job.jobName }}</h2>
            <p class="page__txt page__link subTxt  mb-4 d-block">
              {{ selectItem.user.options.company.companyName }}
            </p>
          </div>
          <div class="d-flex justify-content-between align-items-end">
            <div>
              <p class="page__txt mb-3">
                <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                >{{ selectItem.user.options.company.companyAddressCity }}
              </p>
              <p class="page__txt">
                <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                  selectItem.user.options.job.needPerson
                }}
              </p>
            </div>
            <div>
              <p class="text-primary fw-bold mb-3">{{ selectItem.user.options.job.salary }}/月薪</p>
              <p class="subTxt text-secondary text-end">
                {{ $filters.date(selectItem.create_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="selectBox__section   mb-3">
      <h3 class="page__title--sub"><span class="title__icon"></span>職位內容</h3>
      <p class="page__txt mb-2">工作性質：{{ selectItem.user.options.job.workType }}</p>
      <p class="page__txt mb-2">工作時間：{{ selectItem.user.options.job.workTime }}</p>
      <p class="page__txt mb-2">產業類別：{{ selectItem.user.options.company.industryCategory }}</p>
      <p class="page__txt mb-2">工作類別：{{ selectItem.user.options.job.jobCategory }}</p>
      <p class="page__txt mb-2">工作內容：</p>
      <div class="page__txt" v-html="selectItem.user.options.job.jobContent"></div>
    </div>
    <div class="selectBox__section  mb-3">
      <h3 class="page__title--sub"><span class="title__icon"> </span>應徵條件</h3>
      <p class="page__txt mb-2">學歷要求：{{ selectItem.user.options.job.education }}</p>
      <p class="page__txt mb-2">工作經驗：{{ selectItem.user.options.job.workExp }}</p>
      <p class="page__txt mb-2">其他條件：</p>
      <div class="page__txt" v-html="selectItem.user.options.job.otherRequirement"></div>
    </div>
    <div class="selectBox__section">
      <h3 class="page__title--sub"><span class="title__icon"> </span>申請方法</h3>
      <p class="page__txt mb-2">職位聯絡人：{{ selectItem.user.name }}</p>
      <p class="page__txt mb-2">聯絡信箱：{{ selectItem.user.email }}</p>
      <p class="page__txt mb-2">聯絡電話：{{ selectItem.user.tel }}</p>
      <p class="page__txt mb-2">申請備註：</p>
      <div class="page__txt" v-html="selectItem.user.options.job.otherApplyInfo"></div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  props: ['tem-item', 'navState'],
  data() {
    return {
      selectItem: {},
    };
  },
  watch: {
    temItem: {
      deep: true,
      handler(newValue) {
        this.selectItem = newValue;
      },
    },
  },
  methods: {
    getOrderItem(selectItem) {
      this.selectItem = {};
      this.selectItem = selectItem;
    },
  },
  mounted() {
    emitter.on('get-admin-order-item', this.getOrderItem);
  },
  unmounted() {
    emitter.off('get-admin-order-item', this.getOrderItem);
  },
};
</script>

<style lang="scss"></style>
