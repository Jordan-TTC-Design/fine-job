<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <h2 class="text-center">新建職位</h2>
        <!-- <Form ref="sendFormInfoForm" v-slot="{ errors }" @submit="checkCart"> -->
        <!-- 表單第一步：選擇公司 -->
        <div class="jobFormStepfFrist" ref="jobFormStepfFrist" v-if="formStep === 1">
          <h5 class="text-center">第一步：選擇您的企業</h5>
          <Form ref="sendFormInfoForm1" v-slot="{ errors }" @submit="changeStep('next')">
            <!-- 表單1-1：公司名稱(必填) -->
            <div class="mb-3">
              <label for="sendFormInfoCompanyName" class="form-label">公司名稱</label>
              <Field
                id="sendFormInfoCompanyName"
                ref="sendFormInfoCompanyName"
                name="公司名稱"
                as="select"
                class="form-control  form-select"
                :class="{ 'is-invalid': errors['公司名稱'] }"
                rules="required"
                v-model="form.user.options.company.companyName"
                @change="checkCompanyToken()"
              >
                <option value="" disabled selected>選擇企業名稱</option>
                <option v-for="(item, index) in companyList" :value="item.title" :key="index">{{
                  item.title
                }}</option>
              </Field>
              <ErrorMessage name="公司名稱" class="invalid-feedback"></ErrorMessage>
            </div>

            <!-- 表單操作按鈕 -->
            <div class="formStepBtnBox">
              <button
                type="button"
                class="btn btn-secondary"
                @click="changeStep('back')"
                v-if="formStep > 1"
              >
                上一步
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                v-if="form.user.options.company.companyName"
              >
                下一步
              </button>
            </div>
          </Form>
        </div>
        <!-- 表單第二步：填寫職位資料 -->
        <div class="jobFormStepfSecond" ref="jobFormStepfSecond" v-if="formStep === 2">
          <h5 class="text-center">第二步：填寫職位資料</h5>
          <Form ref="sendFormInfoForm2" v-slot="{ errors }" @submit="changeStep('next')">
            <!-- 表單2-1：職位名稱(必填) -->
            <div class="mb-3">
              <label for="sendFormInfoJobName" class="form-label">職位名稱</label>
              <Field
                id="sendFormInfoJobName"
                ref="sendFormInfoJobName"
                name="職位名稱"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['職位名稱'] }"
                placeholder="請輸入職位名稱"
                rules="required"
                v-model="form.user.options.job.jobName"
              ></Field>
              <ErrorMessage name="職位名稱" class="invalid-feedback"></ErrorMessage>
            </div>
            <!-- 表單2-2：職位類別(必填) -->
            <div class="mb-3">
              <label for="sendFormInfoJobCategory" class="form-label">職位類別</label>
              <Field
                id="sendFormInfoJobCategory"
                ref="sendFormInfoJobCategory"
                name="職位類別"
                as="select"
                class="form-control form-select"
                :class="{ 'is-invalid': errors['職位類別'] }"
                rules="required"
                v-model="form.user.options.job.jobCategory"
              >
                <option value="" disabled selected>選擇職位類別</option>
                <option v-for="(item, index) in formData.jobCategory" :value="item" :key="index">{{
                  item
                }}</option>
              </Field>
              <ErrorMessage name="職位類別" class="invalid-feedback"></ErrorMessage>
            </div>
            <!-- 表單2-3：需求人數(必填) -->
            <div class="mb-3">
              <label for="sendFormInfoNeedPerson" class="form-label">需求人數</label>
              <Field
                id="sendFormInfoNeedPerson"
                ref="sendFormInfoNeedPerson"
                name="需求人數"
                type="number"
                class="form-control"
                :class="{ 'is-invalid': errors['需求人數'] }"
                min="1"
                rules="required"
                v-model.number="form.user.options.job.needPerson"
              ></Field>
              <ErrorMessage name="需求人數" class="invalid-feedback"></ErrorMessage>
            </div>
            <!-- 表單2-4：薪資(必填) -->
            <div class="mb-3 ">
              <label for="sendFormInfoSalary" class="form-label">薪資</label>
              <div class="d-flex align-items-center">
                <div class="flex-grow-1 me-2">
                  <Field
                    id="sendFormInfoSalary"
                    ref="sendFormInfoSalary"
                    name="薪資"
                    type="number"
                    :placeholder="
                      form.user.options.job.salaryInterView ? '面議薪資勿低於 40,000 ' : '請輸入'
                    "
                    class="form-control"
                    :class="{ 'is-invalid': errors['薪資'] }"
                    min="0"
                    v-model.number="form.user.options.job.salary"
                    :disabled="form.user.options.job.salaryInterView"
                  ></Field>
                  <ErrorMessage name="薪資" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form-check">
                  <input
                    id="sendFormInfoSalaryInterView"
                    ref="sendFormInfoSalaryInterView"
                    name="薪資"
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.user.options.job.salaryInterView"
                  />
                  <label class="form-check-label" for="sendFormInfoSalaryInterView">
                    面議
                  </label>
                </div>
              </div>
            </div>
            <!-- 表單2-4：上班時段(必填) -->
            <div class="mb-3">
              <label class="form-label d-block">上班時段</label>
              <div class="btn-group" role="group">
                <Field name="上班時段">
                  <div class="form-check" v-for="(item, index) in formData.workTime" :key="index">
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="item"
                      :id="'workTime' + index"
                      :name="item"
                      v-model="form.user.options.job.workTime"
                    />
                    <label class="form-check-label" :for="'workTime' + index">
                      {{ item }}
                    </label>
                  </div>
                </Field>
                <ErrorMessage name="上班時段" class="invalid-feedback"></ErrorMessage>
              </div>
            </div>
            <!-- 表單2-5：工作性質(必填) -->
            <div class="mb-3">
              <label class="form-label d-block">工作性質</label>
              <div class="btn-group" role="group">
                <div class="form-check" v-for="(item, index) in formData.workType" :key="index">
                  <input
                    class="form-check-input"
                    type="radio"
                    :value="item"
                    :id="'workType' + index"
                    :name="item"
                    v-model="form.user.options.job.workType"
                  />
                  <label class="form-check-label" :for="'workType' + index">
                    {{ item }}
                  </label>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div>
                <label for="sendFormInfoJobImage" class="form-label">職位照片</label>
                <input
                  id="sendFormInfoJobImage"
                  name="職位照片"
                  type="file"
                  class="form-control d-none"
                  :class="{ 'is-invalid': errors['職位照片'] }"
                  ref="sendFormInfoJobImage"
                  data-input="upLoadSingleImg"
                  @change="loadingImg($event)"
                  accept="image/*"
                />
                <div class="cropImgBox">
                  <div class="cropImgBox__cover" v-if="jobImage.src"></div>
                  <button
                    type="button"
                    class="btn btn-outline-primary cropImgBtn"
                    @click="clickInput($event)"
                    data-input="upLoadSingleImg"
                    v-if="jobImage.src == ''"
                  >
                    選擇圖片
                  </button>
                  <img
                    v-if="jobImage.src !== ''"
                    class="cropImg"
                    ref="cropImgCompanyLogo"
                    :src="jobImage.src"
                    alt=""
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-outline-primary w-100 mb-1"
                  @click="updateImg($event)"
                  data-input="upLoadSingleImg"
                  :disabled="!!jobImage.isUpDated"
                >
                  {{ jobImage.isUpDated ? '已上傳' : '上傳圖片' }}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary w-100"
                  @click="clickInput($event)"
                  v-if="jobImage.src != ''"
                  data-input="upLoadSingleImg"
                >
                  重選
                </button>
              </div>
              <div>
                <Field
                  id="sendFormInfoJobImageCheck"
                  name="職位照片"
                  type="text"
                  class="form-control d-none"
                  :class="{ 'is-invalid': errors['職位照片'] }"
                  v-model="this.form.user.options.job.jobImageUrl"
                  ref="sendFormInfoJobImageCheck"
                  rules="required"
                ></Field>
                <ErrorMessage name="職位照片" class="invalid-feedback"></ErrorMessage>
              </div>
            </div>
            <!-- 表單2-6：職位內容(必填) -->
            <div class="mb-3">
              <label for="sendFormInfoJobContent" class="form-label">職位內容</label>
              <Field
                id="sendFormInfoJobContent"
                ref="sendFormInfoJobContent"
                name="職位內容"
                as="textarea"
                class="form-control"
                :class="{ 'is-invalid': errors['職位內容'] }"
                placeholder="請輸入"
                v-model="form.user.options.job.jobContent"
                rules="required"
                cols="30"
                rows="10"
              >
              </Field>
              <ErrorMessage name="職位內容" class="invalid-feedback"></ErrorMessage>
            </div>
            <!-- 表單2-7：是否要成為推廣職位 -->
            <div class="mb-3" v-if="form.user.options.company.companyJobToken > 0">
              <label class="form-label d-block">是否要升級成為付費推廣職位</label>
              <div class="form-check form-switch">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="sendFormInfoCostToken"
                  data-action="changeProductState"
                  data-id="${item.id}"
                  :checked="form.user.options.job.costToken > 0 ? true : false"
                  @change="changeProductState"
                />
                <label class="form-check-label" for="sendFormInfoCostToken"
                  >
                  {{ form.user.options.job.costToken > 0 ? '付費推廣(時效七天)' : '免費職位刊登' }}
                </label>
                <p>剩餘職位刊登額度：{{ form.user.options.company.companyJobToken }}</p>
              </div>
            </div>
            <!-- 表單操作按鈕 -->
            <div class="formStepBtnBox">
              <button
                type="button"
                class="btn btn-secondary"
                @click="changeStep('back')"
                v-if="formStep > 1"
              >
                上一步
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                @submit="changeStep('next')"
                v-if="form.user.options.company.companyName"
              >
                下一步
              </button>
            </div>
          </Form>
        </div>
        <!-- 表單第三步：填寫申請條件 -->
        <div class="jobFormStepfThrid" ref="jobFormStepfThrid" v-if="formStep === 3">
          <h5 class="text-center">第三步：填寫申請條件</h5>
          <!-- 表單3-1：工作經驗(必填) -->
          <Form ref="sendFormInfoForm3" v-slot="{ errors }" @submit="changeStep('next')">
            <div class="mb-3">
              <label class="form-label d-block">工作經驗</label>
              <div class="btn-group" role="group">
                <div
                  class="form-check"
                  v-for="(item, index) in formData.workExp"
                  :key="'workExp' + index"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    :value="item"
                    :id="'workExp' + index"
                    :name="item"
                    v-model="form.user.options.job.workExp"
                  />
                  <label class="form-check-label" :for="'workExp' + index">
                    {{ item }}
                  </label>
                </div>
              </div>
            </div>
            <!-- 表單3-2：學歷要求(必填) -->
            <div class="mb-3">
              <label class="form-label d-block">學歷要求</label>
              <div class="btn-group" role="group">
                <div
                  class="form-check"
                  v-for="(item, index) in formData.education"
                  :key="'education' + index"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    :value="item"
                    :id="'education' + index"
                    :name="item"
                    v-model="form.user.options.job.education"
                  />
                  <label class="form-check-label" :for="'education' + index">
                    {{ item }}
                  </label>
                </div>
              </div>
            </div>
            <!-- 表單3-3：其他條件-->
            <div class="mb-3">
              <label for="sendFormInfoOtherRequirement" class="form-label">其他自訂條件</label>
              <Field
                id="sendFormInfoOtherRequirement"
                ref="sendFormInfoOtherRequirement"
                name="其他自訂條件"
                as="textarea"
                class="form-control"
                :class="{ 'is-invalid': errors['其他自訂條件'] }"
                rules="required"
                placeholder="請輸入"
                v-model="form.user.options.job.otherRequirement"
                cols="30"
                rows="10"
              ></Field>
              <ErrorMessage name="其他自訂條件" class="invalid-feedback"></ErrorMessage>
            </div>
            <!-- 表單操作按鈕 -->
            <div class="formStepBtnBox">
              <button
                type="button"
                class="btn btn-secondary"
                @click="changeStep('back')"
                v-if="formStep > 1"
              >
                上一步
              </button>
              <button
                type="submit"
                class="btn btn-secondary"
                v-if="form.user.options.company.companyName"
              >
                下一步
              </button>
            </div>
          </Form>
        </div>
        <!-- 表單第四步：填寫聯絡人資訊 -->
        <div class="jobFormStepfFour" ref="jobFormStepfFour" v-if="formStep === 4">
          <h5 class="text-center">第四步：填寫聯絡人資訊</h5>
          <Form ref="sendFormInfoForm4" v-slot="{ errors }" @submit="checkCart">
            <!-- 表單3-1：聯絡人姓名-->
            <div class="mb-3">
              <label for="sendFormInfoName" class="form-label">聯絡人姓名</label>
              <Field
                id="sendFormInfoName"
                ref="sendFormInfoName"
                name="聯絡人姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['聯絡人姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="form.user.name"
              ></Field>
              <ErrorMessage name="聯絡人姓名" class="invalid-feedback"></ErrorMessage>
            </div>
            <!-- 表單3-2：聯絡人職稱-->
            <div class="mb-3">
              <label for="sendFormInfoContactPosition" class="form-label">聯絡人職稱</label>
              <input
                id="sendFormInfoContactPosition"
                ref="sendFormInfoContactPosition"
                name="聯絡人職稱"
                type="text"
                class="form-control"
                placeholder="請輸入聯絡人職稱"
                v-model="form.user.options.company.contactPosition"
              />
            </div>
            <!-- 表單3-3：聯絡人電話-->
            <div class="mb-3">
              <label for="sendFormInfoTel" class="form-label">聯絡人電話</label>
              <Field
                id="sendFormInfoTel"
                ref="sendFormInfoTel"
                name="聯絡人電話"
                type="number"
                class="form-control"
                :class="{ 'is-invalid': errors['聯絡人電話'] }"
                placeholder="請輸入電話"
                rules="required"
                v-model.number="form.user.tel"
              ></Field>
              <ErrorMessage name="聯絡人電話" class="invalid-feedback"></ErrorMessage>
            </div>
            <!-- 表單3-4：聯絡人Email-->
            <div class="mb-3">
              <label for="sendFormInfoEmail" class="form-label">聯絡人Email</label>
              <Field
                id="sendFormInfoEmail"
                ref="sendFormInfoEmail"
                name="聯絡人Email"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['聯絡人Email'] }"
                placeholder="請輸入Email"
                rules="email|required"
                v-model="form.user.email"
              ></Field>
              <ErrorMessage name="聯絡人Email" class="invalid-feedback"></ErrorMessage>
            </div>
            <!-- 表單4-5：申請備註-->
            <div class="mb-3">
              <label for="sendFormInfoOtherApplyInfo" class="form-label">申請備註</label>
              <Field
                id="sendFormInfoOtherApplyInfo"
                ref="sendFormInfoOtherApplyInfo"
                name="申請備註"
                as="textarea"
                class="form-control"
                :class="{ 'is-invalid': errors['申請備註'] }"
                placeholder="請輸入"
                v-model="form.user.options.job.otherApplyInfo"
                cols="30"
                rows="10"
              ></Field>
              <ErrorMessage name="申請備註" class="invalid-feedback"></ErrorMessage>
            </div>
            <!-- 表單操作按鈕 -->
            <div class="formStepBtnBox">
              <button
                type="button"
                class="btn btn-secondary"
                @click="changeStep('back')"
                v-if="formStep > 1"
              >
                上一步
              </button>
              <button type="submit" class="btn btn-primary">
                送出資料
              </button>
            </div>
          </Form>
        </div>
        <!-- <button type="button" class="btn btn-primary" @click="checkFile">上傳照片</button> -->
      </div>
    </div>
  </div>
  <ImageCropper @emit-send-img-data="getImg"></ImageCropper>
