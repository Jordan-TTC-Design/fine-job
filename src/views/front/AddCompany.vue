<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <h2 class="text-center">新建企業</h2>
        <Form ref="sendFormInfoForm" v-slot="{ errors }" @submit="processFormData">
          <div class="mb-3">
            <label for="sendFormInfoCompanyName" class="form-label">公司名稱</label>
            <Field
              id="sendFormInfoCompanyName"
              name="公司名稱"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['公司名稱'] }"
              placeholder="請輸入公司名稱"
              rules="required"
              v-model="form.user.options.company.companyName"
              ref="sendFormInfoCompanyName"
            ></Field>
            <ErrorMessage name="公司名稱" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <div>
              <label for="sendFormInfoCompanyLogo" class="form-label">公司logo</label>
              <input
                id="sendFormInfoCompanyLogo"
                name="公司logo"
                type="file"
                class="form-control d-none"
                :class="{ 'is-invalid': errors['公司logo'] }"
                ref="sendFormInfoCompanyLogo"
                rules="required"
                data-input="upLoadSingleImg"
                @change="loadingImg($event)"
                accept="image/*"
              />
              <div class="cropImgBox">
                <div class="cropImgBox__cover" v-if="companyLogo.src"></div>
                <button
                  type="button"
                  class="btn btn-outline-primary cropImgBtn"
                  @click="clickInput($event)"
                  data-input="upLoadSingleImg"
                  v-if="companyLogo.src == ''"
                >
                  選擇圖片
                </button>
                <img
                  v-if="companyLogo.src !== ''"
                  class="cropImg"
                  ref="cropImgCompanyLogo"
                  :src="companyLogo.src"
                  alt=""
                />
              </div>
              <button
                type="button"
                class="btn btn-outline-primary w-100 mb-1"
                @click="updateImg($event)"
                data-input="upLoadSingleImg"
                :disabled="!!companyLogo.isUpDated"
              >
                {{ companyLogo.isUpDated ? '已上傳' : '上傳圖片' }}
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary w-100"
                @click="clickInput($event)"
                v-if="companyLogo.src != ''"
                data-input="upLoadSingleImg"
              >
                重選
              </button>
            </div>
            <div>
              <Field
                id="sendFormInfoCompanyLogoCheck"
                name="公司Logo"
                type="text"
                class="form-control d-none"
                :class="{ 'is-invalid': errors['公司Logo'] }"
                v-model="form.user.options.company.companyLogoUrl"
                ref="sendFormInfoCompanyLogoCheck"
                rules="required"
              ></Field>
              <ErrorMessage name="公司Logo" class="invalid-feedback"></ErrorMessage>
            </div>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoIndustryCategory" class="form-label">公司行業類別</label>
            <Field
              name="公司行業類別"
              as="select"
              id="sendFormInfoIndustryCategory"
              class="form-control form-select"
              :class="{ 'is-invalid': errors['公司行業類別'] }"
              rules="required"
              v-model="form.user.options.company.industryCategory"
              ref="sendFormInfoIndustryCategory"
            >
              <option value="" disabled selected>選擇您公司的行業類別</option>
              <option value="批發、零售、傳直銷業">批發、零售、傳直銷業</option>
              <option value="文教相關業">文教相關業</option>
              <option value="大眾傳播相關業">大眾傳播相關業</option>
              <option value="旅遊、休閒、運動業">旅遊、休閒、運動業</option>
              <option value="一般服務業">一般服務業</option>
              <option value="電子資訊、軟體、半導體相關業">電子資訊、軟體、半導體相關業</option>
              <option value="一般製造業">一般製造業</option>
              <option value="農林漁牧水電資源業">農林漁牧水電資源業</option>
              <option value="運輸物流及倉儲">運輸物流及倉儲</option>
              <option value="政治宗教及社福相關業">政治宗教及社福相關業</option>
              <option value="金融投顧及保險業">金融投顧及保險業</option>
              <option value="法律、會計、顧問、研發、設計業">法律、會計、顧問、研發、設計業</option>
              <option value="建築營造及不動產相關業">建築營造及不動產相關業</option>
              <option value="醫療保健及環境衛生業">醫療保健及環境衛生業</option>
              <option value="礦業及土石採取業">礦業及土石採取業</option>
              <option value="住宿、餐飲服務業">住宿、餐飲服務業</option>
            </Field>
            <ErrorMessage name="公司行業類別" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoCompanyAddress" class="form-label">公司地址</label>
            <div class="d-flex">
              <div class=" flex-shrink-1 me-2">
                <Field
                  name="公司地址縣市"
                  as="select"
                  id="sendFormInfoCompanyAddress"
                  class="form-control form-select "
                  :class="{ 'is-invalid': errors['公司地址縣市'] }"
                  rules="required"
                  v-model="form.user.options.company.CompanyAddress"
                  ref="sendFormInfoCompanyAddress"
                >
                  <option value="" disabled selected>選擇縣市</option>
                  <option value="基隆市">基隆市</option>
                  <option value="台北市">台北市</option>
                  <option value="新北市">新北市</option>
                  <option value="桃園市">桃園市</option>
                  <option value="新竹縣">新竹縣</option>
                  <option value="新竹市">新竹市</option>
                  <option value="苗栗縣">苗栗縣</option>
                  <option value="台中市">台中市</option>
                  <option value="彰化市">彰化市</option>
                  <option value="南投縣">南投縣</option>
                  <option value="雲林縣">雲林縣</option>
                  <option value="嘉義縣">嘉義縣</option>
                  <option value="台南市">台南市</option>
                  <option value="高雄市">高雄市</option>
                  <option value="屏東縣">屏東縣</option>
                  <option value="花蓮縣">花蓮縣</option>
                  <option value="宜蘭縣">宜蘭縣</option>
                </Field>
                <ErrorMessage name="公司地址縣市" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="flex-grow-1">
                <Field
                  id="sendFormInfoCompanyAddressDetail"
                  name="公司詳細地址"
                  type="text"
                  class="form-control "
                  :class="{ 'is-invalid': errors['公司詳細地址'] }"
                  placeholder="請輸入公司詳細地址"
                  rules="required"
                  v-model="form.user.options.company.CompanyAddressDetail"
                  ref="sendFormInfoCompanyAddressDetail"
                ></Field>
                <ErrorMessage name="公司詳細地址" class="invalid-feedback"></ErrorMessage>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <div class="row" v-if="temImageInputs.length > 0">
              <div
                class="col-4 mb-2"
                v-for="(item, index) in temImageInputs"
                :key="'sendFormInfoImgs' + index"
              >
                <label for="imageUrl">請選擇第 {{ index + 1 }} 張企業圖片</label>
                <input
                  :id="'sendFormInfoImgs' + index"
                  name="企業圖片"
                  type="file"
                  class="form-control d-none"
                  :class="{ 'is-invalid': errors[`企業圖片${index}`] }"
                  placeholder="請選擇照片上傳"
                  :ref="'sendFormInfoImgs' + index"
                  :data-id="index"
                  data-input="upLoadMutiImg"
                  @change="loadingImg($event)"
                  accept="image/*"
                />
                <div class="cropImgBox">
                  <div class="cropImgBox__cover" v-if="temImages[index]"></div>
                  <button
                    type="button"
                    class="btn cropImgBox__deleteBtn"
                    @click="deleteImgInput(index)"
                    data-input="upLoadMutiImg"
                  >
                    <i class="bi-x-lg"></i>
                  </button>
                  <button
                    type="button"
                    :data-id="index"
                    class="btn btn-outline-primary cropImgBtn"
                    @click="clickInput($event, index)"
                    v-if="temImages[index] == false"
                    data-input="upLoadMutiImg"
                  >
                    選擇圖片
                  </button>
                  <img
                    v-if="temImages[index]"
                    class="cropImg"
                    :ref="'cropImg' + index"
                    :src="temImages[index]"
                    alt=""
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-outline-primary w-100 mb-1"
                  @click="updateImg($event)"
                  data-input="upLoadMutiImg"
                  :data-id="index"
                  :disabled="!!temImageInputs[index].isUpDated"
                >
                  {{ temImageInputs[index].isUpDated ? '已上傳' : '上傳圖片' }}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary w-100"
                  @click="clickInput($event, index)"
                  v-if="temImages[index]"
                  data-input="upLoadMutiImg"
                  :data-id="index"
                >
                  重選
                </button>
                <!-- <p class="testTxt">{{temImages[index]}}</p> -->
              </div>
              <div class="imageBtnBox">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm d-block w-100 my-2"
                  @click="addImageUrl()"
                  v-if="temImageInputs.length < 3"
                >
                  新增圖片
                </button>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="sendFormInfoCompanyInfo" class="form-label">公司簡介</label>
            <Field
              id="sendFormInfoCompanyInfo"
              name="公司簡介"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['公司簡介'] }"
              placeholder="請輸入"
              v-model="form.user.options.company.companyInfo"
              ref="sendFormInfoCompanyInfo"
              cols="30"
              rows="10"
              as="textarea"
              rules="required"
            ></Field>
            <ErrorMessage name="公司簡介" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoName" class="form-label">聯絡人姓名</label>
            <Field
              id="sendFormInfoName"
              name="聯絡人姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['聯絡人姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
              ref="sendFormInfoName"
            ></Field>
            <ErrorMessage name="聯絡人姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoEmail" class="form-label">聯絡人Email</label>
            <Field
              id="sendFormInfoEmail"
              name="聯絡人Email"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['聯絡人Email'] }"
              placeholder="請輸入Email"
              rules="email|required"
              v-model="form.user.email"
              ref="sendFormInfoName"
            ></Field>
            <ErrorMessage name="聯絡人Email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoTel" class="form-label">聯絡人電話</label>
            <Field
              id="sendFormInfoTel"
              name="聯絡人電話"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors['聯絡人電話'] }"
              placeholder="請輸入電話"
              rules="required"
              v-model="form.user.tel"
              ref="sendFormInfoTel"
            ></Field>
            <ErrorMessage name="聯絡人電話" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoContactPosition" class="form-label">聯絡人職稱</label>
            <input
              id="sendFormInfoContactPosition"
              name="聯絡人職稱"
              type="text"
              class="form-control"
              placeholder="請輸入聯絡人職稱"
              v-model="form.user.options.company.contactPosition"
              ref="sendFormInfoContactPosition"
            />
          </div>
          <div class="mb-3">
            <label for="sendFormInfoAddJobsToken" class="form-label">預先購買職位刊登額度</label>
            <div class="input-group">
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                @click="deleteNum"
              >
                -
              </button>
              <Field
                id="sendFormInfoAddJobsToken"
                name="職位刊登額度"
                type="number"
                class="form-control"
                :class="{ 'is-invalid': errors['職位刊登額度'] }"
                min="1"
                v-model.number="form.user.options.jobToken"
                ref="sendFormInfoAddJobsToken"
                rules="required"
              >
              </Field>
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                @click="addNum"
              >
                +
              </button>
            </div>
            <ErrorMessage name="職位刊登額度" class="invalid-feedback"></ErrorMessage>
            <p>職位刊登額度：刊登一個職位需要一個職位刊登額度，刊登付費推廣職位需要兩個額度</p>
          </div>
          <button type="submit" class="btn btn-primary">送出資料</button>
          <!-- <button type="button" class="btn btn-primary" @click="checkFile">上傳照片</button> -->
        </Form>
      </div>
    </div>
  </div>
  <ImageCropper @emit-send-img-data="getImg"></ImageCropper>
