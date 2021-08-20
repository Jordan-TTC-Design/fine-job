<template>
  <div class="pb-6">
    <div class="container-fuild">
      <Form v-slot="{ errors }" @submit="updateJobData">
        <div class="admin__subHeader admin__subHeader--edit mb-6 box--shadow">
          <div class="container">
            <div class="admin__subNav w-100 justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <h2 class="admin__subNav__title me-0">
                  編輯職位資料
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
                  >{{ pagePreview ? '編輯職位' : '預覽職位' }}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-gray-line text-dark me-2"
                  @click="$router.back(-1)"
                >
                  返回
                </button>
                <!-- 這個submit，有時候靈有時候有些職位不靈，我先加上@click -->
                <button type="submit" class="btn btn-primary" @click="updateJobData">
                  保存資料
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="container jobPage" v-if="jobItem.id" v-show="!pagePreview">
          <div class="row">
            <div class="col-lg-9 col-12">
              <div class="jobInfoBox box--shadow mb-3 position-relative">
                <div class="d-flex flex-lg-row flex-column">
                  <div class="jobInfoBox__imgBox mb-md-0 mb-4">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="sendFormJobImage" class="form__label--custom form-label"
                          >職位圖片</label
                        >
                        <p class="formTag--must">必填</p>
                      </div>
                      <input
                        id="sendFormJobImage"
                        ref="sendFormJobImage"
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
                        <button
                          type="button"
                          class="iconBox btn"
                          @click="deleteImgInput(index)"
                          v-if="jobImage.src !== ''"
                        >
                          <div class="iconBox__innerBox">
                            <i class="jobIcon bi bi-x-lg"></i>
                          </div>
                        </button>
                        <div class="cropImgBox__cover" v-if="jobImage.src"></div>
                        <p class="subTxt" v-if="jobImage.src == ''">(上限 5 mb )</p>
                        <img
                          v-if="jobImage.src !== ''"
                          class="cropImg h-100"
                          ref="cropImgCompanyLogo"
                          :src="jobImage.src"
                          alt="職位圖片"
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
                        id="sendFormJobImageCheck"
                        ref="sendFormJobImageCheck"
                        name="職位圖片"
                        type="text"
                        class="form-control d-none"
                        :class="{ 'is-invalid': errors['職位圖片'] }"
                        v-model="jobImage.src"
                        rules="required"
                      ></Field>
                      <ErrorMessage name="職位圖片" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="jobInfoBox__txtBox d-flex flex-column justify-content-between">
                    <div class="row">
                      <div class="col-12">
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
                            v-model="jobItem.title"
                            ref="sendFormInfoJobName"
                          ></Field>
                          <ErrorMessage name="職位名稱" class="invalid-feedback"></ErrorMessage>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form__inputBox">
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
                              v-model="jobItem.options.company.companyAddressCity"
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
                              v-model="jobItem.options.company.companyAddressDetail"
                            ></Field>
                            <ErrorMessage
                              name="公司詳細地址"
                              class="invalid-feedback"
                            ></ErrorMessage>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-12">
                        <div class="form__inputBox">
                          <div class="form__labelBox">
                            <label
                              for="sendFormInfoNeedPerson"
                              class="form__label--custom form-label"
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
                            v-model.number="jobItem.num"
                          ></Field>
                          <ErrorMessage name="需求人數" class="invalid-feedback"></ErrorMessage>
                        </div>
                      </div>
                      <div class="col-md-6 col-12">
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
                                  jobItem.options.job.salaryInterView
                                    ? '面議薪資勿低於 40,000 '
                                    : '請輸入'
                                "
                                class="form-control"
                                :class="{ 'is-invalid': errors['薪資'] }"
                                min="0"
                                v-model.number="jobItem.price"
                                :disabled="jobItem.options.job.salaryInterView"
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
                                v-model="jobItem.options.job.salaryInterView"
                              />
                              <label class="form-check-label" for="sendFormInfoSalaryInterView">
                                面議
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="jobContentSection box--shadow mb-3">
                <h3 class="section__title--sub"><span class="title__icon"></span>職位內容</h3>
                <div class="row">
                  <div class="col-md-6 col-12">
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
                            :id="`workType${index}`"
                            name="工作性質"
                            v-model="jobItem.options.job.workType"
                          />
                          <label class="form-check-label" :for="`workType${index}`">
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
                        v-model="jobItem.options.job.workType"
                        rules="required"
                      ></Field>
                      <ErrorMessage name="工作性質" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="sendFormInfoworkTime" class="form__label--custom form-label"
                          >工作時間</label
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
                            :id="`workTime${index}`"
                            name="工作時間"
                            v-model="jobItem.options.job.workTime"
                          />
                          <label class="form-check-label" :for="`workTime${index}`">
                            {{ item }}
                          </label>
                        </div>
                      </div>
                      <Field
                        id="sendFormInfoworkTimeCheck"
                        ref="sendFormInfoworkTimeCheck"
                        name="工作時間"
                        type="text"
                        class="form-control d-none"
                        :class="{ 'is-invalid': errors['工作時間'] }"
                        v-model="jobItem.options.job.workTime"
                        rules="required"
                      ></Field>
                      <ErrorMessage name="工作時間" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
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
                        v-model="jobItem.category"
                        ref="sendFormInfoJobCategory"
                      >
                        <option value="" disabled selected>選擇職位類別</option>
                        <option v-for="item in formData.jobCategory" :value="item" :key="item">{{
                          item
                        }}</option>
                      </Field>
                      <ErrorMessage name="職位類別" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form__inputBox form__infoEditBox">
                      <div class="form__labelBox">
                        <label for="sendFormInfoJobContent" class="form__label--custom form-label"
                          >工作內容</label
                        >
                        <p class="formTag--must">必填</p>
                      </div>
                      <ckeditor
                        id="sendFormInfoJobContent"
                        ref="sendFormInfoJobContent"
                        name="工作內容"
                        :editor="editor"
                        tag-name="textarea"
                        v-model="jobItem.content"
                        :config="editorConfig"
                      ></ckeditor>
                      <Field
                        name="工作內容"
                        type="text"
                        class="form-control d-none"
                        :class="{ 'is-invalid': errors['工作內容'] }"
                        placeholder="請輸入"
                        v-model="jobItem.content"
                        as="textarea"
                        rules="required"
                      >
                      </Field>
                      <ErrorMessage name="工作內容" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                </div>
              </div>
              <div class="jobContentSection box--shadow mb-3">
                <h3 class="section__title--sub"><span class="title__icon"></span>應徵條件</h3>
                <div class="row">
                  <div class="col-md-6 col-12">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="sendFormInfoEducation" class="form__label--custom form-label"
                          >學歷要求</label
                        >
                        <p class="formTag--must">必填</p>
                      </div>
                      <div class="d-flex flex-wrap">
                        <div
                          class="form-check me-2"
                          v-for="(item, index) in formData.education"
                          :key="index"
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            :value="item"
                            :id="`education${index}`"
                            name="學歷要求"
                            v-model="jobItem.options.job.education"
                          />
                          <label class="form-check-label" :for="`education${index}`">
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
                        v-model="jobItem.options.job.education"
                        rules="required"
                      ></Field>
                      <ErrorMessage name="學歷要求" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="sendFormInfoworkExp" class="form__label--custom form-label"
                          >工作經驗</label
                        >
                        <p class="formTag--must">必填</p>
                      </div>
                      <div class="d-flex flex-wrap">
                        <div
                          class="form-check me-2"
                          v-for="(item, index) in formData.workExp"
                          :key="index"
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            :value="item"
                            :id="`workExp${index}`"
                            name="工作經驗"
                            v-model="jobItem.options.job.workExp"
                          />
                          <label class="form-check-label" :for="`workExp${index}`">
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
                        v-model="jobItem.options.job.workExp"
                        rules="required"
                      ></Field>
                      <ErrorMessage name="工作經驗" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form__inputBox form__infoEditBox">
                      <div class="form__labelBox">
                        <label
                          for="sendFormInfoOtherRequirement"
                          class="form__label--custom form-label"
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
                        v-model="jobItem.options.job.otherRequirement"
                        :config="editorConfig"
                      ></ckeditor>
                      <Field
                        name="其他自訂條件"
                        type="text"
                        class="form-control d-none"
                        :class="{ 'is-invalid': errors['其他自訂條件'] }"
                        placeholder="請輸入"
                        v-model="jobItem.options.job.otherRequirement"
                        as="textarea"
                        rules="required"
                      >
                      </Field>
                      <ErrorMessage name="其他自訂條件" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                </div>
              </div>
              <div class="jobContentSection box--shadow mb-lg-0 mb-3">
                <h3 class="section__title--sub"><span class="title__icon"></span>申請方法</h3>
                <div class="row">
                  <div class="col-md-6 col-12">
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
                        v-model="jobItem.options.company.companyContact"
                      ></Field>
                      <ErrorMessage name="聯絡人姓名" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label
                          for="sendFormInfoContactPosition"
                          class="form__label--custom form-label"
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
                        v-model="jobItem.options.company.contactPosition"
                      ></Field>
                      <ErrorMessage name="聯絡人職稱" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
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
                        v-model="jobItem.options.company.companyTel"
                      ></Field>
                      <ErrorMessage name="聯絡人電話" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
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
                        v-model="jobItem.options.company.companyEmail"
                      ></Field>
                      <ErrorMessage name="聯絡人Email" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form__inputBox form__infoEditBox">
                      <div class="form__labelBox">
                        <label
                          for="sendFormInfoOtherApplyInfo"
                          class="form__label--custom form-label"
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
                        v-model="jobItem.options.job.otherApplyInfo"
                        :config="editorConfig"
                      ></ckeditor>
                      <Field
                        name="申請備註"
                        type="text"
                        class="form-control d-none"
                        :class="{ 'is-invalid': errors['申請備註'] }"
                        placeholder="請輸入"
                        v-model="jobItem.options.job.otherApplyInfo"
                        as="textarea"
                        rules="required"
                      >
                      </Field>
                      <ErrorMessage name="申請備註" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-12">
              <div class="jobContentSection box--shadow mb-lg-0 mb-3">
                <h3 class="section__title--sub"><span class="title__icon"></span>系統資料</h3>
                <div class="row">
                  <div class="col-12">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="sendFormInfoCostToken" class="form__label--custom form-label"
                          >職位刊登狀態</label
                        >
                      </div>
                      <div class="form-check form-switch p-2 border border-gray-line rounded">
                        <input
                          id="sendFormInfoCostToken"
                          type="checkbox"
                          class="form-check-input ms-0 me-3"
                          data-action="changeProductState"
                          data-id="${item.id}"
                          :checked="jobItem.is_enabled > 0 ? true : false"
                          @change="changeProductState"
                        />
                        <label
                          class="form-check-label"
                          for="sendFormInfoCostToken"
                          :class="{ 'text-primary': jobItem.is_enabled > 0 }"
                        >
                          {{ jobItem.is_enabled > 0 ? `招募中` : `停止招募` }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container jobPage" v-if="pagePreview">
          <div class="row">
            <div class="col-lg-9 col-12">
              <div class="jobInfoBox box--shadow mb-3 position-relative">
                <button
                  class="collectBtn btn btn-outline-gray-line position-absolute pageState"
                  type="button"
                  ref="jobCollectBtn"
                >
                  <i class="jobIcon bi bi-bookmark-fill"></i>
                </button>
                <div class="d-flex flex-lg-row flex-column">
                  <div class="jobInfoBox__imgBox mb-md-0 mb-4">
                    <img
                      class="jobImg putPointer"
                      :src="jobItem.imageUrl"
                      :alt="`${jobItem.title}職位圖片`"
                      @click="openImgModal(jobItem.imageUrl)"
                    />
                    <div class="jobInfoBox__logoImgBox">
                      <img
                        class="logoImg"
                        :src="jobItem.options.company.companyLogoUrl"
                        :alt="`${jobItem.options.company.companyName}logo`"
                      />
                    </div>
                  </div>
                  <div class="jobInfoBox__txtBox d-flex flex-column justify-content-between">
                    <div class="pt-3 d-md-block d-flex flex-column align-items-center">
                      <h2 class="page__title">{{ jobItem.title }}</h2>
                      <p class="page__link subTxt mb-4 d-block pe-auto">
                        {{ jobItem.options.company.companyName }}
                      </p>
                    </div>
                    <div class="d-flex justify-content-between align-items-end mb-lg-0 mb-4">
                      <div>
                        <p class="mb-3">
                          <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                          >{{ jobItem.options.company.companyAddressCity }}
                        </p>
                        <p>
                          <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                            jobItem.num
                          }}
                        </p>
                      </div>
                      <div>
                        <p
                          class="text-primary fw-bold mb-3"
                          v-if="!jobItem.options.job.salaryInterView"
                        >
                          {{ jobItem.price }} / 月薪
                        </p>
                        <p
                          class="text-primary fw-bold mb-3"
                          v-if="jobItem.options.job.salaryInterView"
                        >
                          薪資面議
                        </p>
                        <p class="subTxt text-secondary text-end">
                          {{ $filters.date(jobItem.options.job.create) }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p
                    class="btn btn-lg btn-primary w-100 pe-auto d-lg-none d-block mb-3"
                    aria-current="page"
                  >
                    申請職位
                  </p>
                  <button
                    class="btn btn-lg btn-gray-light w-100 pe-auto d-lg-none d-block"
                    type="button"
                  >
                    收藏職位
                  </button>
                </div>
              </div>
              <div class="jobContentSection box--shadow mb-3">
                <h3 class="section__title--sub"><span class="title__icon"></span>職位內容</h3>
                <p class="mb-2">
                  <i class="jobIcon--sm me-1 bi bi-journal"></i>工作性質：{{
                    jobItem.options.job.workType
                  }}
                </p>
                <p class="mb-2">
                  <i class="jobIcon--sm me-1 bi bi-clock"></i>工作時間：{{
                    jobItem.options.job.workTime
                  }}
                </p>
                <p class="mb-2">
                  <i class="jobIcon--sm me-1 bi bi-building"></i>產業類別：{{
                    jobItem.options.company.industryCategory
                  }}
                </p>
                <p class="mb-2">
                  <i class="jobIcon--sm me-1 bi bi-card-list"></i>工作類別：{{ jobItem.category }}
                </p>
                <p class="mb-2">工作內容：</p>
                <div v-html="jobItem.content"></div>
              </div>
              <div class="jobContentSection box--shadow mb-3">
                <h3 class="section__title--sub"><span class="title__icon"></span>應徵條件</h3>
                <p class="mb-2">
                  <i class="jobIcon--sm me-1 bi bi-book"> </i>學歷要求：{{
                    jobItem.options.job.education
                  }}
                </p>
                <p class="mb-2">
                  <i class="jobIcon--sm me-1 bi bi-briefcase"></i>工作經驗：{{
                    jobItem.options.job.workExp
                  }}
                </p>
                <p class="mb-2">其他條件：</p>
                <div v-html="jobItem.options.job.otherRequirement"></div>
              </div>
              <div class="jobContentSection box--shadow mb-lg-0 mb-3">
                <h3 class="section__title--sub"><span class="title__icon"></span>申請方法</h3>
                <p class="mb-2">
                  <i class="jobIcon--sm me-1 bi bi-person"></i>職位聯絡人：{{
                    jobItem.options.company.companyContact
                  }}
                </p>
                <a :href="`mailto:${jobItem.options.company.companyEmail}`" class="mb-2 d-block">
                  <i class="jobIcon--sm me-1 bi bi-envelope"></i>聯絡信箱：{{
                    jobItem.options.company.companyEmail
                  }}
                </a>
                <a class="mb-3 d-block" :href="`tel:${jobItem.options.company.companyTel}`">
                  <i class="jobIcon--sm me-1 bi bi-phone"></i>聯絡電話：{{
                    jobItem.options.company.companyTel
                  }}
                </a>
                <p class="mb-2">申請備註：</p>
                <div v-html="jobItem.options.job.otherApplyInfo"></div>
              </div>
            </div>
            <div class="col-lg-3 col-12">
              <div class="jobSubBox box--shadow mb-lg-3 p-3 d-lg-block d-none">
                <img class="applyImg" src="https://storage.googleapis.com/vue-course-api.appspot.com/jordanttcdesign/1629385277862.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=BRxSUwMJosEUEVSuPcucwYvuPW1QLTLPBJ0U%2BQxlXJ9RGEdRrsAt4dB9K4nAZk8iOBRsfxUxGfPF40zX0rV1TU6tP5LbQZbySQV3Oy7hErt9B0F2I4OR7PDK8WiOc7tiue5xZK7q6%2FvCRaf5KyuHYTr8yYD4WsArtfdjd9r9K%2Fk9a974eMZEM6yII8PRciNDDpK6rPQPyHi1NflqCEoJsxh4UdW3Q%2BXp4avtMAhA2ZqOB3RRT%2FY%2BJ%2F7h1k6rB8buzuwyQWXBXrFR9xWP8G5sIuQEnGy59oBqdBH5kpiWzt2NA5OijLDOoX2DN%2Fpr2OFWwNcfSbP5bdOUtwBLLF8N3A%3D%3D" alt="申請職位在這裡" />
                <p class="btn btn-lg btn-primary w-100" aria-current="page">申請職位</p>
              </div>
              <div
                v-if="jobItem.options.company.companyImagesUrl.length > 0"
                class="jobSubBox jobPage__companyImage box--shadow mb-3"
              >
                <h5 class="jobSubBox__title">公司照片</h5>
                <div class="companyImgBox">
                  <img
                    class="mb-2 putPointer"
                    :src="jobItem.options.company.companyImagesUrl[0]"
                    :alt="`${jobItem.options.company.companyName}公司圖片1`"
                    @click="openImgModal(jobItem.options.company.companyImagesUrl)"
                  />
                  <div class="d-flex justify-content-between">
                    <img
                      v-if="jobItem.options.company.companyImagesUrl.length > 0"
                      class="companyImage--sub putPointer"
                      :src="jobItem.options.company.companyImagesUrl[1]"
                      :alt="`${jobItem.options.company.companyName}公司圖片2`"
                      @click="openImgModal(jobItem.options.company.companyImagesUrl)"
                    />
                    <img
                      v-if="jobItem.options.company.companyImagesUrl.length > 1"
                      :src="jobItem.options.company.companyImagesUrl[2]"
                      :alt="`${jobItem.options.company.companyName}公司圖片3`"
                      class="companyImage--sub putPointer"
                      @click="openImgModal(jobItem.options.company.companyImagesUrl)"
                    />
                  </div>
                </div>
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
  <ImgPopModal />
  <ImageCropper @emit-send-img-data="getImg" />
</template>

<script>
import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import webData from '@/methods/webData';
import ImgPopModal from '@/components/helpers/ImgPopModal.vue';
import ImageCropper from '@/components/helpers/ImageCropperModal.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  components: {
    UpTopBtn,
    ImageCropper,
    ImgPopModal,
  },
  data() {
    return {
      jobItem: {
        options: {
          company: {
            companyLogoUrl: '',
            companyImagesUrl: [],
          },
          job: {},
        },
      },
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
      jobImage: { src: '', isUpDated: false },
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
      pagePreview: false, // 預覽編輯
    };
  },
  methods: {
    // 切換預覽狀態或是編輯狀態
    lookPagePreview() {
      if (this.pagePreview) {
        this.pagePreview = false;
      } else {
        this.pagePreview = true;
      }
    },
    // 改變企業狀態
    changeProductState() {
      if (this.jobItem.is_enabled > 0) {
        this.jobItem.is_enabled = 0;
      } else {
        this.jobItem.is_enabled = 1;
      }
    },
    // 清除圖片
    deleteImgInput() {
      this.jobItem.imageUrl = '';
      this.jobImage.src = '';
      this.jobImage.isUpDated = false;
    },
    // 取得圖片傳給modal
    loadingImg(e) {
      const nowId = '';
      emitter.emit('open-imageCropper', [e.target.files[0], nowId]);
    },
    // 從modal抓回圖片
    getImg(data) {
      this.jobImage.src = data;
    },
    // 搭配自製按鈕點擊預設上傳按鈕
    clickInput(e) {
      if (e.target.dataset.input === 'upLoadSingleImg') {
        this.deleteImgInput();
        this.jobImage.src = '';
        this.$refs.sendFormJobImage.click();
      }
    },
    // 上傳圖片
    updateImg(e) {
      emitter.emit('spinner-open');
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
          if (this.uploadImgState === 'upLoadSingleImg') {
            this.jobImage.isUpDated = true;
            this.jobImage.src = res.data.data.link;
            this.jobItem.imageUrl = res.data.data.link;
          }
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    updateJobData() {
      emitter.emit('spinner-open');
      this.jobItem.options.create = `${Math.floor(Date.now() / 1000)}`;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      const companyData = {
        data: this.jobItem,
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
            this.jobImage.src = this.jobItem.imageUrl;
            this.jobImage.isUpDated = true;
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
    this.getProductData();
    this.formData = webData;
    emitter.emit('spinner-open-bg', 500);
  },
};
</script>

<style lang="scss"></style>
