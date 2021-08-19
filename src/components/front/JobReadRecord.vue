<template>
  <div class="jobSubBox box--shadow mb-3">
    <h5 class="jobSubBox__title">瀏覽紀錄</h5>
    <ul>
      <template v-for="(jobRead, index) in jobReadListReverse" :key="jobRead.id">
        <li class="list__item" v-if="index < 6">
          <p class="list__item__link mb-2 putPointer" @click="goToJobRead(jobRead.id)">
            {{ jobRead.title }}
          </p>
          <p
            class="list__item__link--sub putPointer"
            aria-current="page"
            @click="goToCompanyRead(jobRead.companyId)"
          >
            {{ jobRead.company }}
          </p>
          <p class="list__item__time">{{ $filters.date(jobRead.time) }}</p>
        </li>
      </template>
      <li class="list__item" v-if="jobReadListReverse.length === 0">
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
      jobReadListReverse: [],
    };
  },
  watch: {
    jobReadList(newValue) {
      if (this.jobReadList.length > 6) {
        this.jobReadList.splice(0, 1);
        const temData = JSON.stringify(this.jobReadList);
        localStorage.setItem('jobReadList', temData);
      }
      this.jobReadListReverse = [];
      const temArray = newValue.reverse();
      this.jobReadListReverse = [...temArray];
    },
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
    goToJobRead(id) {
      this.$router.push(`/products-list/product/${id}`);
    },
    goToCompanyRead(id) {
      this.$router.push(`/products-list/company/${id}`);
    },
    emitCheckJobReadLocal(sendObj) {
      if (sendObj) {
        this.sentJob = sendObj.job;
        this.sentCompany = sendObj.company;
        this.checkLocalJobRead(this.sentJob.id);
      } else {
        this.getLocalStorage();
      }
    },
  },
  mounted() {
    emitter.on('check-job-read-local', this.emitCheckJobReadLocal);
  },
  unmounted() {
    emitter.off('check-job-read-local', this.emitCheckJobReadLocal);
  },
};
</script>

<style lang="scss"></style>
