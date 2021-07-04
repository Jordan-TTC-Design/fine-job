<template>
  <div
    ref="editCompanyModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="editCompanyModalLabel"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="editCompanyModalLabel" class="modal-title">
            <span>編輯企業</span>
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
            <div class="col-12">
              <div class="form-group">
                <label for="title">公司名稱</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入公司名稱"
                  v-model="companyData.title"
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="companyContact">企業聯絡人</label>
                <input
                  id="companyContact"
                  type="text"
                  class="form-control"
                  placeholder="企業聯絡人"
                  v-model="companyData.options.companyContact"
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="companyTel">聯絡電話</label>
                <input
                  id="companyTel"
                  type="text"
                  class="form-control"
                  placeholder="聯絡電話"
                  v-model="companyData.options.companyTel"
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="companyEmail">聯絡Email</label>
                <input
                  id="companyEmail"
                  type="text"
                  class="form-control"
                  placeholder="聯絡Email"
                  v-model="companyData.options.companyEmail"
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="contactPosition">聯絡人職位</label>
                <input
                  id="contactPosition"
                  type="text"
                  class="form-control"
                  placeholder="聯絡人職位"
                  v-model="companyData.options.companyContactPosition"
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="logoImageUrl">公司Logo</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model="companyData.imageUrl"
                />
              </div>
              <img class="img-fluid" alt="" :src="companyData.imageUrl" />
            </div>
            <div class="col-12 mb-3">
              <div v-if="companyData.imagesUrl.length > 0" class="row ">
                <div
                  v-for="(item, index) in companyData.imagesUrl"
                  :key="index"
                  class="col-4"
                >
                  <div class="form-group">
                    <label for="imageUrl">輸入第 {{ index + 1 }} 張企業圖片</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model="companyData.imagesUrl[index]"
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
                    v-model="companyData.category"
                  >
                    <!-- <option value="">選擇您公司的行業類別</option> -->
                    <option :value="companyData.category" selected>
                      {{ companyData.category }}</option
                    >
                    <option v-for="item in industryCategory" :value="item" :key="item"
                      >{{ item }}
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
                    v-model="companyData.options.companyJobToken"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="companyAddressCity">縣市</label>
                    <select
                      name="公司地址縣市"
                      id="companyAddressCity"
                      class="form-control form-select"
                      v-model="companyData.options.companyAddressCity"
                      ref="companyAddressCity"
                    >
                      <option :value="companyData.options.companyAddressCity" selected>
                        {{ companyData.options.companyAddressCity }}</option
                      >
                      <option v-for="item in city" :value="item" :key="item">{{ item }} </option>
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="companyAddressDetail">詳細地址</label>
                    <input
                      type="text"
                      id="companyAddressDetail"
                      class="form-control"
                      placeholder="請輸入詳細地址"
                      v-model="companyData.options.companyAddressDetail"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label for="description">公司簡介</label>
                    <textarea
                      id="description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入公司簡介"
                      v-model="companyData.content"
                      cols="30"
                      rows="10"
                    >
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="processCompanyData">
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
  props: ['temCompany'],
  data() {
    return {
      modal: '',
      city: [
        '基隆市',
        '台北市',
        '新北市',
        '桃園市',
        '新竹縣',
        '新竹市',
        '苗栗縣',
        '台中市',
        '彰化市',
        '南投縣',
        '雲林縣',
        '嘉義縣',
        '台南市',
        '台南市',
        '屏東縣',
        '宜蘭縣',
      ],
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
      companyData: {},
    };
  },
  methods: {
    addImageUrl() {
      this.companyData.options.company.companyImagesUrl.push('');
    },
    deleteImageUrl() {
      this.companyData.options.company.companyImagesUrl.pop();
    },
    // updateProduct() {
    //   this.$emit('update-product', this.temItemData);
    // },
    processCompanyData() {
      const temObj = this.companyData;
      const companyItem = {
        data: {
          title: temObj.title,
          category: temObj.category,
          origin_price: 0,
          price: 0,
          unit: '間',
          description: '企業',
          content: temObj.content,
          is_enabled: 1,
          imageUrl: temObj.imageUrl,
          imagesUrl: temObj.imagesUrl,
          options: {
            companyAddressCity: temObj.options.companyAddressCity,
            companyAddressDetail: temObj.options.companyAddressDetail,
            companyContact: temObj.options.companyContact,
            companyContactPosition: temObj.options.companyContactPosition,
            companyTel: temObj.options.companyTel,
            companyEmail: temObj.options.companyEmail,
            companyJobToken: temObj.options.companyJobToken,
            create: Math.floor(Date.now() / 1000),
          },
        },
      };
      console.log(companyItem);
      // this.newCompany(newCompanyItem);
      this.$emit('update-company', companyItem);
      this.closeModal();
      this.companyData = {};
    },

    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  watch: {
    temCompany: {
      deep: true,
      handler(newValue) {
        [this.companyData] = newValue;
        console.log(this.companyData);
      },
    },
  },
  created() {
    [this.companyData] = this.temCompany;
    emitter.on('close-edit-company', () => {
      this.closeModal();
    });
    emitter.on('open-edit-company', () => {
      this.openModal();
    });
  },
  mounted() {
    this.modal = new Modal(this.$refs.editCompanyModal);
  },
};
</script>

<style lang="scss">
.modal.show {
  display: block;
}
</style>
