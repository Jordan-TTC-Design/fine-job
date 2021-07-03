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
            <div class="col-12">
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
              <div class="form-group">
                <label for="companyContact">企業聯絡人</label>
                <input
                  id="companyContact"
                  type="text"
                  class="form-control"
                  placeholder="企業聯絡人"
                  v-model="companyData.name"
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
                  v-model="companyData.tel"
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
                  v-model="companyData.email"
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
                  v-model="companyData.options.company.contactPosition"
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
                      {{ companyData.options.company.industryCategory }}</option
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
                    v-model="companyData.options.jobToken"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="companyAdressCity">縣市</label>
                    <select
                      name="公司地址縣市"
                      id="companyAdressCity"
                      class="form-control form-select"
                      v-model="companyData.options.company.CompanyAddress"
                      ref="companyAdressCity"
                    >
                      <option :value="companyData.options.company.CompanyAddress" selected>
                        {{ companyData.options.company.CompanyAddress }}</option
                      >
                      <option v-for="item in city" :value="item" :key="item">{{ item }} </option>
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="companyAdressDetail">詳細地址</label>
                    <input
                      type="text"
                      id="companyAdressDetail"
                      class="form-control"
                      placeholder="請輸入詳細地址"
                      v-model="companyData.options.company.CompanyAddressDetail"
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
                      v-model="companyData.options.company.companyInfo"
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
          <button type="button" class="btn btn-primary" @click="processNewCompanyData">
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
    // updateProduct() {
    //   this.$emit('update-product', this.temItemData);
    // },
    processNewCompanyData() {
      const newCompanyitem = {
        data: {
          title: this.companyData.options.company.companyName,
          category: this.companyData.options.company.industryCategory,
          origin_price: 0,
          price: 0,
          unit: '間',
          description: this.companyData.options.formAction,
          content: this.companyData.options.company.companyInfo,
          is_enabled: 1,
          imageUrl: this.companyData.options.company.companyLogoUrl,
          imagesUrl: this.companyData.options.company.companyImagesUrl,
          options: {
            companyAdressCity: this.companyData.options.company.CompanyAdress,
            companyAdressDetail: this.companyData.options.company.CompanyAdressDetail,
            companyContact: this.companyData.name,
            companyContactPosition: this.companyData.options.company.contactPosition,
            companyTel: this.companyData.tel,
            companyEmail: this.companyData.email,
            companyJobToken: this.companyData.options.jobToken,
          },
        },
      };
      console.log(newCompanyitem);
      // this.newCompany(newCompanyitem);
      this.$emit('new-company', newCompanyitem);
      this.closeModal();
      this.temItemData = {};
      this.companyData = { options: { company: { companyImagesUrl: [] } } };
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
        console.log(this.companyData);
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
