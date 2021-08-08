<template>
  <div class="page--py">
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-12">
          <div class="collectionBox collectionBox--new" @click="newCollectionFolder">
            <div class="collectionBox__imgBox">
              <div class="collectionBox__imgBox__item item--fri"></div>
              <div class="collectionBox__imgBox__innerBox">
                <div class="collectionBox__imgBox__item item--sec"></div>
                <div class="collectionBox__imgBox__innerBox__littleBox">
                  <div class="collectionBox__imgBox__item item--tri"></div>
                  <div class="collectionBox__imgBox__item item--four"></div>
                </div>
              </div>
              <div class="collectionBox--new__cover">
                <p class="collectionBox--new__newBtn">
                  <i class="jobIcon bi bi-plus-lg me-2"></i>新增收藏夾
                </p>
              </div>
            </div>
            <div class="collectionBox__txtBox"></div>
          </div>
        </div>
        <template v-for="(folder, index) in jobCollectionList" :key="index">
          <router-link
            class="col-md-4 col-12"
            v-if="jobCollectionList.length > 0"
            :to="`/collection-folder/${folder.id}`"
          >
            <div class="collectionBox">
              <div class="collectionBox__imgBox">
                <div class="collectionBox__imgBox__item item--fri">
                  <img
                    v-if="folder.jobs[0]"
                    :src="folder.jobs[0].imageUrl"
                    :alt="`職位圖片${index}`"
                  />
                </div>
                <div class="collectionBox__imgBox__innerBox">
                  <div class="collectionBox__imgBox__item item--sec">
                    <img
                      v-if="folder.jobs[1]"
                      :src="folder.jobs[1].imageUrl"
                      :alt="`職位圖片${index}`"
                    />
                  </div>
                  <div class="collectionBox__imgBox__innerBox__littleBox">
                    <div class="collectionBox__imgBox__item item--tri">
                      <img
                        v-if="folder.jobs[2]"
                        :src="folder.jobs[2].imageUrl"
                        :alt="`職位圖片${index}`"
                      />
                    </div>
                    <div class="collectionBox__imgBox__item item--four">
                      <img
                        v-if="folder.jobs[3]"
                        :src="folder.jobs[3].imageUrl"
                        :alt="`職位圖片${index}`"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="collectionBox__txtBox">
                <p class="txtBox__title">{{ folder.title }}</p>
                <p>{{ folder.jobs.length }} 個職位</p>
              </div>
            </div>
          </router-link>
        </template>
      </div>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <JobCollect ref="JobCollectModal" @return-job-collection="returnJobCollection" />
</template>

<script>
import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import JobCollect from '@/components/helpers/JobCollect.vue';

export default {
  components: {
    UpTopBtn,
    JobCollect,
  },
  data() {
    return {
      jobItem: {
        options: {
          company: {
            companyImagesUrl: [],
          },
          job: {},
        },
      },
      jobCollectionList: [],
    };
  },
  methods: {
    newCollectionFolder() {
      emitter.emit('open-creat-collect-modal');
    },
    // 取得收藏職位資料
    returnJobCollection(array) {
      this.jobCollectionList = array;
      console.log(this.jobCollectionList);
    },
  },
  created() {
    emitter.emit('spinner-open-bg', 1000);
  },
  mounted() {
    emitter.emit('return-local-collection');
  },
};
</script>

<style lang="scss"></style>
