<template>
    <div
        ref="delProductModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="delProductModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{temProduct.title}}</strong>
              商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="$emit('deltet-product')"
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import emitter from '@/components/helpers/emitter';
import { Modal } from 'bootstrap';

export default {
  props: ['temProduct'],
  data() {
    return {
      modal: '',
      modalTemProduct: {},
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  temProduct: {
    deep: true,
    handler(newValue) {
      this.modalTemProduct = newValue;
    },
  },
  created() {
    emitter.on('close-product-delete', () => {
      this.closeModal();
    });
    emitter.on('open-product-delete', () => {
      this.openModal();
    });
    console.log(this.temProduct);
    this.modalTemProduct = this.temProduct;
  },
  mounted() {
    this.modal = new Modal(this.$refs.delProductModal);
    console.log(Modal);
  },
};
</script>
