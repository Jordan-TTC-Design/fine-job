<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <h2 class="text-center">結帳</h2>
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
          <button type="submit" class="btn btn-primary">送出資料</button>
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
          call: '',
        },
      },
      apiData: {
        apiUrl: 'https://vue3-course-api.hexschool.io',
        api: 'jordanttcdesign',
      },
      cartState: false,
    };
  },
  methods: {
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
  },
  created() {
    // emitter.on('sendCartState', (data) => {
    //   this.cartState = data;
    // });
    console.log(this.$refs);
  },
  mounted() {
    emitter.emit('close-cart');
  },
};
</script>

<style lang="scss"></style>
