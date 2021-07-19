<template>
  <ImageCropper @emit-send-img-data="getImg"></ImageCropper>
  <div class="container">
    <div class="addProcess mb-6 " v-if="formStep >= 1">
      <h2 class="pageTitle text-primary text-center mb-4">新建職位</h2>
      <div class="row  justify-content-center">
        <div class="col-2">
          <div
            class="addProcessBox py-2"
            ref="addProcessBox--1"
            :class="{ completed: formStep > 1 }"
          >
            <h5 class="addProcessBox__title">1</h5>
            <p class="addProcessBox__txt">填寫職位內容</p>
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
            <p class="addProcessBox__txt">填寫應徵條件</p>
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
            <p class="addProcessBox__txt">填寫申請方法</p>
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
      <div class="col-4" v-if="formStep === 0">
        <!-- 表單第一步：選擇公司 -->
        <div class="box--shadow bg-white rounded p-6" v-if="formStep === 0">
          <Form ref="sendFormInfoForm0" v-slot="{ errors }" @submit="changeStep('next')">
            <h3 class="page__title--sub mb-3"><span class="title__icon"></span>登入企業帳戶</h3>
            <p class="mb-4">請選擇您的企業帳戶</p>
            <!-- 表單1-1：公司名稱(必填) -->
            <div class="form__inputBox">
              <div class="form__labelBox">
                <label for="sendFormInfoCompanyName" class="form__label--custom form-label"
                  >公司名稱</label
                >
                <p class="formTag--must">必填</p>
              </div>
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
                <option value="" disabled selected>選擇您的企業</option>
                <option v-for="(item, index) in companyList" :value="item.title" :key="index">{{
                  item.title
                }}</option>
              </Field>
              <ErrorMessage name="公司名稱" class="invalid-feedback"></ErrorMessage>
            </div>
            <!-- 表單1-2：密碼(必填) -->
            <div class="form__inputBox d-flex flex-column ">
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
                class="form-control mb-2"
                :class="{ 'is-invalid': errors['登入密碼'] }"
                placeholder="登入密碼"
                rules="required"
                minlength="4"
                maxlength="8"
                size="8"
                v-model="form.user.options.login.password"
              ></Field>
              <ErrorMessage name="登入密碼" class="invalid-feedback"></ErrorMessage>
              <button
                type="button"
                class="btn btn-gray-light text-primary mb-3 align-self-end"
                @click="form.user.options.login.password = '00000000'"
              >
                忘記密碼
              </button>
            </div>
            <button type="submit" class="btn btn-primary w-100 mb-3">
              登入
            </button>
            <router-link class="btn btn-gray-light w-100" to="/add-company"
              >立即註冊企業帳戶！</router-link
            >
          </Form>
        </div>
      </div>
      <div class="col-8" v-if="formStep > 0">
        <!-- 表單第二步：填寫職位資料 -->
        <div class="box--shadow bg-white rounded p-6" v-if="formStep === 1">
          <Form ref="sendFormInfoForm1" v-slot="{ errors }" @submit="changeStep('next')">
            <h3 class="page__title--sub"><span class="title__icon"></span>職位內容</h3>
            <p class="mb-4">
              於 Fine Job
              創建職位需嚴格審核職位內容，請填寫正確合適職位資訊，也幫助求職者能快速了解：
            </p>
            <div class="row">
              <div class="col-4">
                <!-- 表單2-1：職位圖片(必填) -->
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoJobImage" class="form__label--custom form-label"
                      >職位圖片</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <input
                    id="sendFormInfoJobImage"
                    ref="sendFormInfoJobImage"
                    name="職位圖片"
                    type="file"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['職位圖片'] }"
                    rules="required"
                    data-input="upLoadSingleImg"
                    @change="loadingImg($event)"
                    accept="image/*"
                  />
                  <div class="cropImgBox">
                    <div class="cropImgBox__cover" v-if="jobImage.src"></div>
                    <p class="subTxt" v-if="jobImage.src == ''">(上限 5 mb )</p>
                    <img
                      v-if="jobImage.src !== ''"
                      class="cropImg h-100"
                      ref="cropImgJob"
                      :src="jobImage.src"
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
                        'btn-gray-light': jobImage.src !== '',
                        'btn-outline-primary': jobImage.src == '',
                      }"
                    >
                      {{ jobImage.src != '' ? '重選' : '選擇圖片' }}
                    </button>
                    <button
                      type="button"
                      class="btn"
                      @click="updateImg($event)"
                      data-input="upLoadSingleImg"
                      :class="{
                        'btn-gray-light': !!jobImage.isUpDated || jobImage.src == '',
                        'btn-outline-primary': jobImage.src !== '',
                      }"
                      :disabled="!!jobImage.isUpDated || jobImage.src == ''"
                    >
                      {{ jobImage.isUpDated ? '已上傳' : '上傳' }}
                    </button>
                  </div>
                  <Field
                    id="sendFormInfoJobImageCheck"
                    ref="sendFormInfoJobImageCheck"
                    name="職位圖片"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['職位圖片'] }"
                    v-model="form.user.options.job.jobImageUrl"
                    rules="required"
                  ></Field>
                  <ErrorMessage name="職位圖片" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="col-8">
                <!-- 表單2-2：職位名稱(必填) -->
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoJobName" class="form__label--custom form-label"
                      >職位名稱</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <Field
                    id="sendFormInfoJobName"
                    name="職位名稱"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['職位名稱'] }"
                    placeholder="請輸入職位名稱"
                    rules="required"
                    v-model="form.user.options.job.jobName"
                    ref="sendFormInfoJobName"
                  ></Field>
                  <ErrorMessage name="職位名稱" class="invalid-feedback"></ErrorMessage>
                </div>
                <!-- 表單2-3：職位類別(必填) -->
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoJobCategory" class="form__label--custom form-label"
                      >職位類別</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <Field
                    name="職位類別"
                    as="select"
                    id="sendFormInfoJobCategory"
                    class="form-control form-select"
                    :class="{ 'is-invalid': errors['職位類別'] }"
                    rules="required"
                    v-model="form.user.options.job.jobCategory"
                    ref="sendFormInfoJobCategory"
                  >
                    <option value="" disabled selected>選擇職位類別</option>
                    <option v-for="item in formData.jobCategory" :value="item" :key="item">{{
                      item
                    }}</option>
                  </Field>
                  <ErrorMessage name="職位類別" class="invalid-feedback"></ErrorMessage>
                </div>
                <!-- 表單2-1：需求人數(必填) -->
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoNeedPerson" class="form__label--custom form-label"
                      >需求人數</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
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
              </div>
              <div class="col-6">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoSalary" class="form__label--custom form-label"
                      >薪資</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <div class="d-flex align-items-center mb-2">
                    <div class="flex-grow-1 me-2">
                      <Field
                        id="sendFormInfoSalary"
                        ref="sendFormInfoSalary"
                        name="薪資"
                        type="number"
                        :placeholder="
                          form.user.options.job.salaryInterView
                            ? '面議薪資勿低於 40,000 '
                            : '請輸入'
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
                        name="薪資面議"
                        class="form-check-input"
                        type="checkbox"
                        v-model="form.user.options.job.salaryInterView"
                      />
                      <label class="form-check-label" for="sendFormInfoSalaryInterView">
                        面議
                      </label>
                    </div>
                  </div>
                  <p class="subTxt text-secondary">
                    依據台灣勞工法令，面議非公開薪資需超過台幣 4萬元。
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoWorkType" class="form__label--custom form-label"
                      >工作性質</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="form-check me-2"
                      v-for="(item, index) in formData.workType"
                      :key="index"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        :value="item"
                        :id="'workType' + index"
                        name="工作性質"
                        v-model="form.user.options.job.workType"
                      />
                      <label class="form-check-label" :for="'workType' + index">
                        {{ item }}
                      </label>
                    </div>
                  </div>
                  <Field
                    id="sendFormInfoWorkTypeCheck"
                    ref="sendFormInfoWorkTypeCheck"
                    name="工作性質"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['工作性質'] }"
                    v-model="form.user.options.job.workType"
                    rules="required"
                  ></Field>
                  <ErrorMessage name="工作性質" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="col-6">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoworkTime" class="form__label--custom form-label"
                      >上班時段</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="form-check me-2"
                      v-for="(item, index) in formData.workTime"
                      :key="index"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        :value="item"
                        :id="'workTime' + index"
                        name="上班時段"
                        v-model="form.user.options.job.workTime"
                      />
                      <label class="form-check-label" :for="'workTime' + index">
                        {{ item }}
                      </label>
                    </div>
                  </div>
                  <Field
                    id="sendFormInfoworkTimeCheck"
                    ref="sendFormInfoworkTimeCheck"
                    name="上班時段"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['上班時段'] }"
                    v-model="form.user.options.job.workTime"
                    rules="required"
                  ></Field>
                  <ErrorMessage name="上班時段" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="col-12">
                <div class="form__inputBox form__infoEditBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoJobContent" class="form__label--custom form-label"
                      >職位內容</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <ckeditor
                    id="sendFormInfoJobContent"
                    ref="sendFormInfoJobContent"
                    name="職位內容"
                    :editor="editor"
                    tag-name="textarea"
                    v-model="form.user.options.job.jobContent"
                    :config="editorConfig"
                  ></ckeditor>
                  <Field
                    name="職位內容"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['職位內容'] }"
                    placeholder="請輸入"
                    v-model="form.user.options.job.jobContent"
                    as="textarea"
                    rules="required"
                  >
                  </Field>
                  <ErrorMessage name="職位內容" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="col-6">
                <div class="form__inputBox" v-if="form.user.options.company.companyJobToken > 0">
                  <div class="form__labelBox">
                    <label for="sendFormInfoCostToken" class="form__label--custom form-label"
                      >是否要升級成為付費推廣職位</label
                    >
                  </div>
                  <div class="form-check form-switch p-3 mb-2 border border-gray-line rounded">
                    <input
                      id="sendFormInfoCostToken"
                      type="checkbox"
                      class="form-check-input ms-0 me-3"
                      data-action="changeProductState"
                      data-id="${item.id}"
                      :checked="form.user.options.job.costToken > 0 ? true : false"
                      @change="changeProductState"
                    />
                    <label
                      class="form-check-label"
                      for="sendFormInfoCostToken"
                      :class="{ 'text-primary': form.user.options.job.costToken > 0 }"
                    >
                      {{
                        form.user.options.job.costToken > 0
                          ? `付費推廣，剩餘職位刊登額度：${form.user.options.company.companyJobToken}`
                          : `免費刊登，剩餘職位刊登額度：${form.user.options.company.companyJobToken}`
                      }}
                    </label>
                  </div>
                  <p class="subTxt text-secondary">將會扣一個職位額度升級，持續時間： 7 天</p>
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
            <!-- 表單操作按鈕 -->
          </Form>
        </div>
        <!-- 表單第三步：填寫應徵條件 -->
        <div class="box--shadow bg-white rounded p-6" v-if="formStep === 2">
          <Form ref="sendFormInfoForm2" v-slot="{ errors }" @submit="changeStep('next')">
            <h3 class="page__title--sub"><span class="title__icon"></span>應徵條件</h3>
            <p class="mb-4">
              預設最基本的學歷、工作經驗應徵條件，如您有其他與職位有關的技能、語言、專案經驗等應徵標準，建議您可以填寫在其他自訂條件中，幫助求職者判斷自身能力：
            </p>
            <div class="row">
              <div class="col-12">
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoEducation" class="form__label--custom form-label"
                      >學歷要求</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="form-check me-2"
                      v-for="(item, index) in formData.education"
                      :key="index"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        :value="item"
                        :id="'education' + index"
                        name="學歷要求"
                        v-model="form.user.options.job.education"
                      />
                      <label class="form-check-label" :for="'education' + index">
                        {{ item }}
                      </label>
                    </div>
                  </div>
                  <Field
                    id="sendFormInfoEducationCheck"
                    ref="sendFormInfoEducationCheck"
                    name="學歷要求"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['學歷要求'] }"
                    v-model="form.user.options.job.education"
                    rules="required"
                  ></Field>
                  <ErrorMessage name="學歷要求" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoworkExp" class="form__label--custom form-label"
                      >工作經驗</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="form-check me-2"
                      v-for="(item, index) in formData.workExp"
                      :key="index"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        :value="item"
                        :id="'workExp' + index"
                        name="工作經驗"
                        v-model="form.user.options.job.workExp"
                      />
                      <label class="form-check-label" :for="'workExp' + index">
                        {{ item }}
                      </label>
                    </div>
                  </div>
                  <Field
                    id="sendFormInfoworkExpCheck"
                    ref="sendFormInfoworkExpCheck"
                    name="工作經驗"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['工作經驗'] }"
                    v-model="form.user.options.job.workExp"
                    rules="required"
                  ></Field>
                  <ErrorMessage name="工作經驗" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__inputBox form__infoEditBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoOtherRequirement" class="form__label--custom form-label"
                      >其他自訂條件</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <ckeditor
                    id="sendFormInfoOtherRequirement"
                    ref="sendFormInfoOtherRequirement"
                    name="其他自訂條件"
                    :editor="editor"
                    tag-name="textarea"
                    v-model="form.user.options.job.otherRequirement"
                    :config="editorConfig"
                  ></ckeditor>
                  <Field
                    name="其他自訂條件"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['其他自訂條件'] }"
                    placeholder="請輸入"
                    v-model="form.user.options.job.otherRequirement"
                    as="textarea"
                    rules="required"
                  >
                  </Field>
                  <ErrorMessage name="其他自訂條件" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
            </div>
            <!-- 表單操作按鈕 -->
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
          </Form>
        </div>
        <!-- 表單第四步：填寫申請方法 -->
        <div class="box--shadow bg-white rounded p-6" v-if="formStep === 3">
          <Form ref="sendFormInfoForm3" v-slot="{ errors }" @submit="processFormData">
            <h3 class="page__title--sub"><span class="title__icon"></span>申請方法</h3>
            <p class="mb-4">
              申請方法包含聯絡人、聯絡方式，如果有其他與面試相關的需求，也可以放在申請備註中：
            </p>
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
                    placeholder="請輸入聯絡人姓名"
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
                    <p class="formTag--must">必填</p>
                  </div>
                  <Field
                    id="sendFormInfoContactPosition"
                    ref="sendFormInfoContactPosition"
                    name="聯絡人職稱"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['聯絡人職稱'] }"
                    placeholder="請輸入聯絡人職稱"
                    rules="required"
                    v-model="form.user.options.company.contactPosition"
                  ></Field>
                  <ErrorMessage name="聯絡人職稱" class="invalid-feedback"></ErrorMessage>
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
                    placeholder="請輸入聯絡人電話"
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
                    placeholder="請輸入聯絡人Email"
                    rules="email|required"
                    v-model="form.user.email"
                  ></Field>
                  <ErrorMessage name="聯絡人Email" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="col-12">
                <div class="form__inputBox form__infoEditBox">
                  <div class="form__labelBox">
                    <label for="sendFormInfoOtherApplyInfo" class="form__label--custom form-label"
                      >申請備註</label
                    >
                    <p class="formTag--must">必填</p>
                  </div>
                  <ckeditor
                    id="sendFormInfoOtherApplyInfo"
                    ref="sendFormInfoOtherApplyInfo"
                    name="申請備註"
                    :editor="editor"
                    tag-name="textarea"
                    v-model="form.user.options.job.otherApplyInfo"
                    :config="editorConfig"
                  ></ckeditor>
                  <Field
                    name="申請備註"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['申請備註'] }"
                    placeholder="請輸入"
                    v-model="form.user.options.job.otherApplyInfo"
                    as="textarea"
                    rules="required"
                  >
                  </Field>
                  <ErrorMessage name="申請備註" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
            </div>
            <!-- 表單操作按鈕 -->
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
          </Form>
        </div>
        <!-- 表單第五步：完成 -->
        <div class="box--shadow bg-white rounded p-6" v-if="formStep === 4">
          <Form ref="sendFormInfoForm4">
            <div class="row justify-content-center">
              <div class="col-8">
                <h3 class="page__title--sub justify-content-center ">申請創建職位成功</h3>
                <p class="mb-4 text-center">
                  恭喜您已完成填寫新建職位流程， 本公司會於3個工作天內審核職位資料，如審核完畢會寄
                  email 給您！ 預祝貴公司招募順利～
                </p>
                <p class="mb-4 text-center">如有任何問題歡迎您寄信聯絡我們，很高興能為您服務～</p>
                <p class="mb-6 text-center text-primary text-decoration-underline">
                  Jordan.ttc.design@gmail.com
                </p>
                <div class="d-flex justify-content-center">
                  <router-link class="btn btn-primary w-50" to="/">回首頁</router-link>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';
