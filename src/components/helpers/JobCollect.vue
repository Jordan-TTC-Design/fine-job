<template>
  <div
    ref="jobCollectModal"
    class="jobCollectModal modal fade"
    id="exampleModalToggle"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex justify-content-between mb-4">
            <div>
              <h3 class="section__title--sub mb-2"><span class="title__icon"></span>職位收藏</h3>
              <p class="subTxt">請選擇您要保存的收藏夾</p>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div ref="newFolder" class="nowFolder putPointer" @click="openCreateFolderModal">
            <div class="collectFolder--sm collectFolder--new">
              <i class="jobIcon bi bi-plus-lg"></i>
            </div>
            <p class="collectFolder__title">新建收藏夾</p>
          </div>
          <template v-for="(folder, index) in collectFolder" :key="folder.id">
            <div
              class="nowFolder"
              @click="saveToNowFolder(folder.id, index)"
              :class="{ putPointer: !folder.jobCheck }"
            >
              <div class="collectFolder--sm">
                <img
                  class="collectFolder__imgCover"
                  v-if="folder.jobs[0]"
                  :src="folder.jobs[0].imageUrl"
                  :alt="`${folder.jobs.title}職位圖片`"
                />
              </div>
              <div class="d-flex align-items-center justify-content-between flex-grow-1">
                <div class="d-flex align-items-center">
                  <p class="collectFolder__title me-2">{{ folder.title }}</p>
                  <p class="collectFolder__subTxt">(目前 {{ folder.jobs.length }} 個職位)</p>
                </div>
                <p
                  class="collectFolder__subTxt me-2 d-flex align-items-center text-primary"
                  v-if="folder.jobCheck"
                >
                  <i class="jobIcon bi bi-check-circle-fill me-1 text-primary"></i>
                  已收藏
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <div
    ref="createJobCollectModal"
    class="jobCollectModal modal fade"
    id="exampleModalToggle2"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex justify-content-between mb-4">
            <div>
              <h3 class="section__title--sub mb-2">
                <span class="title__icon"></span>為新的職位收藏夾命名
              </h3>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <Form ref="creatFolderForm" v-slot="{ errors }" @submit="createFolder">
            <!-- 表單1-1：公司名稱(必填) -->
            <div class="form__inputBox">
              <div class="form__labelBox">
                <label for="collectForderName" class="form__label--custom form-label"
                  >收藏夾名稱</label
                >
                <p class="formTag--must">必填</p>
              </div>
              <Field
                id="collectForderName"
                ref="collectForderName"
                name="收藏夾名稱"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['收藏夾名稱'] }"
                placeholder="請輸入收藏夾名稱"
                v-model="creatFolderForm.title"
              ></Field>
              <ErrorMessage name="收藏夾名稱" class="invalid-feedback"></ErrorMessage>
            </div>
            <button type="submit" class="btn btn-primary w-100 mb-3">
              建立
            </button>
            <button
              class="btn btn-gray-light w-100"
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              type="button"
            >
              返回
            </button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import Modal from 'bootstrap/js/dist/modal';

