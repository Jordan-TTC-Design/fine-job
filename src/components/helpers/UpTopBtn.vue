<template>
  <button
    ref="upTopBtn"
    type="button"
    class="d-none sideIconBtn upTopBtn btn btn-light"
    @click="toTop"
  >
    <i class="jobIcon bi bi-arrow-up"></i>
  </button>
</template>

<script>
export default {
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      swiperNum: 1,
    };
  },
  watch: {
    scrollTop(newValue) {
      if (newValue > 500) {
        this.$refs.upTopBtn.classList.remove('d-none');
        this.$refs.upTopBtn.classList.add('show');
      } else {
        this.$refs.upTopBtn.classList.remove('show');
        setTimeout(() => {
          this.$refs.upTopBtn.classList.add('d-none');
        }, 100);
      }
    },
  },
  methods: {
    toTop() {
      document.documentElement.scrollTop = 0;
    },
  },
  mounted() {
    const vm = this;
    vm.fullWidth = window.innerWidth;
    vm.fullHeight = window.innerHeight;
    vm.scrollTop = window.scrollY;
    window.onresize = () => {
      vm.fullWidth = window.innerWidth;
      vm.fullHeight = window.innerHeight;
    };
    window.onscroll = () => {
      vm.scrollTop = window.scrollY;
    };
  },
};
</script>

<style></style>
