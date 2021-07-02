<template>
  <div
    ref="newCompanyModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="newCompanyModalLabel"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="newCompanyModalLabel" class="modal-title">
            <span>新建企業</span>
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
            <div class="col-8">
              <div class="form-group">
                <label for="title">公司名稱</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入公司名稱"
                  v-model="companyData.options.company.companyName"
                />
              </div>
            </div>
            <div class="col-4">
              <div class="mb-1">
                <label for="logoImageUrl">公司Logo</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model="companyData.options.company.companyLogoUrl"
                />
              </div>
              <img class="img-fluid" alt="" :src="companyData.options.company.companyLogoUrl" />
            </div>
            <div class="col-12 mb-3">
              <div v-if="companyData.options.company.companyImagesUrl.length > 0" class="row ">
                <div
                  v-for="(item, index) in companyData.options.company.companyImagesUrl"
                  :key="index"
                  class="col-4"
                >
                  <div class="form-group">
                    <label for="imageUrl">輸入第 {{ index + 1 }} 張企業圖片</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model="companyData.options.company.companyImagesUrl[index]"
                    />
                  </div>
                  <img class="img-fluid" alt="" :src="item" />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="公司行業類別">行業類別</label>
                  <select
                    name="公司行業類別"
                    id="newCompanyIndustryCategory"
                    class="form-control form-select"
                    v-model="companyData.options.company.industryCategory"
                  >
                    <!-- <option value="">選擇您公司的行業類別</option> -->
                    <option :value="companyData.options.company.industryCategory" selected>
                      {{companyData.options.company.industryCategory}}</option>
                    <option v-for="item in industryCategory"
                    :value="item"
                    :key="item">{{item}}
                    </option>
                  </select>
                </div>
                <div class="form-group col-md-6">
                  <label for="unit">職位額度</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入職位額度"
                    v-model="companyData.options.jobToken"
                  />
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <label for="origin_price">縣市</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
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
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="description">公司簡介</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入公司簡介"
                  v-model="companyData.options.company.companyInfo"
                  cols="30"
                  rows="10"
                >
                </textarea>
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
import emitter from '@/components/helpers/emitter';
import { Modal } from 'bootstrap';

export default {
  props: ['temItem'],
  data() {
    return {
      modal: '',
      industryCategory: [
        '批發、零售、傳直銷業',
        '文教相關業',
        '大眾傳播相關業',
        '旅遊、休閒、運動業',
        '一般服務業',
        '電子資訊、軟體、半導體相關業',
        '一般製造業',
        '農林漁牧水電資源業',
        '運輸物流及倉儲',
        '政治宗教及社福相關業',
        '金融投顧及保險業',
        '法律、會計、顧問、研發、設計業',
        '建築營造及不動產相關業',
        '醫療保健及環境衛生業',
        '礦業及土石採取業',
        '住宿、餐飲服務業',
      ],
      temItemData: {},
      companyData: { options: { company: { companyImagesUrl: [] } } },
    };
  },
  methods: {
    addImageUrl() {
      this.companyData.options.company.companyImagesUrl.push('');
    },
    deleteImageUrl() {
      this.companyData.options.company.companyImagesUrl.pop();
    },
    updateProduct() {
      this.$emit('update-product', this.temItemData);
    },
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  watch: {
    temItem: {
      deep: true,
      handler(newValue) {
        [this.temItemData] = newValue;
        this.companyData = newValue[0].user;
        console.log(newValue[0]);
        console.log(this.companyData);
        console.log(this.temItem);
      },
    },
  },
  created() {
    this.temItemData = this.temItem;
    emitter.on('close-new-company', () => {
      this.closeModal();
    });
    emitter.on('open-new-company', () => {
      this.openModal();
    });
  },
  mounted() {
    console.log(this.$refs.newCompanyModal);
    this.modal = new Modal(this.$refs.newCompanyModal);
  },
};
</script>

<style lang="scss">
.modal.show {
  display: block;
}
</style>
