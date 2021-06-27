<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <h2 class="text-center">新建職位</h2>
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
          <div class="mb-3" v-if="this.form.options.tokens > 0">
            <label class="form-label d-block">是否要升級成為付費推廣職位</label>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="sendFormInfoCostToken"
                v-model="this.form.options.costToken"
              />
              <label class="form-check-label" for="sendFormInfoCostToken"
                >使用一個職位額度升級，時效七天</label
              >
              <p>剩餘職位刊登額度：{{ form.options.tokens }}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoJobName" class="form-label">職位名稱</label>
            <Field
              id="sendFormInfoJobName"
              name="職位名稱"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['職位名稱'] }"
              placeholder="請輸入職位名稱"
              rules="required"
              v-model="form.options.job.jobName"
              ref="sendFormInfoJobName"
            ></Field>
            <ErrorMessage name="職位名稱" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoNeedPerson" class="form-label">需求人數</label>
            <Field
              id="sendFormInfoNeedPerson"
              name="需求人數"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors['需求人數'] }"
              min="1"
              v-model.number="form.options.job.needPerson"
              ref="sendFormInfoNeedPerson"
            ></Field>
            <ErrorMessage name="需求人數" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoJobCategory" class="form-label">職位類別</label>
            <Field
              name="職位類別"
              as="select"
              id="sendFormInfoJobCategory"
              class="form-control form-select"
              :class="{ 'is-invalid': errors['職位類別'] }"
              rules="required"
              v-model="form.options.job.jobCategory"
              ref="sendFormInfoJobCategory"
            >
              <option value="" disabled selected>選擇職位類別</option>
              <option value="經營、人資類">經營、人資類</option>
              <option value="行政、總務、法務類">行政、總務、法務類</option>
              <option value="財會、金融專業類">財會、金融專業類</option>
              <option value="行銷、企劃、專案管理類">行銷、企劃、專案管理類</option>
              <option value="客服、門市、業務、貿易類">客服、門市、業務、貿易類</option>
              <option value="餐飲、旅遊、美容美髮類">餐飲、旅遊、美容美髮類</option>
              <option value="資訊轉體系統類">資訊轉體系統類</option>
              <option value="操作、技術、維修類">操作、技術、維修類</option>
              <option value="資材、物流、運輸類">資材、物流、運輸類</option>
              <option value="營建、製圖類">營建、製圖類</option>
              <option value="傳播藝術、設計類">傳播藝術、設計類</option>
              <option value="文字、傳媒類">文字、傳媒類</option>
              <option value="醫療、保健服務類">醫療、保健服務類</option>
              <option value="學術、教育、輔導類">學術、教育、輔導類</option>
              <option value="研發類">研發類</option>
              <option value="生產製造、品管、環衛類">生產製造、品管、環衛類</option>
              <option value="軍警消、保全類">軍警消、保全類</option>
              <option value="其他類">其他類</option>
            </Field>
            <ErrorMessage name="職位類別" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoSalary" class="form-label">薪資</label>
            <Field
              id="sendFormInfoSalary"
              name="薪資"
              type="number"
              placeholder="請輸入"
              class="form-control"
              :class="{ 'is-invalid': errors['薪資'] }"
              min="1"
              v-model.number="form.options.job.salary"
              ref="sendFormInfoSalary"
            ></Field>
            <ErrorMessage name="薪資" class="invalid-feedback"></ErrorMessage>
            <div class="form-check">
              <input
                id="sendFormInfoSalaryInterView"
                name="薪資"
                class="form-check-input"
                type="checkbox"
                v-model="form.options.job.salaryInterView"
              />

              <label class="form-check-label" for="sendFormInfoSalaryInterView">
                面議
              </label>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label d-block">工作經驗</label>
            <div class="btn-group" role="group">
              <div
                class="form-check"
                v-for="(item, index) in form.options.job.workExp"
                :key="index"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  :value="item"
                  :id="'workExp' + index"
                  :name="item"
                  v-model="form.options.job.workExpChoose"
                />
                <label class="form-check-label" :for="'workExp' + index">
                  {{ item }}
                </label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label d-block">上班時段</label>
            <div class="btn-group" role="group">
              <div
                class="form-check"
                v-for="(item, index) in form.options.job.workTime"
                :key="index"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  :value="item"
                  :id="'workTime' + index"
                  :name="item"
                  v-model="form.options.job.workTimeChoose"
                />
                <label class="form-check-label" :for="'workTime' + index">
                  {{ item }}
                </label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label d-block">學歷要求</label>
            <div class="btn-group" role="group">
              <div
                class="form-check"
                v-for="(item, index) in form.options.job.education"
                :key="index"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  :value="item"
                  :id="'education' + index"
                  :name="item"
                  v-model="form.options.job.educationChoose"
                />
                <label class="form-check-label" :for="'education' + index">
                  {{ item }}
                </label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoOtherRequirement" class="form-label">其他自訂條件</label>
            <Field
              id="sendFormInfoOtherRequirement"
              name="其他自訂條件"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['其他自訂條件'] }"
              placeholder="請輸入"
              v-model="form.options.job.otherRequirement"
              ref="sendFormInfoOtherRequirement"
              cols="30"
              rows="10"
              as="textarea"
              rules="required"
            ></Field>
            <ErrorMessage name="其他自訂條件" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label class="form-label d-block">工作性質</label>
            <div class="btn-group" role="group">
              <div
                class="form-check"
                v-for="(item, index) in form.options.job.workType"
                :key="index"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  :value="item"
                  :id="'workType' + index"
                  :name="item"
                  v-model="form.options.job.workTypeChoose"
                />
                <label class="form-check-label" :for="'workType' + index">
                  {{ item }}
                </label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoJobContent" class="form-label">職位內容</label>
            <Field
             id="sendFormInfoJobContent"
              name="職位內容"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['職位內容'] }"
              placeholder="請輸入"
              v-model="form.options.job.jobContent"
              ref="sendFormInfoJobContent"
              cols="30"
              rules="required"
              as="textarea"
              rows="10"
            >
            </Field>
            <ErrorMessage name="職位內容" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="sendFormInfoCompanyAddress" class="form-label">公司地址</label>
            <div class="d-flex">
              <div class=" flex-shrink-1 me-2">
                <Field
                  name="公司地址縣市"
                  as="select"
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

          <button type="submit" class="btn btn-primary">送出資料</button>
          <!-- <button type="button" class="btn btn-primary" @click="checkFile">上傳照片</button> -->
        </Form>
      </div>
    </div>
  </div>
  <!-- <ImageCropper @emit-send-img-data="getImg"></ImageCropper> -->
