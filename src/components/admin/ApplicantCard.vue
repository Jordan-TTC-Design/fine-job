<template>
  <li class="candidateList__person box--shadow" v-if="selectItem.id !== ''">
    <div class="d-flex candidateList__person__listBox">
      <img
        class="person__personalImg me-4"
        :src="selectItem.user.options.personalImg"
        :alt="`${selectItem.user.name}個人求職照片`"
      />
      <div class="person__infoBox">
        <p class="person__name">{{ selectItem.user.name }}</p>
        <ul class="person__infoBox mb-4">
          <li class="person__infoBox__item">
            <p class="person__subTxt">目前職位</p>
            <p class="person__txt">{{ selectItem.user.options.nowJobName }}</p>
          </li>
          <li class="person__infoBox__item">
            <p class="person__subTxt">最高學歷</p>
            <p class="person__txt">{{ selectItem.user.options.education || '大學' }}</p>
          </li>
          <li class="person__infoBox__item">
            <p class="person__subTxt">工作經驗</p>
            <p class="person__txt">
              {{ selectItem.user.options.workExp || '無工作經驗' }}
            </p>
          </li>
          <li class="person__infoBox__item">
            <p class="person__subTxt">聯絡電話</p>
            <p class="person__txt">{{ selectItem.user.tel }}</p>
          </li>
          <li class="person__infoBox__item">
            <p class="person__subTxt">聯絡Email</p>
            <p class="person__txt">{{ selectItem.user.email }}</p>
          </li>
          <li class="person__infoBox__item mt-lg-2">
            <p class="person__subTxt mb-lg-0 mb-2">備註標籤</p>
            <ul class="personTagBox">
              <li class="personTagBox__item">
                <button
                  type="button"
                  class="personTag personTag--new btn btn-outline-gray-line"
                  @click="newPersonTag"
                >
                  <i class="jobIcon bi bi-plus-lg"></i>新增標籤
                </button>
              </li>
              <template v-for="(tag, index) in tagListPerson.tags" :key="index">
                <li class="personTagBox__item">
                  <button
                    type="button"
                    class="personTag btn btn-outline-secondary"
                    @click="deleteTag(tag.tagName)"
                  >
                    {{ tag.tagName }}
                  </button>
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="card__btnBox">
      <a
        type="button"
        class="btn btn-outline-primary text-decoration-underline d-block me-2"
        :href="selectItem.user.options.cvLink"
        target="_blank"
        >打開履歷</a
      >
      <button
        type="button"
        class="btn btn-gray-light d-flex align-items-center"
        data-action="deleteItem"
        :data-id="selectItem.id"
        @click="openDeleteModal('退回求職申請', selectItem.id, selectItem.user.name)"
      >
        <i class="bi bi-trash me-1"></i>退回申請
      </button>
    </div>
  </li>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  props: ['sentSelectItem'],
  data() {
    return {
      selectItem: {
        id: '',
      },
      tags: [],
      personTagList: [],
    };
  },
  watch: {
    sentSelectItem: {
      deep: true,
      handler(newValue) {
        this.selectItem = newValue;
      },
    },
  },
  computed: {
    tagListPerson() {
      let temArray = [];
      this.personTagList.forEach((person) => {
        if (person.id === this.selectItem.id) {
          temArray = person;
        }
      });
      return temArray;
    },
  },
  methods: {
    openDeleteModal(txt, id, name) {
      const Obj = {
        action: txt,
        itemId: id,
        itemName: name,
      };
      emitter.emit('open-delete-product-modal', Obj);
    },
    newPersonTag() {
      emitter.emit('open-new-person-tag-modal', this.selectItem);
    },
    getLocalTag() {
      const temArray = JSON.parse(localStorage.getItem('fineJob-personTagList'));
      if (temArray) {
        this.personTagList = JSON.parse(JSON.stringify(temArray));
      }
    },
    deleteTag(tagName) {
      const Obj = {
        person: this.tagListPerson,
        tagName,
      };
      emitter.emit('open-delete-tag-modal', Obj);
    },
  },
  created() {
    this.selectItem = this.sentSelectItem;
  },
  mounted() {
    this.getLocalTag();
    emitter.on('get-local-tag', this.getLocalTag);
  },
};
</script>

<style lang="scss"></style>
