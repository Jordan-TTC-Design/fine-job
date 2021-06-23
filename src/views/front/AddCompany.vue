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
              v-model="form.options.companyName"
              ref="sendFormInfoCompanyName"
            ></Field>
            <ErrorMessage name="公司名稱" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoIndustryCategory" class="form-label">公司行業類別</label>
            <Field name="公司行業類別">
              <select
                id="sendFormInfoIndustryCategory"
                class="form-control form-select"
                :class="{ 'is-invalid': errors['公司行業類別'] }"
                rules="required"
                v-model="form.options.industryCategory"
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
                <option value="法律、會計、顧問、研發、設計業"
                  >法律、會計、顧問、研發、設計業</option
                >
                <option value="建築營造及不動產相關業">建築營造及不動產相關業</option>
                <option value="醫療保健及環境衛生業">醫療保健及環境衛生業</option>
                <option value="礦業及土石採取業">礦業及土石採取業</option>
                <option value="住宿、餐飲服務業">住宿、餐飲服務業</option>
              </select>
            </Field>
            <ErrorMessage name="公司行業類別" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoCompanyAddress" class="form-label">公司地址</label>
            <div class="d-flex">
              <div class=" flex-shrink-1 me-2">
                <Field name="公司地址縣市">
                  <select
                    id="sendFormInfoCompanyAddress"
                    class="form-control form-select "
                    :class="{ 'is-invalid': errors['公司地址縣市'] }"
                    rules="required"
                    v-model="form.options.CompanyAddress"
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
                  </select>
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
                  v-model="form.options.CompanyAddressDetail"
                  ref="sendFormInfoCompanyAddressDetail"
                ></Field>
                <ErrorMessage name="公司詳細地址" class="invalid-feedback"></ErrorMessage>
              </div>
            </div>
          </div>
          <div v-if="form.options.imagesUrl.length > 0">
            <div v-for="(item, index) in form.options.imagesUrl" :key="'sendFormInfoImgs' + index">
              <div class="form-group">
                <label for="imageUrl">請選擇第 {{ index + 1 }} 張圖片檔案</label>
                <div class="input-group">
                  <input
                    :id="'sendFormInfoImgs' + index"
                    name="求職照片"
                    type="file"
                    class="form-control"
                    :class="{ 'is-invalid': errors[`求職照片${index}`] }"
                    placeholder="請選擇照片上傳"
                    :ref="'sendFormInfoImgs' + index"
                    @change="uploadImg($event)"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="checkFile($event)"
                    :data-id="index"
                  >
                    上傳照片
                  </button>
                  <button
                    v-if="index > 0"
                    type="button"
                    class="btn btn-outline-primary"
                    @click="form.options.imagesUrl.splice(index, 1)"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <p>連結：{{ item }}</p>
              <img class="img-fluid" alt="" :src="item" />
              <img id="cropImg" />
              <!-- 3.兩個用於預覽的div  -->
              <div class="previewText">裁剪預覽</div>
              <div class="previewBox"></div>
              <div class="previewBoxRound"></div>
            </div>
          </div>
          <div class="imageBtnBox">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm d-block w-100 my-2"
              @click="addImageUrl()"
            >
              新增圖片
            </button>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoCompanyInfo" class="form-label">公司簡介</label>
            <textarea
              id="sendFormInfoCompanyInfo"
              name="公司簡介"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['公司簡介'] }"
              placeholder="請輸入"
              v-model="form.options.companyInfo"
              ref="sendFormInfoCompanyInfo"
              cols="30"
              rows="10"
            ></textarea>
            <!-- <ErrorMessage name="留言" class="invalid-feedback"></ErrorMessage> -->
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
              v-model="form.options.contactPosition"
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
              v-model.number="form.options.addJobsToken"
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
</template>

<script>
import emitter from '@/components/helpers/emitter';
import Cropper from 'cropperjs';

export default {
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
          companyName: '',
          industryCategory: '',
          CompanyAddress: '',
          CompanyAddressDetail: '',
          companyInfo: '',
          contactPosition: '',
          imagesUrl: [''],
          addJobsToken: 1,
        },
      },
      formState: false,
    };
  },
  methods: {
    uploadImg(e) {
    //   const nowId = e.target.dataset.id;
    //   const refsItem = `sendFormInfoImgs${nowId}`;
    //   this.$refs[refsItem].click();
      const reader = new FileReader();
      if (e.target.files[0]) {
        // readAsDataURL方法可以將File對象轉化為data:URL格式的字符串（base64編碼）
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (event) => {
          console.log(event);
          const dataURL = reader.result;
          // 將img的src改為剛上傳的文件的轉換格式
          document.querySelector('#cropImg').src = dataURL;
          const image = document.getElementById('cropImg');
          // 創建cropper實例-----------------------------------------
          const CROPPER = new Cropper(image, {
            aspectRatio: 16 / 9,
            viewMode: 0,
            minContainerWidth: 320,
            minContainerHeight: 320,
            dragMode: 'move',
            preview: [document.querySelector('.previewBox'),
              document.querySelector('.previewBoxRound')],
          });
          console.log(CROPPER);
        };
      }
    },
    checkFile(e) {
      const nowId = e.target.dataset.id;
      const refsItem = `sendFormInfoImgs${nowId}`;
      const file = this.$refs[refsItem].files[0];
      console.log(file);
      const formData = new FormData();
      formData.append('companyImgs', file);
      this.uploadFile(formData, nowId);
    },
    uploadFile(formData, nowId) {
      // const imgurToken = 'Client-ID 4ef4ca52de4b42c';
      // const url = 'https://api.imgur.com/3/image';
      this.$http({
        method: 'POST',
        url: 'https://api.imgur.com/3/upload',
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
    checkCart() {
      if (this.form.options.CompanyAddress !== '') {
        this.form.user.address = `${this.form.options.CompanyAddressDetail}
      ${this.form.options.CompanyAddress}`;
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
      this.addCartJob(this.form.options.addJobsToken);
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
      this.form.options.imagesUrl.push('');
    },
    deleteImageUrl() {
      this.form.options.imagesUrl.pop();
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
  },
};
</script>

<style lang="scss">
#cropImg{
    max-width: 320px;
    max-height:180px
}
    </style>
