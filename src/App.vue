<template>
  <router-view v-if="isRouterAlive"></router-view>
  <Spinner />
  <SpinnerBg />
  <AlertMessage />
</template>

<script>
import Spinner from '@/components/helpers/Spinner.vue';
import SpinnerBg from '@/components/helpers/SpinnerBg.vue';
import AlertMessage from '@/components/helpers/AlertMessage.vue';

export default {
  components: {
    Spinner,
    SpinnerBg,
    AlertMessage,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';
</style>
