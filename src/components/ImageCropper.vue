<template>
  <div class="container">
    <div class="img-container">
      <img ref="companyImage" :src="src" alt="" />
    </div>
  </div>
  <div>
  <img ref="cropImage" src="" alt="" class="img-preview" />

  </div>
</template>
<script>
import Cropper from 'cropperjs';

export default {
  name: 'ImageCropper',
  props: { src: String },
  data() {
    return {
      cropper: {},
      destination: {},
      image: {},
    };
  },
  mounted() {
    this.image = this.$refs.companyImage;
    this.cropper = new Cropper(this.image, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1, // 比例
      crop: () => {
        const canves = this.cropper.getCroppedCanvas();
        // console.log(canves);
        this.$refs.cropImage.src = canves.toDataURL('image/png');
      },
    });
    console.dir(this.$refs.cropImage);
    // this.cropper.crop();
  },
};
</script>
<style lang="scss">
.img-container {
  width: 640px;
  height: 480px;
}
.img-preview{
  width: 200px;
  height: 200px;

}
</style>
