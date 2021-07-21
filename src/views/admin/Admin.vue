<template>
  <header class="header--front">
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
          <router-link class="nav-link text-white" to="/admin/dashboard/applies-list"
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
    <footer class="bg-gray-mid pt-8">
    <div class="footer--front bg-primary">
      <div class="container">
        <div class="row py-7">
          <div class="col-lg-4 col-12">
            <div class="d-flex flex-md-row flex-column align-items-center mb-lg-0 mb-md-6 mb-4">
              <img
                class="bg-white rounded me-md-4 mb-md-0 mb-4"
                src="../../assets/images/header/fineJobMark.svg"
                alt=""
              />
              <div class="d-flex flex-column align-items-md-stretch align-items-center">
                <h4 class="text-white mb-md-0 mb-2">Fine Job</h4>
                <p class="text-white">Jordan.ttc.design@gmail.com</p>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-12">
            <ul class="footer__nav justify-content-md-end flex-md-row flex-column">
              <li class="nav-item">
                <router-link class="nav-link text-white me-lg-0 me-2" to="/products-list"
                  >優質工作
                  <i class="text-white d-lg-none d-inline-block bi bi-arrow-right-circle"></i
                ></router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-white me-lg-0 me-2" to="/add-company"
                  >企業會員加入
                  <i class="text-white d-lg-none d-inline-block bi bi-arrow-right-circle"></i
                ></router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-white me-lg-0 me-2" to="/add-job"
                  >新建職位
                  <i class="text-white d-lg-none d-inline-block bi bi-arrow-right-circle"></i
                ></router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link text-white me-lg-0 me-2"
                  to="/admin/dashboard/products-list"
                >
                  後台管理
                  <i class="text-white d-lg-none d-inline-block bi bi-arrow-right-circle"></i
                ></router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="border-top border-gray-line py-5">
        <p class="subTxt text-white text-center">© 2021 Jordan.ttc.design</p>
      </div>
    </div>
  </footer>
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
