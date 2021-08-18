<template>
  <!-- 訂單 -->
  <!-- 企業 -->
  <ul class="admin-sideList list-group box--shadow" v-if="navState === 'add-company'">
    <li class="list-group-item d-flex justify-content-between align-items-center bg-white p-3">
      <p class="subTxt">目前共 {{ sideList.length }} 間公司</p>
      <button type="button" class="btn"><i class="bi bi-search"></i></button>
    </li>
    <li
      class="sideList__item list-group-item list-group-item-action"
      v-for="item in sideList"
      :key="item.id"
      @click="selectListItem(item.id)"
    >
      <p class="sideList__item__title mb-1">{{ item.user.options.company.companyName }}</p>
      <p class="sideList__item__subTxt">訂單時間：{{ $filters.date(item.create_at) }}</p>
    </li>
  </ul>
  <!-- 職位 -->
  <ul class="admin-sideList list-group box--shadow" v-if="navState === 'add-job'">
    <li class="list-group-item d-flex justify-content-between align-items-center bg-white p-3">
      <p class="subTxt">目前共 {{ sideList.length }} 個職位</p>
      <button type="button" class="btn"><i class="bi bi-search"></i></button>
    </li>
    <li
      class="sideList__item list-group-item list-group-item-action"
      v-for="item in sideList"
      :key="item.id"
      @click="selectListItem(item.id)"
    >
      <p class="sideList__item__title mb-1">{{ item.user.options.job.jobName }}</p>
      <p class="sideList__item__subTxt">訂單時間：{{ $filters.date(item.create_at) }}</p>
    </li>
  </ul>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  props: ['sentSideList'],
  emits: ['sent-select-item'],
  data() {
    return {
      navState: 'add-company',
      sideList: [],
      selectItem: {},
    };
  },
  watch: {
    sentSideList: {
      deep: true,
      handler(newValue) {
        this.sideList = [];
        this.sideList = newValue;
      },
    },
  },
  methods: {
    getAdminNavState(state) {
      this.navState = state;
    },
    selectListItem(itemId) {
      this.selectItem = {
        state: this.navState,
        content: {},
      };
      this.sideList.forEach((item) => {
        if (item.id === itemId) {
          this.selectItem = item;
        }
      });
      this.$emit('sent-select-item', this.selectItem);
    },
  },
  mounted() {
    emitter.on('get-admin-nav-state', this.getAdminNavState);
  },
  unmounted() {
    emitter.off('get-admin-nav-state', this.getAdminNavState);
  },
};
</script>

<style lang="scss"></style>
