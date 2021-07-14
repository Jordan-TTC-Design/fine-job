<template>
  <div class="container">
    <div class="addProcess mb-6">
      <h2 class="pageTitle text-primary text-center mb-4">新建企業</h2>
      <div class="row  justify-content-center">
        <div class="col-2">
          <div
            class="addProcessBox py-2"
            ref="addProcessBox--1"
            :class="{ completed: formStep > 1 }"
          >
            <h5 class="addProcessBox__title">1</h5>
            <p class="addProcessBox__txt">填寫公司資料</p>
            <div class="icon--okBox">
              <div class="icon--okBox__innerBox">
                <i class="jobIcon bi bi-check-lg"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2">
          <div
            class="addProcessBox py-2"
            ref="addProcessBox--2"
            :class="{ completed: formStep > 2, unActive: formStep < 2 }"
          >
            <h5 class="addProcessBox__title">2</h5>
            <p class="addProcessBox__txt">填寫公司聯絡人</p>
            <div class="icon--okBox">
              <div class="icon--okBox__innerBox">
                <i class="jobIcon bi bi-check-lg"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2">
          <div
            class="addProcessBox py-2"
            ref="addProcessBox--3"
            :class="{ completed: formStep > 3, unActive: formStep < 3 }"
          >
            <h5 class="addProcessBox__title">3</h5>
            <p class="addProcessBox__txt">購買服務</p>
            <div class="icon--okBox">
              <div class="icon--okBox__innerBox">
                <i class="jobIcon bi bi-check-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="newCompanyForm box--shadow" v-if="formStep === 1">
          <Form ref="sendFormInfoForm1" v-slot="{ errors }" @submit="changeStep('next')">
            <h3 class="page__title--sub"><span class="title__icon"></span>公司基本資料</h3>
            <p class="mb-4">於 Fine Job 創建公司需嚴格審核，請填寫正確企業資訊：</p>
            <!-- 表單1-1：公司名稱(必填) -->
            <div class="row">
              <div class="col-4">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoCompanyLogo" class="form__label--custom form-label"
                      >公司logo</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <input
                    id="sendFormInfoCompanyLogo"
                    ref="sendFormInfoCompanyLogo"
                    name="公司logo"
                    type="file"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['公司logo'] }"
                    rules="required"
                    data-input="upLoadSingleImg"
                    @change="loadingImg($event)"
                    accept="image/*"
                  />
                  <div class="cropImgBox">
                    <div class="cropImgBox__cover" v-if="companyLogo.src"></div>
                    <p class="subTxt" v-if="companyLogo.src == ''">(上限 5 mb )</p>
                    <img
                      v-if="companyLogo.src !== ''"
                      class="cropImg h-100"
                      ref="cropImgCompanyLogo"
                      :src="companyLogo.src"
                      alt=""
                    />
                  </div>
                  <div class="d-flex justify-content-between">
                    <button
                      type="button"
                      class="btn"
                      @click="clickInput($event)"
                      data-input="upLoadSingleImg"
                      :class="{
                        'btn-gray-light': companyLogo.src !== '',
                        'btn-outline-primary': companyLogo.src == '',
                      }"
                    >
                      {{ companyLogo.src != '' ? '重選' : '選擇圖片' }}
                    </button>
                    <button
                      type="button"
                      class="btn"
                      @click="updateImg($event)"
                      data-input="upLoadSingleImg"
                      :class="{
                        'btn-gray-light': !!companyLogo.isUpDated || companyLogo.src == '',
                        'btn-outline-primary': companyLogo.src !== '',
                      }"
                      :disabled="!!companyLogo.isUpDated || companyLogo.src == ''"
                    >
                      {{ companyLogo.isUpDated ? '已上傳' : '上傳' }}
                    </button>
                  </div>
                  <Field
                    id="sendFormInfoCompanyLogoCheck"
                    ref="sendFormInfoCompanyLogoCheck"
                    name="公司Logo"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['公司Logo'] }"
                    v-model="form.user.options.company.companyLogoUrl"
                    rules="required"
                  ></Field>
                  <ErrorMessage name="公司Logo" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="col-8">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoCompanyName" class="form__label--custom form-label"
                      >公司名稱</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
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
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoIndustryCategory" class="form__label--custom form-label"
                      >公司行業類別</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
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
                    <option value="" disabled selected>請選擇您公司的行業類別</option>
                    <option v-for="item in formData.jobCategory" :value="item" :key="item">{{
                      item
                    }}</option>
                  </Field>
                  <ErrorMessage name="公司行業類別" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label
                      for="sendFormInfoCompanyAddressCity"
                      class="form__label--custom form-label"
                      >公司地址</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <div class="">
                    <Field
                      id="sendFormInfoCompanyAddressCity"
                      ref="sendFormInfoCompanyAddressCity"
                      name="公司地址縣市"
                      as="select"
                      class="form-control form-select w-auto mb-2"
                      :class="{ 'is-invalid': errors['公司地址縣市'] }"
                      rules="required"
                      v-model="form.user.options.company.companyAddressCity"
                    >
                      <option value="" disabled selected>請選擇縣市</option>
                      <option v-for="item in formData.city" :value="item" :key="item">{{
                        item
                      }}</option>
                    </Field>
                    <ErrorMessage name="公司地址縣市" class="invalid-feedback"></ErrorMessage>
                    <Field
                      id="sendFormInfoCompanyAddressDetail"
                      ref="sendFormInfoCompanyAddressDetail"
                      name="公司詳細地址"
                      type="text"
                      class="form-control "
                      :class="{ 'is-invalid': errors['公司詳細地址'] }"
                      placeholder="請輸入公司詳細地址"
                      rules="required"
                      v-model="form.user.options.company.companyAddressDetail"
                    ></Field>
                    <ErrorMessage name="公司詳細地址" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="form__inputBox form__infoEditBox  border-bottom border-gray-line pb-4">
                  <div class="form__labelBox">
                    <label for="sendFormInfoCompanyInfo" class="form__label--custom form-label"
                      >公司簡介</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <ckeditor
                    id="sendFormInfoCompanyInfo"
                    ref="sendFormInfoCompanyInfo"
                    name="公司簡介"
                    :editor="editor"
                    tag-name="textarea"
                    v-model="form.user.options.company.companyInfo"
                    :config="editorConfig"
                  ></ckeditor>
                  <Field
                    name="公司簡介"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['公司簡介'] }"
                    placeholder="請輸入"
                    v-model="form.user.options.company.companyInfo"
                    as="textarea"
                    rules="required"
                  >
                  </Field>
                  <ErrorMessage name="公司簡介" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="col-12">
                <h3 class="page__title--sub"><span class="title__icon"></span>公司環境形象照片</h3>
                <p class="mb-4">
                  嚴選三張符合公司形象或是公司辦公環境照片，幫助求職者能更加了解貴公司：
                </p>
                <div class="row">
                  <div
                    class="col-4"
                    v-for="(item, index) in temImageInputs"
                    :key="'sendFormInfoImgs' + index"
                  >
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="imageUrl" class="form__label--custom form-label"
                          >第 {{ index + 1 }} 張企業圖片</label
                        >
                        <p class="formTag--must" v-if="index === 0">必填</p>
                      </div>
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
                        <button
                          type="button"
                          class="iconBox btn"
                          @click="deleteImgInput(index)"
                          v-if="temImages[index]"
                        >
                          <div class="iconBox__innerBox">
                            <i class="jobIcon bi bi-x-lg"></i>
                          </div>
                        </button>
                        <div class="cropImgBox__cover" v-if="temImages[index]"></div>
                        <p class="subTxt" v-if="temImages[index] == false">(上限 5 mb )</p>
                        <img
                          v-if="temImages[index]"
                          class="cropImg"
                          :ref="'cropImg' + index"
                          :src="temImages[index]"
                          alt=""
                        />
                      </div>
                      <div class="d-flex justify-content-between">
                        <button
                          type="button"
                          :data-id="index"
                          class="btn"
                          @click="clickInput($event, index)"
                          data-input="upLoadMutiImg"
                          :class="{
                            'btn-gray-light': temImages[index],
                            'btn-outline-primary': !temImages[index],
                          }"
                        >
                          {{ temImages[index] ? '重選' : '選擇圖片' }}
                        </button>
                        <button
                          type="button"
                          class="btn"
                          @click="updateImg($event)"
                          data-input="upLoadMutiImg"
                          :data-id="index"
                          :class="{
                            'btn-gray-light':
                              !!temImageInputs[index].isUpDated || temImages[index] == false,
                            'btn-outline-primary': temImages[index],
                          }"
                          :disabled="!!temImageInputs[index].isUpDated || temImages[index] == false"
                        >
                          {{ temImageInputs[index].isUpDated ? '已上傳' : '上傳' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="formStepBtnBox d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-gray-light"
                    @click="changeStep('back')"
                    v-show="formStep > 1"
                  >
                    上一步
                  </button>
                  <button type="submit" class="btn btn-primary">
                    下一步
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div class="newCompanyForm box--shadow" v-if="formStep === 2">
          <Form ref="sendFormInfoForm2" v-slot="{ errors }" @submit="changeStep('next')">
            <h3 class="page__title--sub"><span class="title__icon"></span>聯絡人基本資料</h3>
            <p class="mb-4">請填寫企業聯絡人的正確資訊，以便 Fine Jobs 與您聯繫：</p>
            <!-- 表單2-1：聯絡人名稱(必填) -->
            <div class="row">
              <div class="col-6">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoName" class="form__label--custom form-label"
                      >聯絡人姓名</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
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
              </div>
              <div class="col-6">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoContactPosition" class="form__label--custom form-label"
                      >聯絡人職稱</label
                    >
                  </div>
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
              </div>
              <div class="col-6">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoTel" class="form__label--custom form-label"
                      >聯絡人電話</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <Field
                    id="sendFormInfoTel"
                    ref="sendFormInfoTel"
                    name="聯絡人電話"
                    type="tel"
                    class="form-control"
                    :class="{ 'is-invalid': errors['聯絡人電話'] }"
                    placeholder="請輸入電話"
                    rules="required"
                    v-model="form.user.tel"
                  ></Field>
                  <ErrorMessage name="聯絡人電話" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="col-6">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoEmail" class="form__label--custom form-label"
                      >聯絡人Email</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
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
              </div>
              <div class="col-6">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoPassword" class="form__label--custom form-label"
                      >登入密碼</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <Field
                    id="sendFormInfoPassword"
                    ref="sendFormInfoPassword"
                    name="登入密碼"
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors['登入密碼'] }"
                    placeholder="請輸入登入密碼"
                    rules="required"
                    minlength="4"
                    maxlength="8"
                    size="8"
                    v-model="form.user.options.login.password"
                  ></Field>
                  <ErrorMessage name="登入密碼" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="col-12">
                <div class="formStepBtnBox d-flex justify-content-between">
                  <button
                    type="button"
                    class="btn btn-gray-light"
                    @click="changeStep('back')"
                    v-show="formStep > 1"
                  >
                    上一步
                  </button>
                  <button type="submit" class="btn btn-primary">
                    下一步
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div class="newCompanyForm box--shadow" v-if="formStep === 3">
          <Form ref="sendFormInfoForm3" v-slot="{ errors }" @submit="processFormData">
            <h3 class="page__title--sub"><span class="title__icon"></span>職位推廣</h3>
            <p class="mb-4">
              目前Fine Job 試營運中，職位可免費刊登。
              如您欲加速招募流程，建議您可以購買下面職位推廣額度，可以讓您的職位升級，大大增加曝光機會！
            </p>
            <!-- 表單2-1：聯絡人名稱(必填) -->
            <div class="row">
              <div class="col-6">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoAddJobsToken" class="form__label--custom form-label"
                      >預先購買職位刊登額度</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <div class="input-group w-50 mb-4">
                    <button
                      class="btn btn-gray-light border border-gray-line"
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
                      class="form-control border-gray-line text-center"
                      :class="{ 'is-invalid': errors['職位刊登額度'] }"
                      min="1"
                      v-model.number="form.user.options.jobToken"
                      ref="sendFormInfoAddJobsToken"
                      rules="required"
                    >
                    </Field>
                    <button
                      class="btn btn-gray-light border border-gray-line"
                      type="button"
                      id="button-addon2"
                      @click="addNum"
                    >
                      +
                    </button>
                  </div>
                  <ErrorMessage name="職位刊登額度" class="invalid-feedback"></ErrorMessage>
                  <p class="subTxt mb-1">
                    單價：500 NTD
                  </p>
                  <p class="subTxt mb-1">
                    使用時效：7 天
                  </p>
                  <p class="subTxt mb-1">
                    推廣方式：會出現在首頁、優質職位頁面最上方區塊，同時享有職位皇冠標示，
                    讓求職者知道貴司求才若渴。
                  </p>
                </div>
              </div>
              <div class="col-12">
                <div class="formStepBtnBox d-flex justify-content-between">
                  <button
                    type="button"
                    class="btn btn-gray-light"
                    @click="changeStep('back')"
                    v-show="formStep > 1"
                  >
                    上一步
                  </button>
                  <button type="submit" class="btn btn-primary">
                    完成填寫
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div class="newCompanyForm box--shadow" v-if="formStep === 4">
          <Form ref="sendFormInfoForm4" >
            <!-- 表單2-1：聯絡人名稱(必填) -->
            <div class="row justify-content-center">
              <div class="col-8">
                <h3 class="page__title--sub justify-content-center ">申請創建公司帳戶成功</h3>
                <p class="mb-4 text-center">
                  恭喜您已完成填寫創建公司帳戶流程， 本公司會於3個工作天內審核資料，如審核完畢會寄
                  email 給您！ 預祝貴公司招募順利～
                </p>
                <p class="mb-4 text-center">如有任何問題歡迎您寄信聯絡我們，很高興能為您服務～</p>
                <p class="mb-6 text-center text-primary text-decoration-underline">
                  Jordan.ttc.design@gmail.com
                </p>
                <div class="d-flex justify-content-center">
                  <router-link class="btn btn-primary w-50"  to="/"
                  >回首頁</router-link>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
  <ImageCropper @emit-send-img-data="getImg"></ImageCropper>
</template>

<script>
import emitter from '@/components/helpers/emitter';
import webData from '@/components/helpers/webData';
import ImageCropper from '@/components/ImageCropperModal.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  components: { ImageCropper },
  data() {
    return {
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
              companyAddressCity: '',
              companyAddressDetail: '',
              companyInfo: '',
              contactPosition: '',
              companyImagesUrl: [''],
              companyLogoUrl: '',
            },
            jobToken: 1,
            login: {
              password: '',
            },
          },
          message: '',
        },
      },
      formData: {},
      // 圖片使用
      temImages: ['', '', ''],
      temImageInputs: [
        { src: '', isUpDated: false },
        { src: '', isUpDated: false },
        { src: '', isUpDated: false },
      ],
      companyLogo: { src: '', isUpDated: false },
      // 購物車資訊
      cartList: [],
      cartTotal: null,
      // 驗證使用
      uploadImgState: '',
      formState: true,
      formStep: 1,
      // 編輯器套件
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link'],
        language: 'zh',
        placeholder: '請輸入...',
        heading: {
          // 設定 Heading 內的樣式，可新增多個
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h2',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h3',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
          ],
        },
      },
      tempArticle: {
        tag: [''],
      },
      // 套件切圖工具
      cropper: {},
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
    getImg(data, id) {
      console.log(data, id);
      if (this.uploadImgState === 'upLoadMutiImg') {
        console.log(data, id);
        this.temImageInputs[id].src = data;
        this.temImages[id] = data;
        console.log(this.temImageInputs[id]);
      } else if (this.uploadImgState === 'upLoadSingleImg') {
        this.companyLogo.src = data;
      }
    },
    // 判斷是多圖還是單圖
    clickInput(e, index) {
      console.log(e.target.dataset.input);
      if (e.target.dataset.input === 'upLoadMutiImg') {
        this.temImageInputs[index].isUpDated = false;
        const item = `sendFormInfoImgs${index}`;
        this.$refs[item].click();
        this.uploadImgState = 'upLoadMutiImg';
      } else if (e.target.dataset.input === 'upLoadSingleImg') {
        this.companyLogo.src = '';
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

    // 以下是送出表單的動作
    // 上傳表單前處理資料
    processFormData() {
      emitter.emit('delete-imageCropper');
      const city = this.form.user.options.company.companyAddressCity;
      const detail = this.form.user.options.company.companyAddressDetail;
      this.form.user.address = city + detail;
      if (this.companyLogo.isUpDated === false) {
        this.this.formState = false;
      }
      if (this.formState === false) {
        console.log('沒東西');
        this.deleteCart();
      } else {
        this.addCart(this.form.user.options.jobToken);
      }
    },
    // 上傳表單前加入職位額度，附送一個
    addCart(qty = 1) {
      const id = '-MctDx8Qj8Tmw9eJoZqN';
      const product = { data: { product_id: id, qty } };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, product)
        .then((res) => {
          console.log(`${res.data.message}:${id}`);
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
            this.changeStep('next');
          }
        })
        .catch((error) => {
          console.log(error);
          emitter.emit('spinner-close');
        });
    },

    // 以下是基本操做動作
    // 跳轉步驟
    changeStep(way) {
      if (way === 'back' && this.formStep > 0) {
        this.formStep -= 1;
      } else if (way === 'next') {
        this.formStep += 1;
      }
      document.documentElement.scrollTop = 0;
      console.log(this.formStep);
    },
    // 操作額度動作
    deleteNum() {
      if (this.form.user.options.jobToken > 1) {
        this.form.user.options.jobToken -= 1;
      }
    },
    addNum() {
      this.form.user.options.jobToken += 1;
    },
    // 操作圖片數量
    // addImageUrl() {
    //   this.temImages.push('');
    //   this.form.user.options.company.companyImagesUrl.push('');
    //   this.temImageInputs.push({ src: '', isUpDated: false });
    // },
    // deleteImgInput(index) {
    //   this.temImages.splice(index, 1);
    //   this.form.user.options.company.companyImagesUrl.splice(index, 1);
    //   this.temImageInputs.splice(index, 1);
    // },
    deleteImgInput(index) {
      this.temImages[index] = '';
      this.temImageInputs[index].src = '';
      this.temImageInputs[index].isUpDated = false;
      this.form.user.options.company.companyImagesUrl[index] = '';
    },

    // 以下是針對資料api動作
    // 取得購物車資料
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
    // 刪除購物車資料
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
  },
  created() {
    this.deleteCart();
    this.formData = webData;
  },
  mounted() {
    emitter.emit('close-imageCropper');
  },
};
</script>

<style lang="scss">
.testTxt {
  display: block;
  width: 100px;
  height: 24px;
  overflow: hidden;
  word-wrap: break-word;
}
</style>
