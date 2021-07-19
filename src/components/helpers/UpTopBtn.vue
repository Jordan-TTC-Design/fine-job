<template>
  <button type="btn" class="sideIconBtn upTopBtn btn btn-light" @click="toTop">
    <i class="jobIcon bi bi-arrow-up"></i>
  </button>
</template>
<script>
export default {
  methods: {
    toTop() {
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style>
</style>
