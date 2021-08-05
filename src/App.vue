<template>
  <router-view v-if="isRouterAlive"> </router-view>
  <spinner></spinner>
</template>

<script>
import Spinner from '@/components/helpers/Spinner.vue';

export default {
  components: {
    Spinner,
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
      console.log('reload occure');
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
