<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="imageSquareCropperModal"
    aria-hidden="true"
    ref="imageSquareCropperModal"
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
                <div class="compeletedImgBox--square">
                  <p>預覽圖</p>
                  <img class="img-preview--square" :src="destination" alt="圖片預覽" />
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
      imageSquareCropperModal: {},
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
            aspectRatio: 1,
            viewMode: 1,
            dragMode: 'move',
            minContainerWidth: 480,
            minContainerHeight: 480,
            zoomable: true,
            scalable: true,
            crop: () => {
              const canves = this.cropper.getCroppedCanvas({
                maxWidth: 800,
                maxHeight: 800,
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
      this.imageSquareCropperModal.hide();
      this.cleanImg();
    },
    openModal() {
      this.imageSquareCropperModal.show();
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
    this.imageSquareCropperModal = new Modal(this.$refs.imageSquareCropperModal);
    emitter.on('open-imageSquareCropper', this.emitOpenImageCropper);
    emitter.on('close-imageSquareCropper', this.closeModal);
    emitter.on('delete-imageSquareCropper', this.cleanImg);
  },
  unmounted() {
    this.imageSquareCropperModal.dispose();
    emitter.off('close-imageSquareCropper', this.closeModal);
    emitter.off('delete-imageSquareCropper', this.cleanImg);
    emitter.off('open-imageSquareCropper', this.emitOpenImageCropper);
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
.compeletedImgBox--square {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 160px !important;
    height: 160px !important;
  }
}
.img-preview--square {
  max-width: 160px;
  max-height: 160px;
}
</style>
