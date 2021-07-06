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
                    <option v-for="item in form.industryCategory" :value="item" :key="item"
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
                    <label for="companyAddressCity">縣市</label>
                    <select
                      name="公司地址縣市"
                      id="companyAddressCity"
                      class="form-control form-select"
                      v-model="companyData.options.company.companyAddressCity"
                      ref="companyAddressCity"
                    >
                      <option :value="companyData.options.company.companyAddressCity" selected>
                        {{ companyData.options.company.companyAddressCity }}</option
                      >
                      <option v-for="item in formData.city" :value="item" :key="item"
                        >{{ item }}
                      </option>
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
                      v-model="companyData.options.company.companyAddressDetail"
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
import webData from '@/components/helpers/webData';
import { Modal } from 'bootstrap';

export default {
  props: ['temCompany'],
  data() {
    return {
      modal: '',
      formData: {},
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
      const temObj = this.companyData;
      const newCompanyItem = {
        data: {
          title: temObj.options.company.companyName,
          category: temObj.options.company.industryCategory,
          origin_price: 0,
          price: 0,
          unit: '間',
          description: '企業',
          content: temObj.options.company.companyInfo,
          is_enabled: 1,
          imageUrl: temObj.options.company.companyLogoUrl,
          imagesUrl: temObj.options.company.companyImagesUrl,
          options: {
            companyAddressCity: temObj.options.company.companyAddressCity,
            companyAddressDetail: temObj.options.company.companyAddressDetail,
            companyContact: temObj.name,
            companyContactPosition: temObj.options.company.contactPosition,
            companyTel: temObj.tel,
            companyEmail: temObj.email,
            companyJobToken: temObj.options.jobToken,
            create: Math.floor(Date.now() / 1000),
          },
        },
      };
      console.log(newCompanyItem);
      // this.newCompany(newCompanyItem);
      this.$emit('new-company', newCompanyItem);
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
    temCompany: {
      deep: true,
      handler(newValue) {
        [this.temItemData] = newValue;
        this.companyData = newValue[0].user;
        console.log(this.temItemData);
      },
    },
  },
  created() {
    this.temItemData = this.temCompany;
    this.formData = webData;
    emitter.on('close-new-company', () => {
      this.closeModal();
    });
    emitter.on('open-new-company', () => {
      this.openModal();
    });
  },
  mounted() {
    this.modal = new Modal(this.$refs.newCompanyModal);
  },
};
</script>

<style lang="scss">
.modal.show {
  display: block;
}
</style>