import webData from '@/components/helpers/webData';
// import Cropper from 'cropperjs';
import ImageCropper from '@/components/ImageCropperModal.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  components: { ImageCropper },
  data() {
    return {
      // 抓取公司資料用
      tempLists: [],
      companyList: [],
      // 建立職位資訊表單
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
            login: {
              password: '',
            },
          },
        },
        message: '',
      },
      // 表單資料
      formData: {},
      // 驗證使用
      formState: false,
      formStep: 0,
      jobImage: { src: '', isUpDated: false },
      uploadImgState: '',
      // 購物車資訊
      cartList: [],
      cartTotal: null,
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

    // 以下是送出表單的動作
    // 上傳表單前處理資料
    // 送出表單前檢查整理資料
    processFormData() {
      if (this.form.user.options.job.salaryInterView) {
        this.form.user.options.job.salary = 24000;
      }
      if (this.form.user.options.company.companyAddressCity !== '') {
        const city = this.form.user.options.company.companyAddressCity;
        const detail = this.form.user.options.company.companyAddressDetail;
        this.form.user.address = city + detail;
        this.addCart(this.form.user.options.addJobsToken);
        this.formState = true;
      }
    },
    // 加入購物車後，才會傳送表單
    addCart(qty = 1) {
      const id = '-MdgiKJN2vitTB6FWCvw';
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
            if (res.data.success) {
              this.changeStep('next');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    // 以下是操作表單動作
    // 是否使用付費推廣
    changeProductState() {
      if (this.form.user.options.job.costToken > 0) {
        this.form.user.options.job.costToken = 0;
        this.form.user.options.company.companyJobToken += 1;
      } else {
        this.form.user.options.job.costToken = 1;
        this.form.user.options.company.companyJobToken -= 1;
      }
    },
    // 跳頁
    changeStep(way) {
      if (way === 'back' && this.formStep > 0) {
        this.formStep -= 1;
      } else if (way === 'next') {
        this.formStep += 1;
      }
      document.documentElement.scrollTop = 0;
      console.log(this.formStep);
    },
    // 選取名稱後會自動帶入一些企業基本資料
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

    // 以下是針對資料api動作
    // 取得購物車資料
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
    // 取得產品資料
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
    // 分類公司資料
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

<style lang="scss"></style>
