<template>
  <Cart></Cart>
  <header class="header--front">
    <div class="container d-flex justify-content-between">
      <h1>
        <img
          class="header__logo"
          src="../../assets/images/header/fineJobLogo-whtie.svg"
          alt="logo"
        />
      </h1>
      <ul class="header__nav">
        <li class="nav-item">
          <router-link class="nav-link text-white" aria-current="page" to="/">首頁</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/products-list">優質工作</router-link>
        </li>
        <li class="nav-item ">
          <router-link class="nav-link text-white" to="/search-list">搜尋</router-link>
        </li>
        <li class="nav-item ">
          <router-link class="nav-link text-white" to="/products-list">收藏</router-link>
        </li>
        <li class="nav-item">
          <router-link class="d-flex text-white text-decoration-none" to="/add-job">
            <div class="d-flex align-items-end ">
              <p class="nav-link header__companyBtnBox">立即刊登職位！</p>
              <p class="nav-link header__companyBtnBox--sm">為您徵才</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </header>
  <!-- 有點不知道分區要不要寫在外元件 -->
  <div class="main py-4 main--bg">
    <router-view></router-view>
  </div>
  <footer class="bg-gray-mid pt-8">
    <div class="footer--front bg-primary">
      <div class="container">
        <div class="row py-7">
          <div class="col-4">
            <div class="d-flex align-items-center">
              <img
                class="bg-white rounded me-4"
                src="../../assets/images/header/fineJobMark.svg"
                alt=""
              />
              <div>
                <h4 class="text-white mb-3">Fine Job</h4>
                <p class="text-white">Jordan.ttc.design@gmail.com</p>
              </div>
            </div>
          </div>
          <div class="col-8">
            <ul class="d-flex position-reative justify-content-end align-items-center h-100">
              <li class="nav-item">
                <router-link class="nav-link text-white" aria-current="page" to="/"
                  >首頁</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-white" to="/products-list">優質工作</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-white" to="/apply-job">申請職位</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-white" to="/add-company">新建企業</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-white" to="/add-job">新建職位</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-white" to="/admin/dashboard/products-list"
                  >後台管理</router-link
                >
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
import Cart from '@/components/front/Cart.vue';
import emitter from '@/components/helpers/emitter';

export default {
  components: {
    Cart,
  },
  methods: {
    openCart() {
      emitter.emit('open-cart');
    },
  },
  created() {},
};
</script>