export default {
  emits: ['return-job-collection'],
  data() {
    return {
      modal: {},
      createJobModal: {},
      jobCollection: [],
      sentJob: {},
      collectFolder: [],
      creatFolderForm: {
        title: '',
      },
      justCreateFolder: false,
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
      this.createJobModal.hide();
    },
    openCreateFolderModal() {
      this.modal.hide();
      this.creatFolderForm = {
        title: '',
      };
      this.createJobModal.show();
    },
    createFolder() {
      const temFolder = {
        title: this.creatFolderForm.title || '未命名收藏夾',
        jobs: [],
        id: `${Math.floor(Date.now() / 1000)}`,
      };
      if (this.justCreateFolder === false) {
        const Obj = {
          title: this.sentJob.title,
          company: this.sentJob.options.company.companyName,
          id: this.sentJob.id,
          imageUrl: this.sentJob.imageUrl,
          time: this.sentJob.options.job.create,
        };
        temFolder.jobs.push(Obj);
      }
      this.jobCollection.push(temFolder);
      const temData = JSON.stringify(this.jobCollection);
      localStorage.setItem('fineJob-jobCollection', temData);
      this.getLocalStorage();
      this.closeModal();
    },
    saveToNowFolder(folderId, folderNum) {
      if (this.collectFolder[folderNum].jobCheck === false) {
        // 先收集需要的資料
        const Obj = {
          title: this.sentJob.title,
          company: this.sentJob.options.company.companyName,
          id: this.sentJob.id,
          imageUrl: this.sentJob.imageUrl,
          time: this.sentJob.options.job.create,
        };
        this.jobCollection.forEach((item, index) => {
          if (item.id === folderId) {
            this.jobCollection[index].jobs.push(Obj);
          }
        });
        const temData = JSON.stringify(this.jobCollection);
        localStorage.setItem('fineJob-jobCollection', temData);
        this.getLocalStorage();
        this.closeModal();
      } else {
        this.jobCollection[folderNum].jobs.forEach((item, index) => {
          if (item.id === this.sentJob.id) {
            this.jobCollection[folderNum].jobs.splice(index, 1);
          }
        });
        const temData = JSON.stringify(this.jobCollection);
        localStorage.setItem('fineJob-jobCollection', temData);
        this.getLocalStorage();
        this.closeModal();
      }
    },
    deleteFromNowFolder(folderId, folderNum, jobId) {
      if (this.collectFolder[folderNum].jobCheck === false) {
        this.jobCollection.forEach((item, index) => {
          if (item.id === folderId) {
            this.jobCollection[index].jobs.forEach((job, num) => {
              if (job.id === jobId) {
                this.jobCollection[index].jobs.splice(num, 1);
              }
            });
          }
        });
        const temData = JSON.stringify(this.jobCollection);
        localStorage.setItem('fineJob-jobCollection', temData);
        this.getLocalStorage();
        this.closeModal();
      }
    },
    checkCollection(id) {
      this.collectFolder.forEach((item, index) => {
        const checkData = item.jobs.some((job) => job.id === id);
        this.collectFolder[index].jobCheck = checkData;
      });
    },
    // 瀏覽紀錄相關方法
    // 取得瀏覽紀錄
    getLocalStorage() {
      const temJobCollectionsArray = JSON.parse(localStorage.getItem('fineJob-jobCollection'));
      if (temJobCollectionsArray) {
        this.jobCollection = temJobCollectionsArray;
        this.collectFolder = JSON.parse(JSON.stringify(temJobCollectionsArray));
      }
      this.returnJobCollection();
    },
    // 刪除收藏夾
    deleteFolder(folderId) {
      this.collectFolder.forEach((item, index) => {
        if (item.id === folderId) {
          this.collectFolder.splice(index, 1);
        }
      });
      const temData = JSON.stringify(this.collectFolder);
      localStorage.setItem('fineJob-jobCollection', temData);
      this.getLocalStorage();
      this.$router.push('/collection');
    },
    // emit監聽
    returnJobCollection() {
      this.$emit('return-job-collection', this.collectFolder);
    },
    emitOpenCollectModal(item) {
      this.justCreateFolder = false;
      this.sentJob = item;
      this.openModal();
      this.checkCollection(this.sentJob.id);
    },
    emitOpenCreatCollectModal() {
      this.justCreateFolder = true;
      this.openCreateFolderModal();
    },
  },
  created() {
    this.getLocalStorage();
  },
  mounted() {
    this.modal = new Modal(this.$refs.jobCollectModal);
    this.createJobModal = new Modal(this.$refs.createJobCollectModal);
    emitter.on('open-collect-modal', this.emitOpenCollectModal);
    emitter.on('open-creat-collect-modal', this.emitOpenCreatCollectModal);
    emitter.on('close-collect-modal', this.closeModal);
    emitter.on('delete-collect-folder-modal', this.deleteFolder);
  },
  unmounted() {
    this.modal.dispose();
    this.createJobModal.dispose();
    emitter.off('open-collect-modal', this.emitOpenCollectModal);
    emitter.off('open-creat-collect-modal', this.emitOpenCreatCollectModal);
    emitter.off('close-collect-modal', this.closeModal);
    emitter.off('delete-collect-folder-modal', this.deleteFolder);
  },
};
</script>

<style lang="scss"></style>
