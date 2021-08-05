<template>
  <ImageSquareCropper @emit-send-img-data="getImg"></ImageSquareCropper>
  <div class="container applyJobPage">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-12 ">
        <div class="applyJobPage__sideBox mb-lg-0 mb-6">
          <button
            type="button"
            class="btn btn-outline-gray-line text-dark mb-4"
            @click="$router.back(-1)"
          >
            <i class="bi bi-chevron-left me-2"></i>返回繼續查看職位
          </button>
          <div ref="jobSelectBox" class="sideJobBox box--shadow">
            <div class="pb-5 border-bottom border-gray-line">
              <div class="d-flex mb-3">
                <div class="jobContent__imgBox">
                  <img class="jobImage" :src="jobItem.imageUrl" alt="職位圖片" />
                  <div class="logoImageBox">
                    <img class="logoImage" :src="jobItem.options.company.companyLogoUrl"
                    alt="公司Logo" />
                  </div>
                </div>
                <div class="JobContent__txtBox">
                  <div>
                    <router-link
                      class="sideJobBox__title mb-3 d-block pe-auto"
                      :to="`/products-list/product/${jobItem.id}`"
                      >{{ jobItem.title }}</router-link
                    >
                    <router-link
                      class=" page__link subTxt  mb-4 d-block pe-auto"
                      :to="`/products-list/company/${temCompany.id}`"
                      >{{ jobItem.options.company.companyName }}</router-link
                    >
                  </div>
                  <div class="d-flex">
                    <p class=" me-5 subTxt">
                      <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                      >{{ jobItem.options.company.companyAddressCity }}
                    </p>
                    <p class=" subTxt">
                      <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                        jobItem.num
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <p class="text-primary fw-bold" v-if="!jobItem.options.job.salaryInterView">
                  {{ jobItem.price }} / 月薪
                </p>
                <p class="text-primary fw-bold" v-if="jobItem.options.job.salaryInterView">
                  薪資面議
                </p>
                <div class="d-flex align-items-center ">
                  <p class="subTxt text-secondary me-2">
                    {{ $filters.date(jobItem.options.job.create) }}
                  </p>
                </div>
              </div>
            </div>
            <div class="py-5 border-bottom border-gray-line">
              <h3 class="section__title--sub"><span class="title__icon"></span>職位內容</h3>
              <p class=" mb-3">工作性質：{{ jobItem.options.job.workType }}</p>
              <p class=" mb-3">
                <span><i class="jobIcon--sm me-1 bi bi-clock"></i></span>工作時間：{{
                  jobItem.options.job.workTime
                }}
              </p>
              <p class=" mb-3">
                <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>產業類別：{{
                  jobItem.options.company.industryCategory
                }}
              </p>
              <p class=" mb-3">
                <span><i class="jobIcon--sm me-1 bi bi-card-list"></i></span>工作類別：{{
                  jobItem.category
                }}
              </p>
              <p class=" mb-3">工作內容：</p>
              <div class="page__txt" v-html="jobItem.content"></div>
            </div>
            <div class="py-5 border-bottom border-gray-line">
              <h3 class="section__title--sub"><span class="title__icon"> </span>應徵條件</h3>
              <p class=" mb-3">
                <span><i class="jobIcon--sm me-1 bi bi-book"></i></span>學歷要求：{{
                  jobItem.options.job.education
                }}
              </p>
              <p class=" mb-3">
                <span><i class="jobIcon--sm me-1 bi bi-briefcase"></i></span>工作經驗：{{
                  jobItem.options.job.workExp
                }}
              </p>
              <p class=" mb-3">其他條件：</p>
              <div class="page__txt" v-html="jobItem.options.job.otherRequirement"></div>
            </div>
            <div class="pt-5">
              <h3 class="section__title--sub"><span class="title__icon"> </span>申請方法</h3>
              <p class=" mb-3">
                <span><i class="jobIcon--sm me-1 bi bi-person"></i></span>職位聯絡人：{{
                  jobItem.options.company.companyContact
                }}
              </p>
              <p class=" mb-3">
                <span><i class="jobIcon--sm me-1 bi bi-envelope"></i></span>聯絡信箱：{{
                  jobItem.options.company.companyEmail
                }}
              </p>
              <p class=" mb-3">
                <span><i class="jobIcon--sm me-1 bi bi-phone"></i></span>聯絡電話：{{
                  jobItem.options.company.companyTel
                }}
              </p>
              <p class=" mb-3">申請備註：</p>
              <div v-html="jobItem.options.job.otherApplyInfo"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-12">
        <div class="box--shadow bg-white rounded p-6">
          <Form ref="sendFormInfoForm1" v-slot="{ errors }" @submit="addCart">
            <h3 class="section__title--sub"><span class="title__icon"></span>求職者申請資訊</h3>
            <p class="mb-4">
              請填寫正確資訊，以便企業與您聯繫：
            </p>
            <div class="row">
              <div class="col-md-5 col-12">
                <!-- 表單2-1：職位圖片(必填) -->
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoPersonalImg" class="form__label--custom form-label"
                      >個人照片</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <input
                    id="sendFormInfoPersonalImg"
                    ref="sendFormInfoPersonalImg"
                    name="個人照片"
                    type="file"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['個人照片'] }"
                    rules="required"
                    data-input="upLoadSingleImg"
                    @change="loadingImg($event)"
                    accept="image/*"
                  />
                  <div class="cropImgBox">
                    <button
                      type="button"
                      class="iconBox btn"
                      @click="deleteImgInput()"
                      v-if="personalImg.src !== ''"
                    >
                      <div class="iconBox__innerBox">
                        <i class="jobIcon bi bi-x-lg"></i>
                      </div>
                    </button>
                    <div class="cropImgBox__cover" v-if="personalImg.src"></div>
                    <p class="subTxt" v-if="personalImg.src == ''">(上限 5 mb )</p>
                    <img
                      v-if="personalImg.src !== ''"
                      class="cropImg h-100"
                      ref="cropImgJob"
                      :src="personalImg.src"
                      alt="個人求職照片"
                    />
                  </div>
                  <div class="d-flex justify-content-between">
                    <button
                      type="button"
                      class="btn"
                      @click="clickInput($event)"
                      data-input="upLoadSingleImg"
                      :class="{
                        'btn-gray-light': personalImg.src !== '',
                        'btn-outline-primary': personalImg.src == '',
                      }"
                    >
                      {{ personalImg.src != '' ? '重選' : '選擇圖片' }}
                    </button>
                    <button
                      type="button"
                      class="btn"
                      @click="updateImg($event)"
                      data-input="upLoadSingleImg"
                      :class="{
                        'btn-gray-light': !!personalImg.isUpDated || personalImg.src == '',
                        'btn-outline-primary': personalImg.src !== '',
                      }"
                      :disabled="!!personalImg.isUpDated || personalImg.src == ''"
                    >
                      {{ personalImg.isUpDated ? '已上傳' : '上傳' }}
                    </button>
                  </div>
                  <!-- <Field
                    id="sendFormInfoPersonalImgCheck"
                    ref="sendFormInfoPersonalImgCheck"
                    name="個人照片"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['個人照片'] }"
                    v-model="form.user.options.personalImg"
                    rules="required"
                  ></Field>
                  <ErrorMessage name="個人照片" class="invalid-feedback"></ErrorMessage> -->
                </div>
              </div>
              <div class="col-md-7 col-12">
                <!-- 表單2-2：職位名稱(必填) -->
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoName" class="form__label--custom form-label"
                      >姓名</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <Field
                    id="sendFormInfoName"
                    name="姓名"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名"
                    rules="required"
                    v-model="form.user.name"
                    ref="sendFormInfoName"
                  ></Field>
                  <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoNowJobName" class="form__label--custom form-label"
                      >目前職稱</label
                    >
                    <p class="formTag--must me-2">必填</p>
                    <p class="subTxt">(可填寫待業中)</p>
                  </div>
                  <Field
                    id="sendFormInfoNowJobName"
                    ref="sendFormInfoNowJobName"
                    name="目前職稱"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['目前職稱'] }"
                    placeholder="請輸入目前職稱"
                    rules="required"
                    v-model="form.user.options.nowJobName"
                  ></Field>
                  <ErrorMessage name="目前職稱" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoTel" class="form__label--custom form-label"
                      >聯絡電話</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <Field
                    id="sendFormInfoTel"
                    ref="sendFormInfoTel"
                    name="聯絡電話"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['聯絡電話'] }"
                    placeholder="請輸入聯絡電話"
                    rules="required"
                    v-model="form.user.tel"
                  ></Field>
                  <ErrorMessage name="聯絡電話" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="col-12">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoEmail" class="form__label--custom form-label"
                      >Email</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <Field
                    id="sendFormInfoEmail"
                    ref="sendFormInfoEmail"
                    name="Email"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['Email'] }"
                    placeholder="請輸入Email"
                    rules="email|required"
                    v-model="form.user.email"
                  ></Field>
                  <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoAddressCity" class="form__label--custom form-label"
                      >聯絡地址</label
                    >
                    <p class="formTag--must me-2">必填</p>
                    <p class="subTxt">(可填寫大概區域，只用於企業參考用)</p>
                  </div>
                  <div class="">
                    <Field
                      id="sendFormInfoAddressCity"
                      ref="sendFormInfoAddressCity"
                      name="縣市"
                      as="select"
                      class="form-control form-select w-auto mb-2"
                      :class="{ 'is-invalid': errors['縣市'] }"
                      rules="required"
                      v-model="form.user.options.addressCity"
                    >
                      <option value="" disabled selected>請選擇縣市</option>
                      <option v-for="item in formData.city" :value="item" :key="item">{{
                        item
                      }}</option>
                    </Field>
                    <ErrorMessage name="縣市" class="invalid-feedback"></ErrorMessage>
                    <Field
                      id="sendFormInfoAddressDetail"
                      ref="sendFormInfoAddressDetail"
                      name="詳細地址"
                      type="text"
                      class="form-control "
                      :class="{ 'is-invalid': errors['詳細地址'] }"
                      placeholder="請輸入詳細地址"
                      rules="required"
                      v-model="form.user.options.addressDetail"
                    ></Field>
                    <ErrorMessage name="詳細地址" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoEducation" class="form__label--custom form-label"
                      >學歷</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <div class="d-flex flex-wrap">
                    <div
                      class="form-check me-2"
                      v-for="(item, index) in formData.candidateEducation"
                      :key="index"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        :value="item"
                        :id="'education' + index"
                        name="學歷"
                        v-model="form.user.options.education"
                      />
                      <label class="form-check-label" :for="'education' + index">
                        {{ item }}
                      </label>
                    </div>
                  </div>
                  <Field
                    id="sendFormInfoEducationCheck"
                    ref="sendFormInfoEducationCheck"
                    name="學歷"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['學歷'] }"
                    v-model="form.user.options.education"
                    rules="required"
                  ></Field>
                  <ErrorMessage name="學歷要求" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoWorkExp" class="form__label--custom form-label"
                      >工作經驗</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <div class="d-flex flex-wrap">
                    <div
                      class="form-check me-2"
                      v-for="(item, index) in formData.candidateWorkExp"
                      :key="index"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        :value="item"
                        :id="'workExp' + index"
                        name="工作經驗"
                        v-model="form.user.options.workExp"
                      />
                      <label class="form-check-label" :for="'workExp' + index">
                        {{ item }}
                      </label>
                    </div>
                  </div>
                  <Field
                    id="sendFormInfoWorkExpCheck"
                    ref="sendFormInfoWorkExpCheck"
                    name="工作經驗"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['工作經驗'] }"
                    v-model="form.user.options.workExp"
                    rules="required"
                  ></Field>
                  <ErrorMessage name="工作經驗" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoCvLink" class="form__label--custom form-label"
                      >履歷連結</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <Field
                    id="sendFormInfoCvLink"
                    ref="sendFormInfoCvLink"
                    name="履歷連結"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['履歷連結'] }"
                    placeholder="請輸入履歷連結"
                    rules="required"
                    v-model="form.user.options.cvLink"
                  ></Field>
                  <ErrorMessage name="履歷連結" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoOtherLink" class="form__label--custom form-label"
                      >其他連結</label
                    >
                  </div>
                  <Field
                    id="sendFormInfoOtherLink"
                    ref="sendFormInfoOtherLink"
                    name="其他連結"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['其他連結'] }"
                    placeholder="請輸入其他連結"
                    v-model="form.user.options.otherLink"
                  ></Field>
                  <ErrorMessage name="其他連結" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__inputBox form__infoEditBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoMessage" class="form__label--custom form-label"
                      >留言</label
                    >
                  </div>
                  <ckeditor
                    id="sendFormInfoMessage"
                    ref="sendFormInfoMessage"
                    name="留言"
                    :editor="editor"
                    tag-name="textarea"
                    v-model="form.message"
                    :config="editorConfig"
                  ></ckeditor>
                </div>
              </div>
            </div>
            <!-- 表單操作按鈕 -->
            <div class="col-12">
              <div class="formStepBtnBox d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">
                  申請職位
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import ImageSquareCropper from '@/components/helpers/ImageSquareCropperModal.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  components: { ImageSquareCropper },
  data() {
    return {
      // 申請的職位
      jobItem: {
        options: {
          company: { companyLogoUrl: '' },
          job: { create: '' },
        },
      },
      // 全部產品
      jobsList: [],
      // 放企業連結用
      temCompany: {},
      // 表單
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          options: {
            pageAction: 'apply-job',
            nowJobName: '',
            personalImg: '',
            appliedJob: '',
            cvLink: '',
            otherLink: '',
            permission: false,
            workExp: '',
            education: '',
            addressCity: '',
            addressDetail: '',
          },
        },
        message: '',
      },
      // 圖片用
      personalImg: { src: '', isUpDated: false },
      // 表單資料
      formData: {},
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
      // 圖片套件
      cropper: {},
      uploadImgState: 'upLoadSingleImg',
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
        this.personalImg.src = data;
      }
    },
    // 觸發 圖片input
    clickInput(e) {
      console.log(e.target.dataset.input);
      if (e.target.dataset.input === 'upLoadSingleImg') {
        this.$refs.sendFormInfoPersonalImg.click();
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
        item = this.personalImg.src;
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
            this.personalImg.isUpDated = true;
            this.form.user.options.personalImg = res.data.data.link;
            console.log(this.form.user.options.personalImg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      emitter.emit('spinner-close');
    },
    deleteImgInput() {
      this.personalImg.src = '';
      this.personalImg.isUpDated = false;
      this.form.user.options.personalImg = '';
    },
    // 以下是表單操作
    // 送出表單前檢查
    // 加入購物車後，才會傳送表單
    addCart() {
      const { id } = this.jobItem;
      const product = { data: { product_id: id, qty: 1 } };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, product)
        .then((res) => {
          console.log(`${res.data.message}:${id}`);
          this.getCart();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 送出表單
    sendForm() {
      this.form.user.options.appliedJob = this.jobItem.id;
      this.form.user.address = `${this.form.user.options.addressCity}
      ${this.form.user.options.addressDetail}`;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const formData = {
        data: this.form,
      };
      this.$http
        .post(url, formData)
        .then((res) => {
          console.log(`${res.data.message}`);
          console.log(res);
          // this.getCart();
          // this.$router.push('/');
          // 不知道怎清空
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 以下是api資料動作
    // 取得產品資料
    getProductData() {
      emitter.emit('spinner-open');
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.isExist = true;
            this.jobItem = res.data.product;
            this.getAllJobs();
          } else {
            this.isExist = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      emitter.emit('spinner-close');
    },
    // 取得全部產品
    getAllJobs() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.jobsList = res.data.products;
          this.findCompany();
        })
        .catch((error) => {
          console.log(error);
        });
      emitter.emit('spinner-close');
    },
    // 篩選企業
    findCompany() {
      emitter.emit('spinner-open');
      this.jobsList.forEach((item) => {
        if (item.description === '企業') {
          if (item.title === this.jobItem.options.company.companyName) {
            this.temCompany = item;
          }
        }
      });
      console.log(this.temCompany);
      emitter.emit('spinner-close');
    },
    // 取得購物車資料
    getCart() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          this.cartList = res.data.data.carts;
          emitter.emit('spinner-close');
          this.sendForm();
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.formData = webData;
    console.log(this.$route.params);
    this.deleteCart();
    this.getProductData();
  },
  mounted() {
    emitter.emit('close-cart');
  },
};
</script>

<style lang="scss"></style>