</template>

<script>
import emitter from '@/components/helpers/emitter';
// import Cropper from 'cropperjs';
// import ImageCropper from '@/components/ImageCropperModal.vue';

export default {
  //   components: { ImageCropper },
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
          pageAction: 'add-job',
          job: {
            jobName: '',
            needPerson: 1,
            salary: null,
            salaryInterView: false,
            jobCategory: '',
            jobContent: '',
            jobImageUrl: '',
            educational: '',
            education: ['不限', '高中職', '大學', '碩士', '博士'],
            educationChoose: '',
            workExp: ['不限', '一年以下', '1~3年', '3~5年', '5年以上'],
            workExpChoose: '',
            workTime: ['日班', '夜班', '假日班'],
            workTimeChoose: '',
            workType: ['全職', '兼職', '實習'],
            workTypeChoose: '',
            relatedAreas: '',
            otherRequirement: '',
          },
          companyName: '',
          costToken: false,
          tokens: 10,
          premoteJob: false,
        },
      },
      formState: false,
      imageSrc: '',
      cropper: {},
      temImage: [''],
      temImageInputs: [''],
    };
  },
  methods: {
    checkLog() {
      console.log(this.form.options.costToken);
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
      this.temImages.push('');
      this.temImageInputs.push('');
    },
    deleteImageUrl() {
      this.temImages.pop('');
      this.temImageInputs.pop('');
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
    emitter.emit('close-imageCropper');
  },
};
</script>

<style lang="scss">
.inpuFile {
  display: none;
}
.cropImg {
  max-width: 320px;
  max-height: 180px;
  overflow: hidden;
}
</style>
