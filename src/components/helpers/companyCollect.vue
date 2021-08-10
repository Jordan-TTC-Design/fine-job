<template>
  <div
    ref="companyCollectModal"
    class="companyCollectModal modal fade"
    id="companyCollectModal"
    aria-hidden="true"
    aria-labelledby="companyCollectModalLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex justify-content-between mb-4">
            <div>
              <h3 class="section__title--sub mb-2"><span class="title__icon"></span>取消收藏</h3>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="companyCollectModal"
              aria-label="Close"
            ></button>
          </div>
          <h4>請問您確定要取消收藏 {{ sentCompany.title }} ?</h4>
          <div class="d-flex">
            <button
              class="btn btn-gray-light me-2"
              data-bs-toggle="companyCollectModal"
              data-bs-dismiss="companyCollectModal"
            >
              返回
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              @click="deleteCompanyFromLocal(sentCompany.id)"
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
import emitter from '@/methods/emitter';
import Modal from 'bootstrap/js/dist/modal';

export default {
  emits: ['return-company-collection'],
  data() {
    return {
      companyModal: {},
      companyCollection: [],
      sentCompany: {},
    };
  },
  methods: {
    openModal() {
      console.log(this.companyModal);
      this.companyModal.show();
    },
    closeModal() {
      this.companyModal.hide();
    },
    // 執行判斷要收藏還是刪除企業
    toggleCollectCompany(companyId) {
      console.log(this.companyCollection);
      const checkResult = this.companyCollection.some((item) => item.id === companyId);
      if (checkResult === false) {
        this.saveCompanyToLocal();
      } else {
        this.openModal();
      }
    },
    // 收藏企業
    saveCompanyToLocal() {
      // 先收集需要的資料
      const Obj = {
        title: this.sentCompany.title,
        id: this.sentCompany.id,
        category: this.sentCompany.category,
        logoImageUrl: this.sentCompany.imageUrl,
        imagesUrl: this.sentCompany.imagesUrl,
        time: `${Math.floor(Date.now() / 1000)}`,
      };
      this.companyCollection.push(Obj);
      const temData = JSON.stringify(this.companyCollection);
      localStorage.setItem('fineJob-companyCollection', temData);
      this.getLocalCompanyStorage();
    },
    // 刪除企業
    deleteCompanyFromLocal(id) {
      this.companyCollection.forEach((item, index) => {
        if (item.id === id) {
          this.companyCollection.splice(index, 1);
        }
      });
      const temData = JSON.stringify(this.companyCollection);
      localStorage.setItem('fineJob-companyCollection', temData);
      this.getLocalCompanyStorage();
      this.closeModal();
    },
    // 瀏覽紀錄相關方法
    // 取得瀏覽紀錄
    getLocalCompanyStorage() {
      const temcompanyCollectionsArray = JSON.parse(
        localStorage.getItem('fineJob-companyCollection'),
      );
      if (temcompanyCollectionsArray) {
        this.companyCollection = temcompanyCollectionsArray;
      }
      console.log(this.companyCollection);
      this.returnCompanyCollection();
    },
    returnCompanyCollection() {
      this.$emit('return-company-collection', this.companyCollection);
    },
    // emit監聽
    emitOpenCollectModal(item) {
      console.log('open Modal');
      this.sentCompany = item;
      console.log(this.sentCompany);
      this.toggleCollectCompany(this.sentCompany.id);
    },
  },
  created() {
    this.getLocalCompanyStorage();
  },
  mounted() {
    this.companyModal = new Modal(this.$refs.companyCollectModal);
    emitter.on('open-collect-company-modal', this.emitOpenCollectModal);
  },
  unmounted() {
    this.companyModal.dispose();
    emitter.off('open-collect-company-modal', this.emitOpenCollectModal);
  },
};
</script>

<style lang="scss"></style>
