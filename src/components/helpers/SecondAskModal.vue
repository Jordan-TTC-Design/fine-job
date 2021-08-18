<template>
  <div
    ref="deleteModal"
    class="deleteModal modal fade"
    id="deleteModal"
    aria-hidden="true"
    aria-labelledby="deleteModalLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex justify-content-between mb-4">
            <div>
              <h3 class="section__title--sub mb-2">
                <span class="title__icon"></span>{{ sentItem.action }}
              </h3>
            </div>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <p class="text-center mb-4">請問您確定要刪除?</p>
          <p class="text-center mb-6 text-primary ">{{ sentItem.itemName }}</p>
          <div class="d-flex">
            <button type="button" class="btn btn-gray-light me-2 flex-grow-1" @click="closeModal">
              返回
            </button>
            <button
              type="button"
              class="btn btn-primary flex-grow-1"
              @click="deleteTarget(sentItem.itemId)"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import emitter from '@/methods/emitter';

export default {
  emits: ['delete-target'],
  data() {
    return {
      deleteModal: {},
      sentItem: {},
    };
  },
  methods: {
    openModal() {
      this.deleteModal.show();
    },
    closeModal() {
      this.deleteModal.hide();
    },
    deleteTarget() {
      this.$emit('delete-target', this.sentItem.itemId);
      this.deleteModal.hide();
    },
    emitOpenDeleteModal(temItem) {
      this.deleteModal.show();
      this.sentItem = { ...temItem };
    },
  },
  mounted() {
    this.deleteModal = new Modal(this.$refs.deleteModal);
    emitter.on('open-delete-product-modal', this.emitOpenDeleteModal);
  },
  unmounted() {
    this.sentItem = {};
    this.deleteModal.dispose();
    emitter.off('open-delete-product-modal', this.emitOpenDeleteModal);
  },
};
</script>
