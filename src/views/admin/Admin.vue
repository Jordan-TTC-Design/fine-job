<template>
    <header class="bg-light">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/">Navbar</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" aria-current="page"
                to="/admin/dashboard/products-list">全部產品</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/dashboard/orders-list">全部訂單</router-link>
              </li>
              <!-- <li class="nav-item">
                <a class="nav-link" href="#">購物車</a>
              </li> -->
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <!-- 有點不知道分區要不要寫在外元件 -->
  <div class="main py-4">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      token: '',
    };
  },
  methods: {
    getToken() {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = this.token;
    },
    checkLogin() {
      this.getToken();
      const api = `${process.env.VUE_APP_API}/api/user/check`;
      this.$http.post(api, { api_token: this.token }).then((res) => {
        if (res.data.success) {
          this.isLogin = true;
          // console.log(res);
        } else {
          // console.log(res);
          this.$router.push('/admin');
        }
      });
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>

<style lang="scss">

</style>
