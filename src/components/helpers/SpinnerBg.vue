<template>
  <div ref="spinnerBg" class="spinnerContainer spinnerContainer--bg">
    <div class="spinnerBox">
      <div class="personBox personBox--left">
        <div class="person__shadow person--left"></div>
        <div class="person  person--left">
          <div class="person__eye">
            <div class="mask">
              <div class="eyeBall"></div>
            </div>
          </div>
          <div class="person__eye">
            <div class="mask">
              <div class="eyeBall"></div>
            </div>
          </div>
        </div>
        <div class="person__talk person__talk--left">
          <div class="person__talk__dot talk__dot--animation"></div>
          <div class="person__talk__dot talk__dot--animation double-bounce2"></div>
          <div class="person__talk__dot talk__dot--animation double-bounce3"></div>
        </div>
      </div>
      <div class="personBox personBox--right">
        <div class="person__talk person__talk--right">
          <div class="person__talk__dot talk__dot--animation double-bounce3"></div>
          <div class="person__talk__dot talk__dot--animation double-bounce2"></div>
          <div class="person__talk__dot talk__dot--animation"></div>
        </div>
        <div class="person__shadow person--right person__shadow--right"></div>
        <div class="person person--right">
          <div class="person__eye">
            <div class="mask">
              <div class="eyeBall"></div>
            </div>
          </div>
          <div class="person__eye">
            <div class="mask">
              <div class="eyeBall"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="spinnerBg__logoBox">
      <h1>
        <img
          class="header__logo"
          src="../../assets/images/header/fineJobLogo-white.svg"
          alt="Fine Job logo"
        />
      </h1>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  methods: {
    spinnerOpen(time) {
      this.$refs.spinnerBg.classList.add('spinner--open--bg');
      setTimeout(() => {
        this.spinnerClose();
      }, time);
    },
    spinnerClose() {
      this.$refs.spinnerBg.classList.remove('spinner--open--bg');
    },
  },
  mounted() {
    emitter.on('spinner-close-bg', this.spinnerClose);
    emitter.on('spinner-open-bg', this.spinnerOpen);
  },
  unmounted() {
    emitter.off('spinner-close-bg', this.spinnerClose);
    emitter.off('spinner-open-bg', this.spinnerOpen);
  },
};
</script>

<style lang="scss"></style>