</template>

<script>
import emitter from '@/components/helpers/emitter';
import ImageCropper from '@/components/ImageCropperModal.vue';

export default {
  components: { ImageCropper },
  data() {
    return {
      // 切圖工具
      cropper: {},
      // 建立企業資訊表單
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          options: {
            formAction: 'add-company',
            company: {
              companyName: '',
              industryCategory: '',
              companyAddress: '',
              companyAddressDetail: '',
              companyInfo: '',
              contactPosition: '',
              companyImagesUrl: [''],
              companyLogoUrl: '',
            },
            jobToken: 1,
          },
          message: '',
        },
      },
      // 購物車資訊
      cartList: [],
      cartTotal: null,
      // 圖片使用
      temImages: [''],
      temImageInputs: [{ src: '', isUpDated: false }],
      companyLogo: { src: '', isUpDated: false },
      // 驗證使用
      uploadImgState: '',
      formState: true,
    };
  },
  methods: {
    // 取得圖片傳給modal
    loadingImg(e) {
      console.log(this.uploadImgState);
      let nowId = 0;
      if (this.uploadImgState === 'upLoadMutiImg') {
        nowId = e.target.dataset.id;
      } else {
        nowId = '';
      }
      emitter.emit('open-imageCropper', [e.target.files[0], nowId, this.uploadImgState]);
    },
    // 從modal抓回圖片
    getImg(data, img, id) {
      console.log(data, img, id);
      if (this.uploadImgState === 'upLoadMutiImg') {
        console.log(data, img, id);
        this.temImageInputs[id].src = data;
        this.temImages[id] = img.src;
        console.log(this.temImageInputs[id]);
      } else if (this.uploadImgState === 'upLoadSingleImg') {
        this.companyLogo.src = data;
      }
    },
    clickInput(e, index) {
      console.log(e.target.dataset.input);
      if (e.target.dataset.input === 'upLoadMutiImg') {
        const item = `sendFormInfoImgs${index}`;
        this.$refs[item].click();
        this.uploadImgState = 'upLoadMutiImg';
      } else if (e.target.dataset.input === 'upLoadSingleImg') {
        this.$refs.sendFormInfoCompanyLogo.click();
        this.uploadImgState = 'upLoadSingleImg';
      }
    },
    // 上傳圖片
    updateImg(e) {
      emitter.emit('spinner-open');
      const nowId = e.target.dataset.id;
      this.uploadImgState = e.target.dataset.input;
      let item = null;
      if (this.uploadImgState === 'upLoadMutiImg') {
        item = this.temImageInputs[nowId].src;
      } else if (this.uploadImgState === 'upLoadSingleImg') {
        item = this.companyLogo.src;
      }
      const base64String = item.replace('data:image/jpeg;base64,', '');
      this.$http({
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        data: {
          image: base64String,
          type: 'base64',
        },
        headers: {
          Authorization: 'Client-ID ef6e862acf052df',
        },
      })
        .then((res) => {
          console.log('imagur:', res.data, nowId);
          console.log(this.uploadImgState);
          if (this.uploadImgState === 'upLoadMutiImg') {
            this.temImageInputs[nowId].isUpDated = true;
            this.form.user.options.company.companyImagesUrl[nowId] = res.data.data.link;
            console.log(this.form.user.options.company.companyImagesUrl[nowId]);
          } else if (this.uploadImgState === 'upLoadSingleImg') {
            this.companyLogo.isUpDated = true;
            this.form.user.options.company.companyLogoUrl = res.data.data.link;
            console.log(this.form.user.options.company.companyLogoUrl);
          }
          emitter.emit('spinner-close');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 上傳表單前處理資料
    processFormData() {
      emitter.emit('delete-imageCropper');
      if (this.companyLogo.isUpDated === false) {
        this.this.formState = false;
      }
      this.form.user.address = `${this.form.user.options.company.companyAddress}
      ${this.form.user.options.company.companyAddressDetail}`;
      if (this.formState === false) {
        console.log('沒東西');
        this.deleteCart();
      } else {
        this.addCartJob(this.form.user.options.jobToken);
      }
    },
    // 上傳表單前加入職位額度
    addCartJob(qty = 1) {
      const id = '-MctDx8Qj8Tmw9eJoZqN';
      const product = { data: { product_id: id, qty } };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, product)
        .then((res) => {
          console.log(`${res.data.message}:${id}`);
          this.getCart();
          this.sendForm();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 上傳表單
    sendForm() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const formData = {
        data: this.form,
      };
      this.$http
        .post(url, formData)
        .then((res) => {
          console.log(`${res.data.message}`);
          console.log(res);
          emitter.emit('spinner-close');
          if (res.data.success) {
            this.deleteCart();
            this.$router.push('/');
          }
        })
        .catch((error) => {
          console.log(error);
          emitter.emit('spinner-close');
        });
    },
    addImageUrl() {
      this.temImages.push('');
      this.form.user.options.company.companyImagesUrl.push('');
      this.temImageInputs.push({ src: '', isUpDated: false });
    },
    deleteImgInput(index) {
      this.temImages.splice(index, 1);
      this.form.user.options.company.companyImagesUrl.splice(index, 1);
      this.temImageInputs.splice(index, 1);
    },
    deleteCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then((res) => {
          console.log(`${res.data.message}`);
          this.getCart();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteNum() {
      if (this.form.user.options.jobToken > 1) {
        this.form.user.options.jobToken -= 1;
      }
    },
    addNum() {
      this.form.user.options.jobToken += 1;
    },
    getCart() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          this.cartList = res.data.data.carts;
          // this.cartTotal = res.data.data.final_total;
          emitter.emit('spinner-close');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.deleteCart();
  },
  mounted() {
    emitter.emit('close-imageCropper');
  },
};
</script>

<style lang="scss">
.cropImgBox {
  width: 100%;
  height: 120px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .cropImg {
    max-width: 100%;
    max-height: 120px;
    overflow: hidden;
  }
  .cropImgBox__deleteBtn {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 80;
  }
  .cropImgBox__cover {
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    position: absolute;
    // 設置背景混和模式為相乘模式
  }
  .testTxt{
    display: block;
    width: 100px;
    height: 24px;
    overflow: hidden;
    word-wrap: break-word;
  }
}
</style>
