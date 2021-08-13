<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="imageCropperModal"
    aria-hidden="true"
    ref="imageCropperModal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">編輯照片{{ nowId }}</h5>
          <button type="button" @click="closeModal" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-8">
                <div class="cropperImageBox">
                  <img class="cropperImage" ref="cropperImage" src="" alt="原圖" />
                </div>
              </div>
              <div class="col-4">
                <div class="compeletedImgBox">
                  <p>預覽圖</p>
                  <img class="img-preview" :src="destination" alt="圖片預覽" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" @click="processImage">
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import Modal from 'bootstrap/js/dist/modal';
import Cropper from 'cropperjs';

export default {
  data() {
    return {
      imageCropperModal: {},
      cropper: {},
      cropsrc: '',
      nowId: 0,
      isImg: false,
      imgData: {},
      destination: {},
    };
  },
  methods: {
    putImage(data) {
      const reader = new FileReader();
      if (data) {
        this.isImg = true;
        reader.readAsDataURL(data);
        reader.onload = () => {
          const dataURL = reader.result;
          this.imgData = this.$refs.cropperImage;
          this.imgData.src = dataURL;
          this.cropper = new Cropper(this.imgData, {
            aspectRatio: 16 / 9,
            viewMode: 0,
            dragMode: 'move',
            minContainerWidth: 480,
            minContainerHeight: 360,
            zoomable: true,
            scalable: true,
            crop: () => {
              const canves = this.cropper.getCroppedCanvas({
                maxWidth: 960,
                maxHeight: 720,
              });
              this.destination = canves.toDataURL('image/jpeg');
            },
          });
          this.openModal();
        };
      }
    },
    processImage() {
      const canves = this.cropper.getCroppedCanvas({
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: '#fff',
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high',
      });
      this.cropsrc = canves.toDataURL('image/jpeg');
      this.sendbackImg();
    },
    sendbackImg() {
      this.$emit('emit-send-img-data', this.cropsrc, this.nowId - 1);
      this.closeModal();
    },
    cleanImg() {
      if (this.isImg) {
        this.cropsrc = '';
        this.cropper.destroy();
        this.isImg = false;
      }
    },
    closeModal() {
      this.imageCropperModal.hide();
      this.cleanImg();
    },
    openModal() {
      this.imageCropperModal.show();
    },
    emitOpenImageCropper(data) {
      // 檢查有無之前遺留的
      if (this.cropper !== {}) {
        this.cleanImg();
      }
      if (data[2] === 'upLoadSingleImg') {
        this.nowId = '';
      } else {
        const id = Number(data[1]);
        this.nowId = id + 1;
      }
      setTimeout(() => {
        this.putImage(data[0]);
      }, 1500);
    },
  },
  mounted() {
    this.imageCropperModal = new Modal(this.$refs.imageCropperModal);
    emitter.on('open-imageCropper', this.emitOpenImageCropper);
    emitter.on('close-imageCropper', this.closeModal);
    emitter.on('delete-imageCropper', this.cleanImg);
  },
  unmounted() {
    this.imageCropperModal.dispose();
    emitter.off('close-imageCropper', this.closeModal);
    emitter.off('delete-imageCropper', this.cleanImg);
    emitter.off('open-imageCropper', this.emitOpenImageCropper);
  },
};
</script>

<style lang="scss">
.cropperImageBox {
  display: block;
  width: 100%;
  background: color #f7f7f7;
  .cropperImage {
    max-width: 100%;
  }
}
.cropper-container {
  min-height: 360px;
  min-width: 480px;
  img {
    display: block;
    height: 100%;
    image-orientation: 0deg;
    max-height: none !important;
    max-width: none !important;
    min-height: 0 !important;
    min-width: 0 !important;
    width: 100%;
  }
}
.compeletedImgBox {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 160px !important;
    height: 90px !important;
  }
}
.img-preview {
  max-width: 160px;
  max-height: 90px;
}
</style>
