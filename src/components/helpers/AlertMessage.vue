<template>
  <div class="alertMessageBoxContainer" v-if="modalOpen === true" @click="closeModal">
    <div class="alertMessageBox">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      message: '',
      modalOpen: false,
    };
  },
  methods: {
    closeModal() {
      this.message = '';
      this.modalOpen = false;
    },
    openModal(txt) {
      this.message = txt;
      this.modalOpen = true;
      setTimeout(() => {
        this.closeModal();
      }, 5000);
    },
  },
  mounted() {
    emitter.on('alertMessage-open', this.openModal);
    emitter.on('alertMessage-close', this.closeModal);
  },
  unmounted() {
    this.closeModal();
    emitter.off('alertMessage-open', this.openModal);
    emitter.off('alertMessage-close', this.closeModal);
  },
};
</script>

<style lang="scss"></style>
