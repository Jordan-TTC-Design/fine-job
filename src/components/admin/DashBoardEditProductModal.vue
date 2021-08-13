<template>
  <div ref="editItemModal" class="modal fade" tabindex="-1" aria-labelledby="editItemModalLabel">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <!-- 企業內容 -->
        <div class="editCompany" v-if="modalName === 'editCompany'">
          <div class="modal-header bg-dark text-white">
            <h5 id="editCompanyModalLabel" class="modal-title">
              <span>編輯企業</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="title">公司名稱</label>
                  <input
                    id="title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入公司名稱"
                    v-model="companyData.title"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="companyContact">企業聯絡人</label>
                  <input
                    id="companyContact"
                    type="text"
                    class="form-control"
                    placeholder="企業聯絡人"
                    v-model="companyData.options.companyContact"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="companyTel">聯絡電話</label>
                  <input
                    id="companyTel"
                    type="text"
                    class="form-control"
                    placeholder="聯絡電話"
                    v-model="companyData.options.companyTel"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="companyEmail">聯絡Email</label>
                  <input
                    id="companyEmail"
                    type="text"
                    class="form-control"
                    placeholder="聯絡Email"
                    v-model="companyData.options.companyEmail"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="contactPosition">聯絡人職位</label>
                  <input
                    id="contactPosition"
                    type="text"
                    class="form-control"
                    placeholder="聯絡人職位"
                    v-model="companyData.options.companyContactPosition"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="logoImageUrl">公司Logo</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="companyData.imageUrl"
                  />
                </div>
                <img class="img-fluid" alt="公司logo" :src="companyData.imageUrl" />
              </div>
              <div class="col-12 mb-3">
                <div v-if="companyData.imagesUrl.length > 0" class="row ">
                  <div v-for="(item, index) in companyData.imagesUrl" :key="index" class="col-4">
                    <div class="form-group">
                      <label for="imageUrl">輸入第 {{ index + 1 }} 張企業圖片</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                        v-model="companyData.imagesUrl[index]"
                      />
                    </div>
                    <img class="img-fluid" :alt="`第${index}張職位圖片`" :src="item" />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="公司行業類別">行業類別</label>
                    <select
                      name="公司行業類別"
                      id="newCompanyIndustryCategory"
                      class="form-control form-select"
                      v-model="companyData.category"
                    >
                      <option :value="companyData.category" selected>
                        {{ companyData.category }}</option
                      >
                      <option v-for="item in formData.industryCategory" :value="item" :key="item"
                        >{{ item }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="unit">職位額度</label>
                    <input
                      id="unit"
                      type="text"
                      class="form-control"
                      placeholder="請輸入職位額度"
                      v-model="companyData.options.companyJobToken"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <label for="companyAddressCity">縣市</label>
                      <select
                        name="公司地址縣市"
                        id="companyAddressCity"
                        class="form-control form-select"
                        v-model="companyData.options.companyAddressCity"
                        ref="companyAddressCity"
                      >
                        <option :value="companyData.options.companyAddressCity" selected>
                          {{ companyData.options.companyAddressCity }}</option
                        >
                        <option v-for="item in formData.city" :value="item" :key="item"
                          >{{ item }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for="companyAddressDetail">詳細地址</label>
                      <input
                        type="text"
                        id="companyAddressDetail"
                        class="form-control"
                        placeholder="請輸入詳細地址"
                        v-model="companyData.options.companyAddressDetail"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="description">公司簡介</label>
                      <textarea
                        id="description"
                        type="text"
                        class="form-control"
                        placeholder="請輸入公司簡介"
                        v-model="companyData.content"
                        cols="30"
                        rows="10"
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="processCompanyData">
              確認
            </button>
          </div>
        </div>
        <!-- 職位內容 -->
        <div class="editJob" v-if="modalName === 'editJob'">
          <div class="modal-header bg-dark text-white">
            <h5 id="newJobModalLabel" class="modal-title">
              <span>編輯職位</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="title">職位名稱</label>
                  <input
                    id="title"
                    type="text"
                    class="form-control"
                    placeholder="職位名稱"
                    v-model="jobData.title"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="companyContact">企業聯絡人</label>
                  <input
                    id="companyContact"
                    type="text"
                    class="form-control"
                    placeholder="企業聯絡人"
                    v-model="jobData.options.company.companyContact"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="companyTel">聯絡電話</label>
                  <input
                    id="companyTel"
                    type="text"
                    class="form-control"
                    placeholder="聯絡電話"
                    v-model="jobData.options.company.companyTel"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="companyEmail">聯絡Email</label>
                  <input
                    id="companyEmail"
                    type="text"
                    class="form-control"
                    placeholder="聯絡Email"
                    v-model="jobData.options.company.companyEmail"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="contactPosition">聯絡人職位</label>
                  <input
                    id="contactPosition"
                    type="text"
                    class="form-control"
                    placeholder="聯絡人職位"
                    v-model="jobData.options.company.contactPosition"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="companyLogoUrl">公司Logo</label>
                  <input
                    id="companyLogoUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="jobData.options.company.companyLogoUrl"
                  />
                </div>
                <img class="img-fluid" alt="公司logo" :src="jobData.options.company.companyLogoUrl" />
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="jobImage">職位圖片</label>
                  <input
                    id="jobImage"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="jobData.imageUrl"
                  />
                </div>
                <img class="img-fluid" alt="職位圖片" :src="jobData.imageUrl" />
              </div>
              <div class="col-6">
                <label for="jobSalary" class="form-label">薪資</label>
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1 me-2">
                    <input
                      id="jobSalary"
                      ref="jobSalary"
                      name="薪資"
                      type="number"
                      :placeholder="
                        jobData.options.job.salaryInterView ? '面議薪資勿低於 40,000 ' : '請輸入'
                      "
                      class="form-control"
                      min="0"
                      v-model.number="jobData.price"
                      :disabled="jobData.options.job.salaryInterView"
                    />
                  </div>
                  <div class="form-check">
                    <input
                      id="jobSalaryInterView"
                      ref="jobSalaryInterView"
                      name="薪資"
                      class="form-check-input"
                      type="checkbox"
                      v-model="jobData.options.job.salaryInterView"
                    />
                    <label class="form-check-label" for="jobSalaryInterView">
                      面議
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <label class="form-label d-block">上班時段</label>
                <div class="btn-group" role="group">
                  <div
                    class="form-check"
                    v-for="(item, index) in formData.workTime"
                    :key="`workTime${index}`"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="item"
                      :id="`workTime${index}`"
                      name="上班時段"
                      v-model="jobData.options.job.workTime"
                    />
                    <label class="form-check-label" :for="`workTime${index}`">
                      {{ item }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <label class="form-label d-block">工作性質</label>
                <div class="btn-group" role="group">
                  <div
                    class="form-check"
                    v-for="(item, index) in formData.workType"
                    :key="`workType${index}`"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="item"
                      :id="`workType${index}`"
                      name="工作性質"
                      v-model="jobData.options.job.workType"
                    />
                    <label class="form-check-label" :for="`workType${index}`">
                      {{ item }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="needPerson">需求人數</label>
                  <input
                    id="needPerson"
                    type="number"
                    class="form-control"
                    placeholder="聯絡電話"
                    v-model.number="jobData.num"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="公司職位類別">職位類別</label>
                    <select
                      name="公司職位類別"
                      id="jobCategory"
                      class="form-control form-select"
                      v-model="jobData.category"
                    >
                      <option :value="jobData.category" selected> {{ jobData.category }}</option>
                      <option v-for="item in formData.jobCategory" :value="item" :key="item"
                        >{{ item }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-6">
                    <label class="form-label d-block" for="jobLevel"
                      >是否要升級成為付費推廣職位</label
                    >
                    <div class="form-check form-switch">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        data-action="changeProductState"
                        data-id="${item.id}"
                        :checked="jobData.options.job.promote > 0 ? true : false"
                        @change="changeProductState"
                        name="jobLevel"
                        id="jobLevel"
                      />
                      <label class="form-check-label" for="jobLevel">
                        {{
                          jobData.options.job.promote > 0 ? '付費推廣(時效七天)' : '免費職位刊登'
                        }}
                      </label>
                      <p>剩餘職位刊登額度：{{ jobData.options.company.companyJobToken }}</p>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="jobContent">職位簡介</label>
                      <textarea
                        id="jobContent"
                        type="text"
                        class="form-control"
                        placeholder="請輸入職位簡介"
                        v-model="jobData.content"
                        cols="30"
                        rows="10"
                      >
                      </textarea>
                    </div>
                  </div>
                  <div class="col-6">
                    <label class="form-label d-block">工作經驗</label>
                    <div class="btn-group" role="group">
                      <div
                        class="form-check"
                        v-for="(item, index) in formData.workExp"
                        :key="`workExp${index}`"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          :value="item"
                          :id="`workExp${index}`"
                          name="工作經驗"
                          v-model="jobData.options.job.workExp"
                        />
                        <label class="form-check-label" :for="`workExp${index}`">
                          {{ item }}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <label class="form-label d-block">學歷要求</label>
                    <div class="btn-group" role="group">
                      <div
                        class="form-check"
                        v-for="(item, index) in formData.education"
                        :key="`education${index}`"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          :value="item"
                          :id="`education${index}`"
                          name="學歷要求"
                          v-model="jobData.options.job.education"
                        />
                        <label class="form-check-label" :for="`education${index}`">
                          {{ item }}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="otherRequirement">其他申請條件</label>
                      <textarea
                        id="otherRequirement"
                        type="text"
                        class="form-control"
                        placeholder="其他申請條件"
                        v-model="jobData.options.job.otherRequirement"
                        cols="30"
                        rows="10"
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="form-group">
                      <label for="companyName">公司名稱</label>
                      <input
                        id="companyName"
                        type="text"
                        class="form-control"
                        placeholder="公司名稱"
                        v-model="jobData.options.company.companyName"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for="companyAddressCity">縣市</label>
                      <select
                        name="公司地址縣市"
                        id="companyAddressCity"
                        class="form-control form-select"
                        v-model="jobData.options.company.companyAddressCity"
                        ref="companyAddressCity"
                      >
                        <option :value="jobData.options.company.companyAddressCity" selected>
                          {{ jobData.options.company.companyAddressCity }}</option
                        >
                        <option v-for="item in formData.city" :value="item" :key="item"
                          >{{ item }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for="companyAddressDetail">詳細地址</label>
                      <input
                        type="text"
                        id="companyAddressDetail"
                        class="form-control"
                        placeholder="請輸入詳細地址"
                        v-model="jobData.options.company.companyAddressDetail"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="jobApplyOther">申請備註</label>
                      <textarea
                        id="jobApplyOther"
                        type="text"
                        class="form-control"
                        placeholder="請輸入申請備註"
                        v-model="jobData.options.job.jobApplyOther"
                        cols="30"
                        rows="10"
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="processJobData">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      editmodal: {},
      formData: {},
      temItem: {},
      companyData: {},
      jobData: {
        options: {
          company: { companyLogoUrl: [] },
          job: {
            jobApplyOther: '',
          },
        },
      },
      modalName: '',
    };
  },
  methods: {
    addImageUrl() {
      this.companyData.options.company.companyImagesUrl.push('');
    },
    deleteImageUrl() {
      this.companyData.options.company.companyImagesUrl.pop();
    },
    updateProduct() {
      this.$emit('update-product', this.temItemData);
    },
    processCompanyData() {
      const temObj = this.companyData;
      const companyItem = {
        data: {
          title: temObj.title,
          id: temObj.id,
          category: temObj.category,
          origin_price: 0,
          price: 0,
          unit: temObj.unit,
          description: temObj.description,
          content: temObj.content,
          is_enabled: temObj.is_enabled,
          imageUrl: temObj.imageUrl,
          imagesUrl: temObj.imagesUrl,
          options: {
            companyAddressCity: temObj.options.companyAddressCity,
            companyAddressDetail: temObj.options.companyAddressDetail,
            companyContact: temObj.options.companyContact,
            companyContactPosition: temObj.options.companyContactPosition,
            companyTel: temObj.options.companyTel,
            companyEmail: temObj.options.companyEmail,
            companyJobToken: temObj.options.companyJobToken,
            create: Math.floor(Date.now() / 1000),
          },
        },
      };
      console.log(companyItem);
      // this.newCompany(newCompanyItem);
      this.$emit('update-product', companyItem);
      this.closeModal();
    },
    changeProductState() {
      if (this.jobData.options.job.promote > 0) {
        this.jobData.options.job.promote = 0;
        this.jobData.options.company.companyJobToken += 1;
      } else {
        this.jobData.options.job.promote = 1;
        this.jobData.options.company.companyJobToken -= 1;
      }
    },
    processJobData() {
      if (this.jobData.options.job.salaryInterView) {
        this.jobData.price = 24000;
      }
      const temObj = this.jobData;
      const jobItem = {
        data: {
          title: temObj.title,
          category: temObj.category,
          origin_price: temObj.origin_price,
          price: temObj.price,
          unit: temObj.unit,
          description: temObj.description,
          content: temObj.content,
          is_enabled: temObj.is_enabled,
          imageUrl: temObj.imageUrl,
          imagesUrl: [],
          num: temObj.num,
          id: temObj.id,
          options: {
            company: {
              companyName: temObj.options.company.companyName,
              industryCategory: temObj.options.company.industryCategory,
              companyLogoUrl: temObj.options.company.companyLogoUrl,
              companyImagesUrl: temObj.options.company.companyImagesUrl,
              companyAddressCity: temObj.options.company.companyAddressCity,
              companyAddressDetail: temObj.options.company.companyAddressDetail,
              companyAddress:
                temObj.options.company.companyAddressCity
                + temObj.options.company.companyAddressDetail,
              companyContact: temObj.options.company.companyName,
              contactPosition: temObj.options.company.contactPosition,
              companyTel: temObj.options.company.companyTel,
              companyEmail: temObj.options.company.companyEmail,
            },
            job: {
              otherRequirement: temObj.options.job.otherRequirement,
              jobApplyOther: temObj.options.job.jobApplyOther,
              workExp: temObj.options.job.workExp,
              workType: temObj.options.job.workType,
              workTime: temObj.options.job.workTime,
              education: temObj.options.job.education,
              salaryInterView: temObj.options.job.salaryInterView,
              promote: temObj.options.job.promote,
              create: Math.floor(Date.now() / 1000),
            },
          },
        },
      };
      console.log(jobItem);
      this.$emit('update-product', jobItem);
      this.closeModal();
    },
    cleanData() {
      this.companyData = {};
      this.jobData = {
        options: {
          company: { companyLogoUrl: [] },
          job: {
            jobApplyOther: '',
          },
        },
      };
    },
    openModal() {
      this.editmodal.show();
    },
    closeModal() {
      this.editmodal.hide();
      this.cleanData();
    },
  },
  watch: {
    // editItem: {
    //   deep: true,
    //   handler(newValue) {
    //     [this.companyData] = newValue;
    //     console.log(this.companyData);
    //   },
    // },
  },
  created() {
    this.formData = webData;
    emitter.on('close-edit-company', () => {
      this.closeModal();
    });
    emitter.on('open-edit-company', (data) => {
      this.openModal();
      console.log(data);
      [this.temItem] = data;
      // eslint-disable-next-line prefer-destructuring
      this.modalName = data[1];
      console.log(this.modalName);
      if (this.modalName === 'editCompany') {
        [this.companyData] = this.temItem;
        console.log(this.companyData, this.modalName);
      } else if (this.modalName === 'editJob') {
        [this.jobData] = this.temItem;
        console.log(this.jobData, this.modalName);
      }
    });
  },
  mounted() {
    this.editmodal = new Modal(this.$refs.editItemModal);
  },
};
</script>

<style lang="scss">
.modal.show {
  display: block;
}
</style>
