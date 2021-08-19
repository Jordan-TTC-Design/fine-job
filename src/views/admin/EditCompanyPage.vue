<template>
  <div class="pb-6">
    <div class="container-fuild">
      <Form v-slot="{ errors }" @submit="updateCompanyData">
        <div class="admin__subHeader mb-6 box--shadow">
          <div class="container">
            <div class="admin__subNav w-100 justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <h2 class="admin__subNav__title me-0">
                  編輯企業資料
                </h2>
                <p class="ms-2">- {{ pagePreview ? '預覽狀態' : '編輯狀態' }}</p>
              </div>
              <div>
                <button
                  type="button"
                  class="btn--preview btn btn-outline-gray-line me-2"
                  @click="lookPagePreview"
                  :class="{ active: pagePreview }"
                >
                  <i class="jobIcon--sm bi bi-eye me-1"></i
                  >{{ pagePreview ? '編輯企業' : '預覽企業' }}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-gray-line text-dark me-2"
                  @click="$router.back(-1)"
                >
                  返回
                </button>
                <button type="submit" class="btn btn-primary">
                  保存資料
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="container companyPage" v-if="companyItem.id && !pagePreview">
          <div class="row">
            <div class="col-lg-9 col-12">
              <div class="companyInfoBox box--shadow mb-3 position-relative">
                <div class="editCompanyInfoBox align-items-md-stretch align-items-center">
                  <div class="inputBox--logo">
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
                        <button
                          type="button"
                          class="iconBox btn"
                          @click="deleteImgInput(index)"
                          v-if="companyLogo.src !== ''"
                        >
                          <div class="iconBox__innerBox">
                            <i class="jobIcon bi bi-x-lg"></i>
                          </div>
                        </button>
                        <div class="cropImgBox__cover" v-if="companyLogo.src"></div>
                        <p class="subTxt" v-if="companyLogo.src == ''">(上限 5 mb)</p>
                        <img
                          v-if="companyLogo.src !== ''"
                          class="cropImg h-100"
                          ref="cropImgCompanyLogo"
                          :src="companyLogo.src"
                          alt="公司Logo"
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
                        v-model="companyLogo.src"
                        rules="required"
                      ></Field>
                      <ErrorMessage name="公司Logo" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="companyInfoBox__txtBox pt-md-0 pt-3">
                    <div class="form__inputBox mb-4">
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
                        v-model="companyItem.title"
                        ref="sendFormInfoCompanyName"
                      ></Field>
                      <ErrorMessage name="公司名稱" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div
                      class="d-flex flex-md-row flex-column justify-content-between
                align-items-end w-100"
                    >
                      <div class="align-self-md-stretch align-self-center w-100">
                        <div class="form__inputBox mb-4">
                          <div class="form__labelBox">
                            <label
                              for="sendFormInfoCompanyAddressCity"
                              class="form__label--custom form-label"
                              >公司地址</label
                            >
                            <p class="formTag--must">必填</p>
                          </div>
                          <div class="d-flex">
                            <Field
                              id="sendFormInfoCompanyAddressCity"
                              ref="sendFormInfoCompanyAddressCity"
                              name="公司地址縣市"
                              as="select"
                              class="form-control form-select w-auto me-3"
                              :class="{ 'is-invalid': errors['公司地址縣市'] }"
                              rules="required"
                              v-model="companyItem.options.companyAddressCity"
                            >
                              <option value="" disabled selected>請選擇縣市</option>
                              <option v-for="item in formData.city" :value="item" :key="item">{{
                                item
                              }}</option>
                            </Field>
                            <ErrorMessage
                              name="公司地址縣市"
                              class="invalid-feedback"
                            ></ErrorMessage>
                            <Field
                              id="sendFormInfoCompanyAddressDetail"
                              ref="sendFormInfoCompanyAddressDetail"
                              name="公司詳細地址"
                              type="text"
                              class="form-control flex-grow"
                              :class="{ 'is-invalid': errors['公司詳細地址'] }"
                              placeholder="請輸入公司詳細地址"
                              rules="required"
                              v-model="companyItem.options.companyAddressDetail"
                            ></Field>
                            <ErrorMessage
                              name="公司詳細地址"
                              class="invalid-feedback"
                            ></ErrorMessage>
                          </div>
                        </div>
                        <div class="form__inputBox">
                          <div class="form__labelBox">
                            <label
                              for="sendFormInfoIndustryCategory"
                              class="form__label--custom form-label"
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
                            v-model="companyItem.category"
                            ref="sendFormInfoIndustryCategory"
                          >
                            <option
                              v-for="item in formData.industryCategory"
                              :value="item"
                              :key="item"
                              :selected="item === companyItem.category"
                              >{{ item }}</option
                            >
                          </Field>
                          <ErrorMessage name="公司行業類別" class="invalid-feedback"></ErrorMessage>
                        </div>
                      </div>
                      <p class="editCompanyData subTxt text-secondary">
                        {{ $filters.date(companyItem.options.create) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="companyInfoBox box--shadow mb-3">
                <h3 class="section__title--sub"><span class="title__icon"></span>公司照片</h3>
                <div class="row">
                  <div
                    class="col-lg-4 col-12"
                    v-for="(item, index) in temImageInputs"
                    :key="`sendFormInfoImgs${index}`"
                  >
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="imageUrl" class="form__label--custom form-label"
                          >第 {{ index + 1 }} 張企業圖片</label
                        >
                        <p class="formTag--must" v-if="index === 0">必填</p>
                      </div>
                      <input
                        :id="`sendFormInfoImgs${index}`"
                        name="企業圖片"
                        type="file"
                        class="form-control d-none"
                        :class="{ 'is-invalid': errors[`企業圖片${index}`] }"
                        placeholder="請選擇照片上傳"
                        :ref="`sendFormInfoImgs${index}`"
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
                          v-if="temImageInputs[index]"
                        >
                          <div class="iconBox__innerBox">
                            <i class="jobIcon bi bi-x-lg"></i>
                          </div>
                        </button>
                        <div class="cropImgBox__cover" v-if="temImageInputs[index].src"></div>
                        <p class="subTxt" v-if="temImageInputs[index].src == false">(上限 5 mb )</p>
                        <img
                          v-if="temImageInputs[index].src"
                          class="cropImg"
                          :ref="`cropImg${index}`"
                          :src="temImageInputs[index].src"
                          :alt="`公司圖片${index}`"
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
                            'btn-gray-light': temImageInputs[index].src,
                            'btn-outline-primary': !temImageInputs[index].src,
                          }"
                        >
                          {{ temImageInputs[index].src ? '重選' : '選擇圖片' }}
                        </button>
                        <button
                          type="button"
                          class="btn"
                          @click="updateImg($event)"
                          data-input="upLoadMutiImg"
                          :data-id="index"
                          :class="{
                            'btn-gray-light':
                              !!temImageInputs[index].isUpDated ||
                              temImageInputs[index].src == false,
                            'btn-outline-primary': temImageInputs[index].src,
                          }"
                          :disabled="
                            !!temImageInputs[index].isUpDated || temImageInputs[index].src == false
                          "
                        >
                          {{ temImageInputs[index].isUpDated ? '已上傳' : '上傳' }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <Field
                      id="sendFormInfoCompanyImageCheck"
                      ref="sendFormInfoCompanyImageCheck"
                      name="公司環境照片第一張"
                      type="text"
                      class="form-control d-none"
                      :class="{ 'is-invalid': errors['公司環境照片第一張'] }"
                      v-model="temImageInputs[0].src"
                      rules="required"
                    ></Field>
                    <ErrorMessage name="公司環境照片第一張" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="companyInfoBox box--shadow mb-3">
                <h3 class="section__title--sub"><span class="title__icon"></span>公司簡介</h3>
                <div class="form__inputBox form__infoEditBox">
                  <ckeditor
                    id="sendFormInfoCompanyInfo"
                    ref="sendFormInfoCompanyInfo"
                    name="公司簡介"
                    :editor="editor"
                    tag-name="textarea"
                    v-model="companyItem.content"
                    :config="editorConfig"
                  ></ckeditor>
                  <Field
                    name="公司簡介"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['公司簡介'] }"
                    placeholder="請輸入"
                    v-model="companyItem.content"
                    as="textarea"
                    rules="required"
                  >
                  </Field>
                  <ErrorMessage name="公司簡介" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-12">
              <div class="companyInfoBox box--shadow mb-3">
                <h3 class="section__title--sub"><span class="title__icon"></span>公司聯絡人資訊</h3>
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
                    v-model="companyItem.options.companyContact"
                  ></Field>
                  <ErrorMessage name="聯絡人姓名" class="invalid-feedback"></ErrorMessage>
                </div>
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
                    v-model="companyItem.options.companyContactPosition"
                  />
                </div>
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
                    v-model="companyItem.options.companyTel"
                  ></Field>
                  <ErrorMessage name="聯絡人電話" class="invalid-feedback"></ErrorMessage>
                </div>
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
                    v-model="companyItem.options.companyEmail"
                  ></Field>
                  <ErrorMessage name="聯絡人Email" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="companyInfoBox box--shadow">
                <h3 class="section__title--sub"><span class="title__icon"></span>系統資訊</h3>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoAddJobsToken" class="form__label--custom form-label"
                      >企業剩餘額度</label
                    >
                  </div>
                  <div class="input-group mb-4">
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
                      min="0"
                      v-model.number="companyItem.options.companyJobToken"
                      ref="sendFormInfoAddJobsToken"
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
                </div>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoCostToken" class="form__label--custom form-label"
                      >企業招募狀態</label
                    >
                  </div>
                  <div class="form-check form-switch p-2 border border-gray-line rounded">
                    <input
                      id="sendFormInfoCostToken"
                      type="checkbox"
                      class="form-check-input ms-0 me-3"
                      data-action="changeProductState"
                      data-id="${item.id}"
                      :checked="companyItem.is_enabled > 0 ? true : false"
                      @change="changeProductState"
                    />
                    <label
                      class="form-check-label"
                      for="sendFormInfoCostToken"
                      :class="{ 'text-primary': companyItem.is_enabled > 0 }"
                    >
                      {{ companyItem.is_enabled > 0 ? `招募中` : `停止招募` }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container companyPage" v-if="pagePreview">
        <div class="row">
          <div class="col-lg-9 col-12">
            <div class="companyInfoBox box--shadow mb-3 position-relative">
              <div class="d-flex flex-md-row flex-column align-items-md-stretch align-items-center">
                <div class="companyInfoBox__logoImgBox mb-md-0 mb-4 me-md-4">
                  <img
                    class="logoImg"
                    :src="companyItem.imageUrl"
                    :alt="`${companyItem.title}logo`"
                  />
                </div>
                <div
                  class="companyInfoBox__txtBox d-flex flex-column justify-content-between
              align-items-md-start align-items-center pt-3"
                >
                  <h2 class="page__title mb-3">{{ companyItem.title }}</h2>
                  <div
                    class="d-flex flex-md-row flex-column justify-content-between
                align-items-end w-100"
                  >
                    <div class="align-self-md-stretch align-self-center">
                      <p class="page__txt mb-3">
                        <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                        >{{ companyItem.options.companyAddressCity }}，{{
                          companyItem.options.companyAddressDetail
                        }}
                      </p>
                      <p class="page__txt">
                        <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                        {{ companyItem.category }}
                      </p>
                    </div>
                    <div>
                      <p class="subTxt text-secondary">
                        {{ $filters.date(companyItem.options.create) }}
                      </p>
                    </div>
                    <button
                      class="collectBtn--company--phone btn btn-outline-gray-line
                      w-100 mt-4 d-md-0 d-md-none"
                      type="button"
                      :class="{ active: companyIsCollect }"
                      @click="collectCompany(companyItem)"
                    >
                      <i class="jobIcon bi bi-bookmark-fill me-1"></i
                      >{{ this.companyIsCollect ? '已關注' : '關注公司' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="companyInfoBox box--shadow mb-3">
              <h3 class="section__title--sub"><span class="title__icon"></span>公司照片</h3>
              <div class="d-flex justify-content-between flex-md-row flex-column">
                <img
                  v-for="(item, index) in companyItem.imagesUrl"
                  class="companyPage__companyImage mb-md-0 mb-2 putPointer"
                  :src="item"
                  :alt="`${companyItem.title}公司圖片${index}`"
                  :key="index"
                  @click="openImgModal(companyItem.imagesUrl)"
                />
              </div>
            </div>
            <div class="companyInfoBox  box--shadow mb-3">
              <h3 class="section__title--sub"><span class="title__icon"></span>公司簡介</h3>
              <div class="page__txt" v-html="companyItem.content"></div>
            </div>
          </div>
        </div>
      </div>
      </Form>
      <div v-if="isExist == false" class="cantFoundProduct">
        <h5>找不到產品</h5>
      </div>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <ImageCropper @emit-send-img-data="getImg" />
  <ImgPopModal />
</template>

<script>
import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import webData from '@/methods/webData';
import ImageCropper from '@/components/helpers/ImageCropperModal.vue';
import ImgPopModal from '@/components/helpers/ImgPopModal.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  components: {
    UpTopBtn,
    ImageCropper,
    ImgPopModal,
  },
  data() {
    return {
      companyItem: {
        imagesUrl: [],
        imageUrl: '',
        options: {
          company: {},
          job: {},
        },
      },
      formData: {},
      companyJobs: [],
      jobsList: [],
      isExist: null,
      companyIsCollect: false,
      companyCollectionList: {},
      // 圖片使用
      temImageInputs: [
        { src: '', isUpDated: false },
        { src: '', isUpDated: false },
        { src: '', isUpDated: false },
      ],
      companyLogo: { src: '', isUpDated: false },
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
      // 套件切圖工具
      cropper: {},
      pagePreview: false, // 模式判斷
    };
  },
  methods: {
    // 切換預覽模式還是編輯模式
    lookPagePreview() {
      if (this.pagePreview) {
        this.pagePreview = false;
      } else {
        this.pagePreview = true;
      }
    },
    // 操作額度動作
    deleteNum() {
      if (this.companyItem.options.companyJobToken > 1) {
        this.companyItem.options.companyJobToken -= 1;
      }
    },
    addNum() {
      this.companyItem.options.companyJobToken += 1;
    },
    // 改變企業狀態
    changeProductState() {
      if (this.companyItem.is_enabled > 0) {
        this.companyItem.is_enabled = 0;
      } else {
        this.companyItem.is_enabled = 1;
      }
    },
    // 刪除圖片
    deleteImgInput(index) {
      if (index || index === 0) {
        this.temImageInputs[index].src = '';
        this.temImageInputs[index].isUpDated = false;
        this.companyItem.imagesUrl[index] = '';
      } else {
        this.companyItem.imagesUrl = '';
        this.companyLogo.src = '';
        this.companyLogo.isUpDated = false;
      }
    },
    // 取得圖片傳給modal
    loadingImg(e) {
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
      if (this.uploadImgState === 'upLoadMutiImg') {
        this.temImageInputs[id].src = data;
      } else if (this.uploadImgState === 'upLoadSingleImg') {
        this.companyLogo.src = data;
      }
    },
    // 判斷是多圖還是單圖
    clickInput(e, index) {
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
          if (this.uploadImgState === 'upLoadMutiImg') {
            this.temImageInputs[nowId].isUpDated = true;
            this.temImageInputs[nowId].src = res.data.data.link;
            this.companyItem.imagesUrl[nowId] = res.data.data.link;
          } else if (this.uploadImgState === 'upLoadSingleImg') {
            this.companyLogo.isUpDated = true;
            this.companyLogo.src = res.data.data.link;
            this.companyItem.imagesUrl = res.data.data.link;
          }
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    updateCompanyData() {
      emitter.emit('spinner-open');
      this.companyItem.options.create = `${Math.floor(Date.now() / 1000)}`;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      const companyData = {
        data: this.companyItem,
      };
      this.$http
        .put(url, companyData)
        .then((res) => {
          emitter.emit('spinner-close');
          if (res.data.success) {
            emitter.emit('alertMessage-open', res.data.message);
            this.$router.push('/admin/dashboard/products-list');
          }
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    getCompanyData() {
      emitter.emit('spinner-open');
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.isExist = true;
            this.companyItem = res.data.product;
            this.companyLogo.src = this.companyItem.imageUrl;
            this.companyLogo.isUpDated = true;
            this.companyItem.imagesUrl.forEach((item, index) => {
              this.temImageInputs[index].src = item;
              this.temImageInputs[index].isUpDated = true;
            });
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
    openImgModal(imgUrl) {
      emitter.emit('imgPopModal-open', imgUrl);
    },
  },
  created() {
    this.getCompanyData();
    this.formData = webData;
    emitter.emit('spinner-open-bg', 500);
  },
};
</script>

<style lang="scss"></style>
