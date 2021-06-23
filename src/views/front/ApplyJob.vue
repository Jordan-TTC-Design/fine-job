<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <h2 class="text-center">申請職位</h2>
        <Form ref="customerInfoForm" v-slot="{ errors }" @submit="checkCart">
          <div class="mb-3">
            <label for="costumerInfoName" class="form-label">姓名</label>
            <Field
              id="costumerInfoName"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
              ref="costumerInfoName"
            ></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="costumerInfoEmail" class="form-label">Email</label>
            <Field
              id="costumerInfoEmail"
              name="Email"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['Email'] }"
              placeholder="請輸入Email"
              rules="email|required"
              v-model="form.user.email"
              ref="costumerInfoName"
            ></Field>
            <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="costumerInfoTel" class="form-label">電話</label>
            <Field
              id="costumerInfoTel"
              name="電話"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              rules="required"
              v-model="form.user.tel"
              ref="costumerInfoTel"
            ></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="costumerInfoAddress" class="form-label">地址</label>
            <Field
              id="costumerInfoAddress"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
              ref="costumerInfoAddress"
            ></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="costumerInfoMessage" class="form-label">留言</label>
            <Field
              id="costumerInfoMessage"
              name="留言"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['留言'] }"
              placeholder="請輸入"
              v-model="form.message"
              ref="costumerInfoMessage"
              cols="30"
              rows="10"
            ></Field>
            <ErrorMessage name="留言" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="costumerInfoCall" class="form-label">call</label>
            <Field
              id="costumerInfoCall"
              name="call"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['call'] }"
              placeholder="請輸入"
              v-model="form.options.call"
              ref="costumerInfoCall"
            ></Field>
            <ErrorMessage name="call" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="costumerInfoPersonalImg" class="form-label">求職照片</label>
            <div class="input-group">
              <input
                id="costumerInfoPersonalImg"
                name="求職照片"
                type="file"
                class="form-control"
                :class="{ 'is-invalid': errors['求職照片'] }"
                placeholder="請選擇照片上傳"
                ref="costumerInfoPersonalImg"
              />
              <button type="button" class="btn btn-primary" @click="checkFile($event)">
                上傳照片
              </button>
            </div>
            <!-- <ErrorMessage name="求職照片" class="invalid-feedback"></ErrorMessage> -->
          </div>
          <div class="imageBtnBox">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm d-block w-100 my-2"
              @click="addImageUrl()"
            >
              新增圖片
            </button>
          </div>
          <div v-if="form.options.imagesUrl.length > 0">
            <div v-for="(item, index) in form.options.imagesUrl" :key="'costumerInfoImgs' + index">
              <div class="form-group">
                <label for="imageUrl">請選擇第 {{ index + 1 }} 張圖片檔案</label>
                <div class="input-group">
                  <input
                    :id="'costumerInfoImgs' + index"
                    name="求職照片"
                    type="file"
                    class="form-control"
                    :class="{ 'is-invalid': errors[`求職照片${index}`] }"
                    placeholder="請選擇照片上傳"
                    :ref="'costumerInfoImgs' + index"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="checkFile($event)"
                    :data-id="index"
                    data-action="uploadImgs"
                  >
                    上傳照片
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="form.options.imagesUrl.splice(index, 1)"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <p>連結：{{item}}</p>
              <img class="img-fluid" alt="" :src="item" />
            </div>
          </div>
          <div class="mb-3">
            <label for="costumerInfoCV" class="form-label">履歷連結</label>
            <Field
              id="costumerInfoCV"
              name="履歷連結"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['履歷連結'] }"
              placeholder="請輸入履歷連結"
              v-model="form.options.cvLink"
              ref="costumerInfoCV"
            ></Field>
            <ErrorMessage name="履歷連結" class="invalid-feedback"></ErrorMessage>
          </div>
          <button type="submit" class="btn btn-primary">送出資料</button>
          <!-- <button type="button" class="btn btn-primary" @click="checkFile">上傳照片</button> -->
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';

export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
        options: {
          pageAction: 'apply-job',
          nowjobTitle: '待業',
          personalImg: null,
          imagesUrl: [],
        },
      },
      token: '',
      cartState: false,
      isLogin: false,
    };
  },
  methods: {
    checkFile(e) {
      const nowAction = e.target.dataset.action;
      const nowId = e.target.dataset.id;
      console.log(nowAction);
      const file = this.$refs.costumerInfoPersonalImg.files[0];
      const formData = new FormData();
      formData.append('PersonalImg', file);
      this.uploadFile(formData, nowAction, nowId);
    },
    uploadFile(formData, nowAction, nowId) {
      // const imgurToken = 'Client-ID 4ef4ca52de4b42c';
      // const url = 'https://api.imgur.com/3/image';
      this.$http({
        method: 'POST',
        url: 'https://api.imgur.com/3/upload',
        data: formData,
        headers: {
          Authorization: 'Client-ID ef6e862acf052df',
        },
        mimeType: 'multipart/form-data',
      })
        .then((res) => {
          console.log(res.data);
          // console.log(res.data.data.link);
          if (nowAction !== 'uploadImgs') {
            this.options.personalImg = res.data.data.link;
          } else {
            this.options.imagesUrl[nowId] = res.data.data.link;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    checkCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.data.carts) {
            this.cartState = true;
            this.sendForm();
          } else {
            this.cartState = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendForm() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      if (this.cartState === false) {
        console.log('沒東西');
      } else {
        const formData = {
          data: this.form,
        };
        this.$http
          .post(url, formData)
          .then((res) => {
            console.log(`${res.data.message}`);
            console.log(res);
            // this.getCart();
            this.$router.push('/');
            // 不知道怎清空
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    addImageUrl() {
      this.form.options.imagesUrl.push('');
    },
    deleteImageUrl() {
      this.form.options.imagesUrl.pop();
    },
  },
  created() {
    // emitter.on('sendCartState', (data) => {
    //   this.cartState = data;
    // });
    // console.log(this.$refs);
  },
  mounted() {
    emitter.emit('close-cart');
  },
};
</script>

<style lang="scss"></style>
