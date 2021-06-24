<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="imageCropperModal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">編輯照片</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-8">
                <div class="img-container">
                  <img class="w-100" ref="companyImage" :src="src" alt="" />
                </div>
              </div>
              <div class="col-4">
                <img ref="cropImage" :src="cropsrc" alt="" class="img-preview" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <router-link
            to="/cart-checkout"
            type="button"
            class="btn btn-outline-primary"
            @click="closeModal"
          >
            結帳
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';
import { Modal } from 'bootstrap';
import Cropper from 'cropperjs';

export default {
  name: 'ImageCropper',
  data() {
    return {
      modal: {},
      cropper: {},
      destination: {},
      image: {},
      src: '',
      cropsrc: '',
    };
  },
  methods: {
    // putImage(data) {
    //   this.src = data.getAttribute('src');
    //   this.image = this.$refs.companyImage;
    //   this.cropper = new Cropper(this.image, {
    //     zoomable: false,
    //     scalable: false,
    //     aspectRatio: 16 / 9, // 比例
    //     crop: () => {
    //       const canves = this.cropper.getCroppedCanvas();
    //       console.log(canves);
    //       this.cropsrc = canves.toDataURL('image/png');
    //     },
    //   });
    // },
    putImage(data) {
      const reader = new FileReader();
      if (data) {
        reader.readAsDataURL(data);
        reader.onload = (event) => {
          console.log(event);
          const dataURL = reader.result;
          this.$refs.companyImage.src = dataURL;
          this.imageSrc = this.$refs.companyImage;
          // console.log(this.imageSrc);
          const image = this.$refs.companyImage;
          this.cropper = new Cropper(image, {
            aspectRatio: 16 / 9,
            viewMode: 0,
            dragMode: 'move',
            zoomable: false,
            scalable: false,
            crop: () => {
              const canves = this.cropper.getCroppedCanvas();
              console.log(canves);
              this.cropsrc = canves.toDataURL('image/png');
            },
          });
        };
      }
    },
    closeModal() {
      this.modal.hide();
    },
    openModal() {
      this.modal.show();
    },
  },
  watch: {},
  created() {
    emitter.on('close-imageCropper', () => {
      this.closeModal();
    });
    emitter.on('open-imageCropper', (data) => {
      console.log(data);
      this.openModal();
      this.putImage(data);
    });
  },
  mounted() {
    this.modal = new Modal(this.$refs.imageCropperModal);

    console.log(this.src);
  },
};
</script>

<style lang="scss">
.img-container{width: 320px;height: 180px;}
.img-preview{width: 320px; height: 180px;}
</style>
