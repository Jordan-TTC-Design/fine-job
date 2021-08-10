<template>
  <div class="jobSubBox box--shadow mb-3">
    <h5 class="jobSubBox__title">瀏覽紀錄</h5>
    <ul>
      <template v-for="(jobRead, index) in jobReadList" :key="jobRead.id">
        <li class="list__item" v-if="index < 6">
          <p class="list__item__link mb-2" @click="goToJobRead(jobRead.id)">
            {{ jobRead.title }}
          </p>
          <p
            class="list__item__link--sub"
            aria-current="page"
            @click="goToCompanyRead(jobRead.companyId)"
          >
            {{ jobRead.company }}
          </p>
          <p class="list__item__time">{{ $filters.date(jobRead.time) }}</p>
        </li>
      </template>
      <li class="list__item" v-if="jobReadList.length === 0">
        <p>尚無瀏覽紀錄</p>
      </li>
    </ul>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  inject: ['reload'],
  data() {
    return {
      jobReadList: [],
      sentJob: {},
      sentCompany: {},
    };
  },
  methods: {
    // 瀏覽紀錄相關方法
    // 取得瀏覽紀錄
    getLocalStorage() {
      const temJobReadArray = JSON.parse(localStorage.getItem('jobReadList'));
      if (temJobReadArray) {
        this.jobReadList = temJobReadArray;
      }
    },
    // 檢查是否已經存在
    checkLocalJobRead(id) {
      this.getLocalStorage();
      if (!this.jobReadList) {
        this.jobReadList = [];
      }
      const checkData = this.jobReadList.some((item) => item.id === id);
      if (!checkData) {
        this.saveJobReadToLocal();
      }
    },
    // 存入local
    saveJobReadToLocal() {
      const Obj = {
        title: this.sentJob.title,
        company: this.sentCompany.title,
        companyId: this.sentCompany.id,
        id: this.sentJob.id,
        time: `${Math.floor(Date.now() / 1000)}`,
      };
      this.jobReadList.push(Obj);
      const temData = JSON.stringify(this.jobReadList);
      localStorage.setItem('jobReadList', temData);
    },
    // 跳轉紀錄的職位
    goToJobRead(id) {
      if (this.$route.path.match('/products-list/product/')) {
        this.$router.push(`/products-list/product/${id}`);
        this.reload();
      } else {
        this.$router.push(`/products-list/product/${id}`);
      }
    },
    // reload的時候怪怪的，還無法正確跳頁
    goToCompanyRead(id) {
      if (this.$route.path.match('/products-list/company/')) {
        this.$router.push(`/products-list/company/${id}`);
        this.reload();
      } else {
        this.$router.push(`/products-list/company/${id}`);
      }
    },
  },
  created() {
    emitter.on('check-job-read-local', (sendObj) => {
      if (sendObj) {
        this.sentJob = sendObj.job;
        this.sentCompany = sendObj.company;
        this.checkLocalJobRead(this.sentJob.id);
      } else {
        this.getLocalStorage();
      }
    });
  },
};
</script>

<style lang="scss"></style>
