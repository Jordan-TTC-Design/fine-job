<template>
  <div ref="spinner" class="spinnerContainer">
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
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  methods: {
    spinnerOpen() {
      this.$refs.spinner.classList.add('spinner--open');
    },
    spinnerClose() {
      this.$refs.spinner.classList.remove('spinner--open');
    },
  },
  mounted() {
    emitter.on('spinner-close', this.spinnerClose);
    emitter.on('spinner-open', this.spinnerOpen);
  },
  unmounted() {
    emitter.off('spinner-close', this.spinnerClose);
    emitter.off('spinner-open', this.spinnerOpen);
  },
};
</script>

<style lang="scss"></style>
