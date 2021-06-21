<template>
  <div class="container-fuild">
    <div class="row justify-content-center">
      <div class="col-4 mt-4">
        <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              v-model="username"
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="password"
            />
            <label for="password">Password</label>
          </div>
          <button type="button" class="btn btn-lg btn-primary w-100 mt-3" @click="login">
            登入
          </button>
        </form>
        <p class="mt-5 mb-3 text-muted text-center">&copy; 2021~∞ - 六角學院</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      const user = {
        username: this.username,
        password: this.password,
      };
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, user)
        .then((res) => {
          console.log(res);
          const { data } = res;
          if (data.success === true) {
            // 加入token
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
            console.log('登入成功');
            this.$router.push('/admin/dashboard/products-list');
            // this.username = '';
            // this.password = '';
          } else {
            console.log('登入失敗');
            this.username = '';
            this.password = '';
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {},
};
</script>

<style lang="scss"></style>
