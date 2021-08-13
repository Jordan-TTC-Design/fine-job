<template>
  <div ref="jobCollectModal" class="modal fade" tabindex="-1" aria-labelledby="jobCollectModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="jobCollectModal" class="modal-title">
            <span>新增產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-1">
                <div class="form-group">
                  <label for="imageUrl">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="modalTemProduct.imageUrl"
                  />
                </div>
                <img class="img-fluid" alt="圖片" :src="modalTemProduct.imageUrl" />
                <div class="imageBtnBox">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="addImageUrl()"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-if="modalTemProduct.imagesUrl.length > 0 || false">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="deleteImageUrl()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-if="modalTemProduct.imagesUrl.length > 0">
                <div v-for="(item, index) in modalTemProduct.imagesUrl" :key="index">
                  <div class="form-group">
                    <label for="imageUrl">輸入第 {{ index + 1 }} 張圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model="modalTemProduct.imagesUrl[index]"
                    />
                  </div>
                  <img class="img-fluid" :alt="`第${index}張職位圖片`" :src="item" />
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="modalTemProduct.title"
                />
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    v-model="modalTemProduct.category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="unit">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="modalTemProduct.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="modalTemProduct.origin_price"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="modalTemProduct.price"
                  />
                </div>
              </div>
              <hr />

              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="modalTemProduct.description"
                >
                </textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="modalTemProduct.content"
                >
                </textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="modalTemProduct.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import { Modal } from 'bootstrap/js/dist/modal';

export default {
  props: ['temProduct'],
  data() {
    return {
      jobCollectModal: {},
      modalTemProduct: { imagesUrl: [] },
    };
  },
  methods: {
    addImageUrl() {
      this.modalTemProduct.imagesUrl.push('');
    },
    deleteImageUrl() {
      this.modalTemProduct.imagesUrl.pop();
    },
    updateProduct() {
      this.$emit('update-product', this.modalTemProduct);
    },
    openModal() {
      this.jobCollectModal.show();
    },
    closeModal() {
      this.jobCollectModal.hide();
    },
  },
  watch: {
    temProduct: {
      deep: true,
      handler(newValue) {
        this.modalTemProduct = newValue;
      },
    },
  },
  created() {
    this.modalTemProduct = this.temProduct;
  },
  mounted() {
    this.jobCollectModal = new Modal(this.$refs.productModal);
    emitter.on('close-product-detail', this.closeModal);
    emitter.on('open-product-detail', this.openModal);
  },
  unmounted() {
    this.jobCollectModal.dispose();
    emitter.off('close-product-detail', this.closeModal);
    emitter.off('open-product-detail', this.openModal);
  },
};
</script>

<style lang="scss">
.modal.show {
  display: block;
}
</style>
