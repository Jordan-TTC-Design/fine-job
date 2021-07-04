<template>
  <div ref="newJobModal" class="modal fade" tabindex="-1" aria-labelledby="newJobModalLabel">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="newJobModalLabel" class="modal-title">
            <span>新建職位</span>
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
                  v-model="jobData.options.job.jobName"
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
                  v-model="jobData.name"
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
                  v-model="jobData.tel"
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
                  v-model="jobData.email"
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
              <img class="img-fluid" alt="" :src="jobData.options.company.companyLogoUrl" />
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
                    v-model.number="jobData.options.job.salary"
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
                  :key="'workTime' + index"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    :value="item"
                    :id="'workTime' + index"
                    :name="item"
                    v-model="jobData.options.job.workTime"
                  />
                  <label class="form-check-label" :for="'workTime' + index">
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
                  :key="'workType' + index"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    :value="item"
                    :id="'workType' + index"
                    :name="item"
                    v-model="jobData.options.job.workType"
                  />
                  <label class="form-check-label" :for="'workType' + index">
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
                  v-model.number="jobData.options.job.needPerson"
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="jobImageUrl">職位圖片</label>
                <input
                  id="jobImageUrl"
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model="jobData.options.job.jobImageUrl"
                />
              </div>
              <img class="img-fluid" alt="" :src="jobData.options.job.jobImageUrl" />
            </div>
            <div class="col-12">
              <div class="row">
                <!-- <div class="form-group col-md-6">
                  <label for="公司行業類別">行業類別</label>
                  <select
                    name="公司行業類別"
                    id="newCompanyIndustryCategory"
                    class="form-control form-select"
                    v-model="jobData.options.company.industryCategory"
                  >
                    <option :value="jobData.options.company.industryCategory" selected>
                      {{ jobData.options.company.industryCategory }}</option
                    >
                    <option v-for="item in industryCategory" :value="item" :key="item"
                      >{{ item }}
                    </option>
                  </select>
                </div> -->
                <div class="form-group col-md-6">
                  <label for="公司職位類別">職位類別</label>
                  <select
                    name="公司職位類別"
                    id="jobCategory"
                    class="form-control form-select"
                    v-model="jobData.options.job.jobCategory"
                  >
                    <option :value="jobData.options.job.jobCategory" selected>
                      {{ jobData.options.job.jobCategory }}</option
                    >
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
                      :checked="jobData.options.job.costToken > 0 ? true : false"
                      @change="changeProductState"
                      name="jobLevel"
                      id="jobLevel"
                    />
                    <label class="form-check-label" for="jobLevel">
                      {{
                        jobData.options.job.costToken > 0 ? '付費推廣(時效七天)' : '免費職位刊登'
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
                      v-model="jobData.options.job.jobContent"
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
                      :key="'workExp' + index"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        :value="item"
                        :id="'workExp' + index"
                        :name="item"
                        v-model="jobData.options.job.workExp"
                      />
                      <label class="form-check-label" :for="'workExp' + index">
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
                      :key="'education' + index"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        :value="item"
                        :id="'education' + index"
                        :name="item"
                        v-model="jobData.options.job.education"
                      />
                      <label class="form-check-label" :for="'education' + index">
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
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="processNewJobData">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';
import { Modal } from 'bootstrap';
import webData from '@/components/helpers/webData';

export default {
  props: ['temJob'],
  data() {
    return {
      modal: '',
      formData: {},
      temItemData: {},
      jobData: {
        options: {
          company: { companyLogoUrl: [] },
          job: {},
        },
      },
    };
  },
  methods: {
    // updateProduct() {
    //   this.$emit('update-product', this.temItemData);
    // },
    changeProductState() {
      if (this.jobData.options.job.costToken > 0) {
        this.jobData.options.job.costToken = 0;
        this.jobData.options.company.companyJobToken += 1;
      } else {
        this.jobData.options.job.costToken = 1;
        this.jobData.options.company.companyJobToken -= 1;
      }
    },
    processNewJobData() {
      const temObj = this.jobData;
      const newJobItem = {
        data: {
          title: temObj.options.job.jobName,
          category: temObj.options.job.jobCategory,
          origin_price: temObj.options.job.salary,
          price: temObj.options.job.salary,
          unit: '元',
          description: '職位',
          content: temObj.options.job.jobContent,
          is_enabled: 1,
          imageUrl: temObj.options.job.jobImageUrl,
          imagesUrl: [],
          num: temObj.options.job.needPerson,
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
              companyContact: temObj.name,
              contactPosition: temObj.options.company.contactPosition,
              companyTel: temObj.tel,
              companyEmail: temObj.email,
              companyJobToken: temObj.options.jobToken,
            },
            job: {
              otherRequirement: temObj.options.job.otherRequirement,
              workExp: temObj.options.job.workExp,
              workType: temObj.options.job.workType,
              workTime: temObj.options.job.workTime,
              education: temObj.options.job.education,
              salaryInterView: temObj.options.job.salaryInterView,
              promote: temObj.options.job.costToken,
              create: Math.floor(Date.now() / 1000),
            },
          },
        },
      };
      console.log(newJobItem);
      // this.newCompany(newCompanyitem);
      this.$emit('new-job', newJobItem);
      this.closeModal();
      this.temItemData = {};
      this.jobData = {
        options: {
          company: { companyLogoUrl: [] },
          job: {},
        },
      };
    },

    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  watch: {
    temJob: {
      deep: true,
      handler(newValue) {
        [this.temItemData] = newValue;
        this.jobData = newValue[0].user;
        console.log(this.temItemData);
      },
    },
  },
  created() {
    this.temItemData = this.temJob;
    this.formData = webData;
    emitter.on('close-new-job', () => {
      this.closeModal();
    });
    emitter.on('open-new-job', () => {
      this.openModal();
    });
  },
  mounted() {
    console.log(this.$refs.newJobModal);
    this.modal = new Modal(this.$refs.newJobModal);
  },
};
</script>

<style lang="scss">
.modal.show {
  display: block;
}
</style>
