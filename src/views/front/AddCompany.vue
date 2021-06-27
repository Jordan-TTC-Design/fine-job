<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <h2 class="text-center">新建企業</h2>
        <Form ref="sendFormInfoForm" v-slot="{ errors }" @submit="checkCart">
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
              v-model="form.options.company.companyName"
              ref="sendFormInfoCompanyName"
            ></Field>
            <ErrorMessage name="公司名稱" class="invalid-feedback"></ErrorMessage>
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
              v-model="form.options.company.industryCategory"
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
                  v-model="form.options.company.CompanyAddress"
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
                  v-model="form.options.company.CompanyAddressDetail"
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
                      :class="{ 'is-invalid': errors[`求職照片${index}`] }"
                      placeholder="請選擇照片上傳"
                      :ref="'sendFormInfoImgs' + index"
                      :data-id="index"
                      data-input="companyImg"
                      @change="loadingImg($event)"
                      accept="image/*"
                    />

                <!-- <p>連結：{{ item }}</p> -->
                <div class="cropImgBox">
                  <div class="cropImgBox__cover" v-if="temImages[index]"></div>
                  <button
                      type="button"
                      class="btn cropImgBox__deleteBtn"
                      @click="deleteImgInput(index)"
                      data-input="companyImg"
                    >
                      <i class="bi-x-lg"></i>
                    </button>
                  <button
                    type="button"
                    :data-id="index"
                    class="btn btn-outline-primary cropImgBtn"
                    @click="clickInput($event,index)"
                    v-if="temImages[index] == false"
                    data-input="companyImg"
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
                  @click="checkFile($event)"
                  data-input="companyImg"
                  :data-id="index">確定上傳</button>
                  <button
                  type="button"
                  class="btn btn-outline-secondary w-100"
                  @click="clickInput($event,index)"
                  v-if="temImages[index]"
                  data-input="companyImg"
                  :data-id="index">重選</button>
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
            <label for="sendFormInfoCompanyLogo" class="form-label">公司logo</label>
            <input
              id="sendFormInfoCompanyLogo"
              name="公司logo"
              type="file"
              class="form-control d-none"
              :class="{ 'is-invalid': errors['公司logo'] }"
              ref="sendFormInfoCompanyLogo"
              rules="required"
              data-input="companyLogo"
              @change="loadingImg($event)"
              accept="image/*"
            >
            <div class="cropImgBox">
                  <div class="cropImgBox__cover" v-if="form.options.company.CompanyLogo"></div>
                  <button
                    type="button"
                    class="btn btn-outline-primary cropImgBtn"
                    @click="clickInput($event)"
                    data-input="companyLogo"
                    v-if="companyLogo == ''"
                  >
                    選擇圖片
                  </button>
                  <img
                    v-if="companyLogo !== []"
                    class="cropImg"
                    ref="cropImgCompanyLogo"
                    :src="companyLogo"
                    alt=""
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-outline-primary w-100 mb-1"
                  @click="checkFile($event)"
                  data-input="companyLogo"
                  >確定上傳</button>
                  <button
                  type="button"
                  class="btn btn-outline-secondary w-100"
                  @click="clickInput($event)"
                  v-if="companyLogo != ''"
                  data-input="companyLogo"
                  >重選</button>
            <!-- <ErrorMessage name="公司logo" class="invalid-feedback"></ErrorMessage> -->
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
              v-model="form.options.company.companyInfo"
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
              v-model="form.options.company.contactPosition"
              ref="sendFormInfoContactPosition"
            />
          </div>
          <div class="mb-3">
            <label for="sendFormInfoAddJobsToken" class="form-label">職位刊登額度</label>
            <Field
              id="sendFormInfoAddJobsToken"
              name="職位刊登額度"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors['職位刊登額度'] }"
              min="1"
              v-model.number="form.options.company.addJobsToken"
              ref="sendFormInfoAddJobsToken"
            ></Field>
            <ErrorMessage name="職位刊登額度" class="invalid-feedback"></ErrorMessage>
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
      cartList: [],
      cartTotal: null,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
        options: {
          pageAction: 'add-company',
          company: {
            companyName: '',
            industryCategory: '',
            companyAddress: '',
            companyAddressDetail: '',
            companyInfo: '',
            contactPosition: '',
            companyImagesUrl: [''],
            companyLogo: '',
          },
          addJobsToken: 1,
        },
      },
      formState: false,
      imageSrc: '',
      cropper: {},
      temImages: [''],
      temImageInputs: [''],
      companyLogo: '',
      uploadImgState: '',
    };
  },
  methods: {
    // 取得圖片傳給modal
    loadingImg(e) {
      console.log(this.uploadImgState);
      let nowId = 0;
      if (this.uploadImgState === 'companyImg') {
        nowId = e.target.dataset.id;
        // console.log(this.temImageInputs);
      }
      emitter.emit('open-imageCropper', [e.target.files[0], nowId]);

      // console.log(nowId);
      // console.log(e.target.files);
      // console.log(this.temImageInputs);
      // emitter.emit('open-imageCropper', [e.target.files[0], nowId]);
    },
    // 從modal抓回圖片
    getImg(data, img, id) {
      if (this.uploadImgState === 'companyImg') {
        console.log(data, img, id);
        this.temImageInputs[id] = img;
        this.temImages[id] = img.src;
        console.log(this.temImageInputs);
      } else if (this.uploadImgState === 'companyLogo') {
        this.companyLogo = img.src;
      }
    },
    clickInput(e, index) {
      console.log(e.target.dataset.input);
      if (e.target.dataset.input === 'companyImg') {
        const item = `sendFormInfoImgs${index}`;
        this.$refs[item].click();
        this.uploadImgState = 'companyImg';
      } else if (e.target.dataset.input === 'companyLogo') {
        this.$refs.sendFormInfoCompanyLogo.click();
        this.uploadImgState = 'companyLogo';
      }
    },
    // 上傳圖片
    checkFile(e) {
      const nowId = e.target.dataset.id;
      console.log(nowId);
      const refsItem = `cropImg${nowId}`;
      const file = this.$refs[refsItem];
      // const file = this.temImages[nowId];
      console.dir(this.$refs[refsItem]);
      // console.dir(file);
      const formData = new FormData();
      formData.append('image', file);
      console.log(formData);
      this.uploadFile(formData, nowId);
    },
    uploadFile(formData, nowId) {
      // const imgurToken = 'Client-ID 4ef4ca52de4b42c';
      // const url = 'https://api.imgur.com/3/image';
      console.dir(formData, nowId);
      this.$http({
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        data: formData,
        headers: {
          Authorization: 'Client-ID ef6e862acf052df',
        },
        mimeType: 'multipart/form-data',
      })
        .then((res) => {
          console.log(res.data);
          this.options.imagesUrl[nowId] = res.data.data.link;
          // console.log(res.data.data.link);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteImgInput(index) {
      this.temImages.splice(index, 1);
      this.temImageInputs.splice(index, 1);
    },
    checkCart() {
      if (this.form.options.company.CompanyAddress !== '') {
        this.form.user.address = `${this.form.options.company.CompanyAddressDetail}
      ${this.form.options.company.CompanyAddress}`;
        if (this.$refs.sendFormInfoCompanyInfo !== '') {
          this.getCart();
          this.formState = true;
          this.sendForm();
        } else {
          this.formState = false;
          console.log('有表單沒完成！');
        }
      } else {
        console.log('沒選縣市！');
      }
    },
    sendForm() {
      this.addCartJob(this.form.options.company.addJobsToken);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      if (this.formState === false) {
        console.log('沒東西');
        this.deleteCart();
      } else {
        const formData = {
          data: this.form,
        };
        this.$http
          .post(url, formData)
          .then((res) => {
            console.log(`${res.data.message}`);
            console.log(res);
            this.deleteCart();
            // this.$router.push('/');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    addImageUrl() {
      this.temImages.push('');
      this.temImageInputs.push('');
    },
    deleteImageUrl() {
      this.temImages.pop('');
      this.temImageInputs.pop('');
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
    addCartJob(qty = 1) {
      const id = '-MctDx8Qj8Tmw9eJoZqN';
      const product = { data: { product_id: id, qty } };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, product)
        .then((res) => {
          console.log(`${res.data.message}:${id}`);
          emitter.emit('get-cart');
          // this.$refs.productModal.modal.hide();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCart() {
      // emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          this.cartList = res.data.data.carts;
          this.cartTotal = res.data.data.final_total;
          // emitter.emit('spinner-close');
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
    emitter.emit('close-cart');
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
  .cropImgBox__cover{
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    position: absolute;
  // 設置背景混和模式為相乘模式
  }
}
</style>
