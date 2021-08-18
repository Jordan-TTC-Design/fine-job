<template>
  <div
    ref="deletePersonTagModal"
    class="deletePersonTagModal modal fade"
    id="deletePersonTagModal"
    aria-hidden="true"
    aria-labelledby="deletePersonTagModalLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex justify-content-between mb-4">
            <div>
              <h3 class="section__title--sub mb-2"><span class="title__icon"></span>刪除標籤</h3>
            </div>
            <button type="button" class="btn-close" @click="closeDeleteModal"></button>
          </div>
          <p class="text-center mb-4">請問您確定要刪除標籤?</p>
          <p class="text-center mb-6 text-primary">{{ tagListPerson.tagName }}</p>
          <div class="d-flex">
            <button
              type="button"
              class="btn btn-gray-light me-2 flex-grow-1"
              @click="closeDeleteModal"
            >
              返回
            </button>
            <button
              type="button"
              class="btn btn-primary flex-grow-1"
              @click="deleteTagFromLocal(tagListPerson.tagName)"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 新增標籤Modal -->
  <div
    ref="newPersonTagModal"
    class="newPersonTagModal modal fade"
    id="newPersonTagModal"
    aria-hidden="true"
    aria-labelledby="newPersonTagModalLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex justify-content-between mb-4">
            <div>
              <h3 class="section__title--sub mb-2"><span class="title__icon"></span>備註</h3>
            </div>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <p class="mb-4">可以備註應徵者特色、注意事項等，幫助日後快速評審。</p>
          <Form ref="sendFormInfoForm1" v-slot="{ errors }" @submit="checkPersonLocal">
            <div class="row">
              <div class="col-12">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="tagFormInfoTagName" class="form__label--custom form-label"
                      >標籤名稱</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <Field
                    id="tagFormInfoTagName"
                    name="標籤名稱"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['標籤名稱'] }"
                    placeholder="請輸入標籤名稱"
                    rules="required"
                    v-model="tagForm.tagName"
                    ref="tagFormInfoTagName"
                  ></Field>
                  <ErrorMessage name="標籤名稱" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="col-12">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="tagFormInfoUserName" class="form__label--custom form-label"
                      >備註人</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <Field
                    id="tagFormInfoUserName"
                    name="備註人"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['備註人'] }"
                    placeholder="備註人"
                    rules="required"
                    v-model="tagForm.userName"
                    ref="tagFormInfoUserName"
                  ></Field>
                  <ErrorMessage name="備註人" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="col-12">
                <div class="formStepBtnBox d-flex justify-content-between">
                  <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                    取消
                  </button>
                  <button type="submit" class="btn btn-primary flex-grow-1">
                    確定
                  </button>
                </div>
              </div>
            </div>
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
  emits: ['return-company-collection'],
  data() {
    return {
      personInfo: {},
      newPersonTagModal: {},
      deletePersonTagModal: {},
      tagForm: {
        userName: '',
        tagName: '',
      },
      personTagList: [],
      tagListPerson: {},
    };
  },
  methods: {
    openDeleteModal(person) {
      this.tagListPerson = person;
      this.deletePersonTagModal.show();
    },
    closeDeleteModal() {
      this.deletePersonTagModal.hide();
    },
    openModal() {
      this.newPersonTagModal.show();
    },
    closeModal() {
      this.newPersonTagModal.hide();
      setTimeout(() => {
        this.clearForm();
      }, 800);
    },
    checkPersonLocal() {
      const checkData = this.personTagList.some((item) => item.id === this.personInfo.id);
      if (checkData === true) {
        this.saveToNowPersonLocal(this.personInfo.id);
      } else {
        this.saveTagToLocal();
      }
    },
    deleteTagFromLocal(tagName) {
      this.personTagList.forEach((person, index) => {
        if (person.id === this.tagListPerson.person.id) {
          this.personTagList[index].tags.forEach((tag, num) => {
            if (tag.tagName === tagName) {
              this.personTagList[index].tags.splice(num, 1);
            }
          });
        }
      });
      const temData = JSON.stringify(this.personTagList);
      localStorage.setItem('fineJob-personTagList', temData);
      this.getLocalStorage();
      this.closeDeleteModal();
    },
    // 收藏企業
    saveTagToLocal() {
      // 先收集需要的資料
      const Obj = {
        personName: this.personInfo.user.name,
        id: this.personInfo.id,
        time: `${Math.floor(Date.now() / 1000)}`,
        tags: [this.tagForm],
      };
      this.personTagList.push(Obj);
      const temData = JSON.stringify(this.personTagList);
      localStorage.setItem('fineJob-personTagList', temData);
      this.getLocalStorage();
      this.closeModal();
    },
    getLocalStorage() {
      const temArray = JSON.parse(localStorage.getItem('fineJob-personTagList'));
      if (temArray) {
        this.personTagList = JSON.parse(JSON.stringify(temArray));
      }
      emitter.emit('get-local-tag');
    },
    saveToNowPersonLocal(folderId) {
      this.personTagList.forEach((person) => {
        if (person.id === folderId) {
          person.tags.push(this.tagForm);
          const temData = JSON.stringify(this.personTagList);
          localStorage.setItem('fineJob-personTagList', temData);
          this.getLocalStorage();
          this.closeModal();
        }
      });
    },
    // emit監聽
    emitOpenNewTagModal(personInfo) {
      this.openModal();
      this.personInfo = personInfo;
    },
    clearForm() {
      this.tagForm = {
        userName: '',
        tagName: '',
      };
    },
  },
  created() {
    this.getLocalStorage();
  },
  mounted() {
    this.deletePersonTagModal = new Modal(this.$refs.deletePersonTagModal);
    this.newPersonTagModal = new Modal(this.$refs.newPersonTagModal);
    emitter.on('open-new-person-tag-modal', this.emitOpenNewTagModal);
    emitter.on('get-person-tag-list', this.getLocalStorage);
    emitter.on('open-delete-tag-modal', this.openDeleteModal);
  },
  unmounted() {
    this.deletePersonTagModal.dispose();
    this.newPersonTagModal.dispose();
    emitter.off('open-new-person-tag-modal', this.emitOpenNewTagModal);
    emitter.off('get-person-tag-list', this.getLocalStorage);
    emitter.off('open-delete-tag-modal', this.openDeleteModal);
  },
};
</script>

<style lang="scss"></style>
