<template>
<router-view>

</router-view>
<spinner></spinner>

</template>
<script>
import Spinner from './components/Spinner.vue';

export default {
  components: {
    Spinner,
  },
  created() {
  },
};
</script>
<style lang="scss">
@import './assets/scss/all';
</style>
