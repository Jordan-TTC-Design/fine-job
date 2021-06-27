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
          <h5 class="modal-title" id="exampleModalLabel">編輯照片{{ nowId }}</h5>
          <button type="button" @click="closeModal" class="btn-close" aria-label="Close"></button>
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
          <button type="button" class="btn btn-outline-primary" @click="sendbackImg">
            確定
          </button>
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
      nowId: 0,
      isImg: false,
    };
  },
  methods: {
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
              console.log(this.cropper);
              this.cropsrc = canves.toDataURL('image/jpeg');
              this.isImg = true;
            },
          });
        };
      }
    },
    sendbackImg() {
      this.cropper
        .getCroppedCanvas({
          maxWidth: 4096,
          maxHeight: 4096,
          fillColor: '#fff',
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high',
        })
        .toBlob((blob) => {
          console.log(blob);
          this.$emit('emit-send-img-data', blob, this.$refs.cropImage, this.nowId - 1);
        });
      this.$emit('emit-send-img-data', this.$refs.cropImage, this.nowId - 1);
      console.log(this.$refs.cropImage);
      this.modalFillState = false;
      this.cropper.destroy();
      this.closeModal();
    },
    cleanImg() {
      if (this.isImg) {
        console.log('delete');
        this.cropper.destroy();
        this.isImg = false;
      }
    },
    closeModal() {
      this.modal.hide();
      this.cleanImg();
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
      const id = Number(data[1]);
      this.nowId = id + 1;
      this.openModal();
      this.putImage(data[0]);
    });
  },
  mounted() {
    this.modal = new Modal(this.$refs.imageCropperModal);
  },
};
</script>

<style lang="scss">
.img-container {
  width: 320px;
  height: 180px;
}
.img-preview {
  width: 320px;
  height: 180px;
}
</style>
