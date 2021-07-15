<template>
  <header class="header--front">
    <div ref="Search" class="header--front__searchModal">
      <SearchModal></SearchModal>
    </div>
    <div class="container d-flex justify-content-between">
      <h1>
        <router-link aria-current="page" to="/"
          ><img
            class="header__logo"
            src="../../assets/images/header/fineJobLogo-white.svg"
            alt="logo"
        /></router-link>
      </h1>
      <ul class="header__nav">
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/admin/dashboard/products-list"
            >產品管理</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/admin/dashboard/products-list"
            >應徵管理</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/admin/dashboard/orders-list">
            訂單管理
          </router-link>
        </li>
        <li class="nav-item ">
          <router-link class="nav-link text-white" to="/">登出</router-link>
        </li>
      </ul>
    </div>
  </header>
  <!-- 有點不知道分區要不要寫在外元件 -->
  <div class="main pb-7 main--bg ">
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

<style lang="scss"></style>
