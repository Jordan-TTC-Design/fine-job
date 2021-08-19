<template>
  <div class="page--py">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-12">
          <div class="applyContainer">
            <div class="applyContainer__applySideBox">
              <button
                type="button"
                class="applyBackBtn btn btn-light text-dark mb-md-4 mb-0"
                @click="$router.back(-1)"
              >
                <i class="bi bi-chevron-left me-2"></i>返回<span class="applyBackBtn__title ms-4">{{
                  jobItem.title
                }}</span>
              </button>
              <div class="applySideBox">
                <div class="applySideBox__section">
                  <div class="applySideBox__companyBox">
                    <div class="logoImgBox me-2">
                      <img
                        class="logoImg"
                        :src="jobItem.options.company.companyLogoUrl"
                        :alt="`${temCompany.title}企業Logo`"
                        v-if="temCompany.title"
                      />
                    </div>
                    <router-link
                      class="d-block putPointer"
                      :to="`/products-list/company/${temCompany.id}`"
                      >{{ jobItem.options.company.companyName }}</router-link
                    >
                  </div>
                  <router-link
                    class="sideJobBox__title mb-3 d-block putPointer"
                    :to="`/products-list/product/${jobItem.id}`"
                    >{{ jobItem.title }}</router-link
                  >
                  <!-- 薪資 -->
                  <p class="mb-3" v-if="!jobItem.options.job.salaryInterView">
                    <span><i class="jobIcon--sm me-1 bi bi-currency-dollar"></i></span>薪資：{{
                      jobItem.price
                    }}
                    / 月薪
                  </p>
                  <p class="mb-3" v-if="jobItem.options.job.salaryInterView">
                    <span><i class="jobIcon--sm me-1 bi bi-currency-dollar"></i></span
                    >薪資：薪資面議
                  </p>
                  <!-- 需求人數 -->
                  <p class="mb-3">
                    <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                      jobItem.num
                    }}
                    人
                  </p>
                  <!-- 工作地點 -->
                  <p class="mb-3">
                    <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span>工作地點：{{
                      jobItem.options.company.companyAddressCity
                    }}
                  </p>
                  <!-- 更新時間 -->
                  <p class="mb-3">
                    <span><i class="jobIcon--sm me-1 bi bi-calendar4-event"></i></span>更新時間：{{
                      $filters.date(jobItem.options.job.create)
                    }}
                  </p>
                </div>
                <div class="applySideBox__section">
                  <p class="applySideBox__section__open" @click="openApplySideSection('職位內容')">
                    職位內容
                    <i v-if="applyJobContentStage !== '職位內容'" class="bi bi-chevron-down"></i>
                    <i v-if="applyJobContentStage === '職位內容'" class="bi bi-chevron-up"></i>
                  </p>
                  <div
                    v-if="applyJobContentStage === '職位內容'"
                    class="applySideBox__section__content"
                  >
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-journal"></i></span>工作性質：{{
                        jobItem.options.job.workType
                      }}
                    </p>
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-clock"></i></span>工作時間：{{
                        jobItem.options.job.workTime
                      }}
                    </p>
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>產業類別：{{
                        jobItem.options.company.industryCategory
                      }}
                    </p>
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-card-list"></i></span>工作類別：{{
                        jobItem.category
                      }}
                    </p>
                    <p class="mb-3">工作內容：</p>
                    <div class="page__txt" v-html="jobItem.content"></div>
                  </div>
                </div>
                <div class="applySideBox__section" @click="openApplySideSection('應徵條件')">
                  <p class="applySideBox__section__open">
                    應徵條件
                    <i v-if="applyJobContentStage !== '應徵條件'" class="bi bi-chevron-down"></i>
                    <i v-if="applyJobContentStage === '應徵條件'" class="bi bi-chevron-up"></i>
                  </p>
                  <div
                    v-if="applyJobContentStage === '應徵條件'"
                    class="applySideBox__section__content"
                  >
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-book"></i></span>學歷要求：{{
                        jobItem.options.job.education
                      }}
                    </p>
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-briefcase"></i></span>工作經驗：{{
                        jobItem.options.job.workExp
                      }}
                    </p>
                    <p class="mb-3">其他條件：</p>
                    <div class="page__txt" v-html="jobItem.options.job.otherRequirement"></div>
                  </div>
                </div>
                <div class="applySideBox__section" @click="openApplySideSection('申請方法')">
                  <p class="applySideBox__section__open">
                    申請方法
                    <i v-if="applyJobContentStage !== '申請方法'" class="bi bi-chevron-down"></i>
                    <i v-if="applyJobContentStage === '申請方法'" class="bi bi-chevron-up"></i>
                  </p>
                  <div
                    v-if="applyJobContentStage === '申請方法'"
                    class="applySideBox__section__content"
                  >
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-person"></i></span>職位聯絡人：{{
                        jobItem.options.company.companyContact
                      }}
                    </p>
                    <a
                      class="mb-3 d-block"
                      :href="`mailto:${jobItem.options.company.companyEmail}`"
                    >
                      <span><i class="jobIcon--sm me-1 bi bi-envelope"></i></span>聯絡信箱：{{
                        jobItem.options.company.companyEmail
                      }}
                    </a>
                    <a class="mb-3 d-block" :href="`tel:${jobItem.options.company.companyTel}`">
                      <span><i class="jobIcon--sm me-1 bi bi-phone"></i></span>聯絡電話：{{
                        jobItem.options.company.companyTel
                      }}
                    </a>
                    <p class="mb-3">申請備註：</p>
                    <div v-html="jobItem.options.job.otherApplyInfo"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="applyContainer__applyInfoBox">
              <Form ref="sendFormInfoForm1" v-slot="{ errors }" @submit="sendApplyFormProcess">
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
                        data-input="upLoadSingleImg"
                        accept="image/*"
                        @change="loadingImg($event)"
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
                      <Field
                        id="sendFormInfoPersonalImgCheck"
                        ref="sendFormInfoPersonalImgCheck"
                        name="個人照片"
                        type="text"
                        class="form-control d-none"
                        :class="{ 'is-invalid': errors['個人照片'] }"
                        v-model="form.user.options.personalImg"
                        rules="required"
                      ></Field>
                      <ErrorMessage name="個人照片" class="invalid-feedback"></ErrorMessage>
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
                        <p class="subTxt">(可填寫大概區域，只供企業參考用)</p>
                      </div>
                      <div>
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
                          class="form-control"
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
                            :id="`education${index}`"
                            name="學歷"
                            v-model="form.user.options.education"
                          />
                          <label class="form-check-label" :for="`education${index}`">
                            {{ item }}
                          </label>
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
                        <ErrorMessage name="學歷" class="invalid-feedback"></ErrorMessage>
                      </div>
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
                            :id="`workExp${index}`"
                            name="工作經驗"
                            v-model="form.user.options.workExp"
                          />
                          <label class="form-check-label" :for="`workExp${index}`">
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
                          >求職信</label
                        >
                      </div>
                      <ckeditor
                        id="sendFormInfoMessage"
                        ref="sendFormInfoMessage"
                        name="求職信"
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
    </div>
  </div>
  <ImageSquareCropper @emit-send-img-data="getImg" />
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
      cropper: {}, // 圖片套件
      uploadImgState: 'upLoadSingleImg',
      applyJobContentStage: '', // 左側職位資訊欄區塊
    };
  },
  methods: {
    // 用來打開左側職位資訊欄的區塊
    openApplySideSection(sectionName) {
      if (this.applyJobContentStage !== sectionName) {
        this.applyJobContentStage = sectionName;
      } else {
        this.applyJobContentStage = '';
      }
    },
    // 取得圖片傳給modal
    loadingImg(e) {
      const nowId = '';
      emitter.emit('open-imageSquareCropper', [e.target.files[0], nowId]);
    },
    // 從modal抓回圖片
    getImg(data, img, id) {
      if (this.uploadImgState === 'upLoadMutiImg') {
        this.temImageInputs[id].src = data;
        this.temImages[id] = img.src;
      } else if (this.uploadImgState === 'upLoadSingleImg') {
        this.personalImg.src = data;
      }
    },
    // 觸發 圖片input
    clickInput(e) {
      if (e.target.dataset.input === 'upLoadSingleImg') {
        this.$refs.sendFormInfoPersonalImg.click();
        this.uploadImgState = 'upLoadSingleImg';
      }
    },
    // 上傳圖片
    updateImg(e) {
      emitter.emit('spinner-open');
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
          if (this.uploadImgState === 'upLoadSingleImg') {
            this.personalImg.isUpDated = true;
            this.form.user.options.personalImg = res.data.data.link;
            emitter.emit('alertMessage-open', this.form.user.options.personalImg);
          }
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    deleteImgInput() {
      this.personalImg.src = '';
      this.personalImg.isUpDated = false;
      this.form.user.options.personalImg = '';
    },
    // 以下是表單送出的過程
    // 1.由於api限制，先將職位加入購物車
    sendApplyFormProcess() {
      emitter.emit('spinner-open');
      const { id } = this.jobItem;
      const product = { data: { product_id: id, qty: 1 } };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, product)
        .then(() => {
          this.getCart(); // 抓購物車資料
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 重新抓取購物車資料，才會啟動傳送表單
    getCart() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          this.cartList = res.data.data.carts;
          this.sendForm(); // 送出申請表單
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 送出申請表單
    sendForm() {
      emitter.emit('spinner-open');
      // 整理傳送資料
      this.form.user.options.appliedJob = this.jobItem.id;
      this.form.user.address = `${this.form.user.options.addressCity}
      ${this.form.user.options.addressDetail}`;
      // api路徑
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const formData = {
        data: this.form,
      };
      this.$http
        .post(url, formData)
        .then(() => {
          emitter.emit('spinner-close');
          this.$router.push('/'); // 送出成功後回到首頁
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
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
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 取得全部產品，為了要抓到企業資料
    getAllJobs() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.jobsList = res.data.products;
          this.findCompany();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
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
      emitter.emit('spinner-close');
    },
    // 刪除購物車資料
    deleteCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then(() => {})
        .catch((err) => {
          emitter.emit('alertMessage-open', err);
        });
    },
  },
  created() {
    this.formData = webData;
    this.deleteCart(); // 避免有加入過其他資料，先清空購物車
    this.getProductData();
    emitter.emit('spinner-open-bg', 800);
  },
};
</script>

<style lang="scss"></style>