</template>

<script>
import emitter from '@/components/helpers/emitter';
import webData from '@/components/helpers/webData';
// import Cropper from 'cropperjs';
import ImageCropper from '@/components/ImageCropperModal.vue';

export default {
  components: { ImageCropper },
  data() {
    return {
      cartList: [],
      cartTotal: null,
      tempLists: [],
      companyList: [],
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          options: {
            formAction: 'add-job',
            job: {
              jobName: '',
              needPerson: 1,
              salary: '',
              salaryInterView: false,
              jobCategory: '',
              jobContent: '',
              jobImageUrl: '',
              education: '',
              workExp: '',
              workTime: '',
              workType: '',
              relatedAreas: '',
              otherRequirement: '',
              otherApplyInfo: '',
            },
            company: {
              companyName: '',
              industryCategory: '',
              costToken: 1,
              companyJobToken: 0,
              contactPosition: '',
              companyAddressCity: '',
              companyAddressDetail: '',
              companyLogoUrl: '',
              companyImagesUrl: '',
            },
          },
        },
        message: '',
      },
      formData: {},
      formState: false,
      formStep: 1,
      jobImage: { src: '', isUpDated: false },
      cropper: {},
      uploadImgState: '',
    };
  },
  methods: {
    // 取得圖片傳給modal
    loadingImg(e) {
      console.log(this.uploadImgState);
      const nowId = '';
      emitter.emit('open-imageCropper', [e.target.files[0], nowId]);
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
        this.jobImage.src = data;
      }
    },
    // 觸發 圖片input
    clickInput(e) {
      console.log(e.target.dataset.input);
      if (e.target.dataset.input === 'upLoadSingleImg') {
        this.$refs.sendFormInfoJobImage.click();
        this.uploadImgState = 'upLoadSingleImg';
      }
    },
    // 上傳圖片
    updateImg(e) {
      emitter.emit('spinner-open');
      const nowId = e.target.dataset.id;
      this.uploadImgState = e.target.dataset.input;
      let item = null;
      if (this.uploadImgState === 'upLoadSingleImg') {
        item = this.jobImage.src;
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
          if (this.uploadImgState === 'upLoadSingleImg') {
            this.jobImage.isUpDated = true;
            this.form.user.options.job.jobImageUrl = res.data.data.link;
            console.log(this.form.user.options.job.jobImageUrl);
          }
          emitter.emit('spinner-close');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeProductState() {
      if (this.form.user.options.job.costToken > 0) {
        this.form.user.options.job.costToken = 0;
        this.form.user.options.company.companyJobToken += 1;
      } else {
        this.form.user.options.job.costToken = 1;
        this.form.user.options.company.companyJobToken -= 1;
      }
    },
    changeStep(way) {
      if (way === 'back' && this.formStep > 0) {
        this.formStep -= 1;
      } else if (way === 'next') {
        this.formStep += 1;
      }
      console.log(this.formStep);
    },
    checkCompanyToken() {
      const { companyName } = this.form.user.options.company;
      this.companyList.forEach((item) => {
        if (item.title === companyName) {
          // 自動帶入一些資料
          const tempObj = item.options;
          this.form.user.options.company.companyJobToken = tempObj.companyJobToken;
          this.form.user.name = tempObj.companyContact;
          this.form.user.email = tempObj.companyEmail;
          this.form.user.tel = tempObj.companyTel;
          this.form.user.options.company.companyAddressCity = tempObj.companyAddressCity;
          this.form.user.options.company.industryCategory = item.category;
          this.form.user.options.company.companyAddressDetail = tempObj.companyAddressDetail;
          this.form.user.options.company.contactPosition = tempObj.companyContactPosition;
          this.form.user.options.company.companyLogoUrl = item.imageUrl;
          this.form.user.options.company.companyImagesUrl = item.imagesUrl;
        }
      });
      console.log(this.form);
    },
    addCartJob(qty = 1) {
      const id = '-MdgiKJN2vitTB6FWCvw';
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
    checkCart() {
      if (this.form.user.options.company.companyAddressCity !== '') {
        const city = this.form.user.options.company.companyAddressCity;
        const detail = this.form.user.options.company.companyAddressDetail;
        this.form.user.address = city + detail;
        this.addCartJob(this.form.user.options.addJobsToken);
        this.formState = true;
      }
    },
    sendForm() {
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
            this.$router.push('/');
          })
          .catch((error) => {
            console.log(error);
          });
      }
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

    getCart() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          this.cartList = res.data.data.carts;
          // this.cartTotal = res.data.data.final_total;
          emitter.emit('spinner-close');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProductsData() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          //   console.log(res);
          this.tempLists = res.data.products;
          this.sortCompany(this.tempLists);
          emitter.emit('spinner-close');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sortCompany(array) {
      array.forEach((item) => {
        if (item.description === '企業') {
          this.companyList.push(item);
        }
      });
      console.log(this.companyList);
    },
  },
  created() {
    this.deleteCart();
    this.formData = webData;
    console.log(webData);
  },
  mounted() {
    this.getProductsData();
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
  .cropImgBox__cover {
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    position: absolute;
    // 設置背景混和模式為相乘模式
  }
  .testTxt {
    display: block;
    width: 100px;
    height: 24px;
    overflow: hidden;
    word-wrap: break-word;
  }
}
</style>
