<template>
  <div class="imgPopModalContainer" v-if="imgPopModalState">
    <div class="img-cover" @click="closeModal"></div>
    <div class="imgPopModalBox" >
      <img class="imgPopModalBox__img" :src="imgPopUrl" alt="展示圖片" />
      <!-- <img
        class="imgPopModalBox__img"
        src="https://images.unsplash.com/photo-1606787619248-f301830a5a57?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        alt="展示圖片"
      /> -->
      <button
        type="button"
        class="closeBtn btn btn-lg btn-outline-light rounded-circle iconBtnBox"
        @click="closeModal"
      >
        <i class="bi bi-x actionIcon"></i>
      </button>
      <div class="changeImgBtnBox" v-if="changeBtnState">
        <button
          type="button"
          class="changeImgBtnBox__pre btn btn-lg rounded-circle iconBtnBox"
          @click="preImg"
        >
          <i class="bi bi-arrow-left actionIcon"></i>
        </button>
        <button
          type="button"
          class="changeImgBtnBox__next btn btn-lg rounded-circle iconBtnBox"
          @click="nextImg"
        >
          <i class="bi bi-arrow-right actionIcon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      imgPopUrl: '',
      imgPopUrlObj: {},
      imgPopModalState: false,
      nowNumber: 0,
      changeBtnState: true,
    };
  },
  methods: {
    preImg() {
      if (this.nowNumber < this.imgPopUrlObj.length && this.nowNumber > 0) {
        this.nowNumber -= 1;
        this.imgPopUrl = this.imgPopUrlObj[this.nowNumber];
      } else if (this.nowNumber === 0) {
        this.nowNumber = this.imgPopUrlObj.length - 1;
        this.imgPopUrl = this.imgPopUrlObj[this.nowNumber];
      }
    },
    nextImg() {
      if (this.nowNumber < this.imgPopUrlObj.length - 1) {
        this.nowNumber += 1;
        this.imgPopUrl = this.imgPopUrlObj[this.nowNumber];
      } else if (this.nowNumber === this.imgPopUrlObj.length - 1) {
        this.nowNumber = 0;
        this.imgPopUrl = this.imgPopUrlObj[this.nowNumber];
      }
    },
    closeModal() {
      this.imgPopModalState = false;
    },
    openModal() {
      this.imgPopModalState = true;
    },
  },
  created() {
    // this.imgPopUrl = this.imgUrl;
    emitter.on('imgPopModal-open', (item) => {
      this.openModal();
      const temType = typeof item;
      console.log(temType);
      if (temType === 'object') {
        console.log(item);
        this.imgPopUrlObj = item;
        console.log(this.imgPopUrlObj.length);
        this.imgPopUrl = this.imgPopUrlObj[this.nowNumber];
        console.log(this.imgPopUrl);
        console.log(this.imgPopUrlObj[this.nowNumber]);
        this.changeBtnState = true;
      } else if (temType === 'string') {
        console.log(item);
        this.imgPopUrl = item;
        this.changeBtnState = false;
      }
    });
  },
};
</script>

<style lang="scss">
.imgPopModalContainer {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 800;
  .img-cover {
    background-color: rgba(0, 0, 0, 0.75);
  }
  .iconBtnBox {
    background-color: rgba(255, 255, 255, 0);
    .actionIcon {
      color: #fff;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
}
.imgPopModalBox {
  width: 75%;
  max-height: 80%;
  z-index: 888;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &__img {
    width: 100%;
    max-height: 100%;
    border-radius: 0.5rem;
    z-index: 900;
    object-fit: contain;
  }
  .closeBtn {
    position: absolute;
    bottom: -4rem;
    &::before {
      content: '';
      position: absolute;
      top: -5rem;
      height: 5rem;
      border-left: 1px solid #fff;
    }
  }
  .changeImgBtnBox {
    z-index: 1000;
    width: 110%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    .iconBtnBox {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
