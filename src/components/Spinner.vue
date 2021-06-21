<template>
  <div class="container-fuild">
    <div class="spinner" ref="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
      <div class="double-bounce3"></div>
    </div>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';

export default {
  methods: {
    spinnerOpen() {
      this.$refs.spinner.classList.add('spinner--open');
    },
    spinnerClose() {
      this.$refs.spinner.classList.remove('spinner--open');
    },
  },
  created() {
    emitter.on('spinner-close', () => {
      this.spinnerClose();
    });
    emitter.on('spinner-open', () => {
      this.spinnerOpen();
    });
  },
};
</script>

<style lang="scss">
.spinner {
  // margin: 0 auto;
  // width: 100%;
  // height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.05);
  display: none;
}
.spinner.spinner--open{
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner > div {
  height: 20px;
  width: 20px;
  display: inline-block;
  border-radius: 50%;
  background-color: #0B5ED7;
  -webkit-animation: flappy 1.4s infinite ease-in-out;
  animation: flappy 1.4s infinite ease-in-out;
}

.spinner .double-bounce2 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.spinner .double-bounce3 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

@keyframes flappy {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

</style>
