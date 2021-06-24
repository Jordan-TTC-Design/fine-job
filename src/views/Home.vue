<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <ImageCropper src="/logo.png"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ImageCropper from '@/components/ImageCropper.vue';

export default {
  name: 'Home',
  components: {
    ImageCropper,
  },
};
</script>
