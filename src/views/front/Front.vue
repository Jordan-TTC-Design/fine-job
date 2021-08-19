<template>
  <header class="header header--front">
    <div ref="Search" class="header__searchModal">
      <SearchModal />
    </div>
    <div class="container d-flex justify-content-between align-items-center">
      <h1>
        <router-link aria-current="page" to="/"
          ><img
            class="header__logo"
            src="@/assets/images/header/fineJobLogo-white.svg"
            alt="Fine Job logo"
        /></router-link>
      </h1>
      <div class="header__navBox" ref="headerNavBox">
        <ul class="header__nav" ref="headerNav">
          <li class="nav-item" :class="{ active: this.navState === '首頁' }">
            <router-link class="nav-link text-white" aria-current="page" to="/">首頁</router-link>
          </li>
          <li class="nav-item" :class="{ active: this.navState === '優質工作' }">
            <router-link class="nav-link text-white" to="/products-list">優質工作</router-link>
          </li>
          <li class="nav-item d-lg-block d-none">
            <button class="nav-link text-white btn" type="button" @click="openSearchModal">
              搜尋
            </button>
          </li>
          <li class="nav-item" :class="{ active: this.navState === '收藏' }">
            <router-link class="nav-link text-white" to="/collection">收藏</router-link>
          </li>
          <li class="nav-item d-lg-none d-block">
            <router-link class="nav-link text-white" to="/add-company">企業會員加入</router-link>
          </li>
          <li class="nav-item d-lg-none d-block">
            <router-link class="nav-link text-white" to="/add-job">新建職位</router-link>
          </li>
          <li class="nav-item company d-lg-block d-none">
            <router-link class="d-flex text-white text-decoration-none" to="/add-job">
              <div class="d-flex align-items-end position-relative">
                <p class="nav-link header__companyBtnBox">立即刊登職位！</p>
                <p class="nav-link header__companyBtnBox--sm">為您徵才</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="bgCover menuCover" ref="menuCover" @click="openRwdMenu"></div>
      <div class="d-flex d-lg-none">
        <div class="hamburgerMenu d-flex me-2" @click="openSearchModal" ref="headerSearchIcon">
          <i class="jobIcon bi bi-search"></i>
        </div>
        <div class="hamburgerMenu d-flex" @click="openRwdMenu">
          <i class="jobIcon bi bi-list"></i>
        </div>
      </div>
    </div>
  </header>
  <!-- 有點不知道分區要不要寫在外元件 -->
  <div class="main main--bg" ref="main">
    <router-view></router-view>
  </div>
  <footer class="bg-gray-mid">
    <div class="footer--front bg-primary">
      <div class="container">
        <div class="row py-7">
          <div class="col-lg-4 col-12">
            <div class="d-flex flex-md-row flex-column align-items-center mb-lg-0 mb-md-6 mb-4">
              <img
                class="bg-white rounded me-md-4 mb-md-0 mb-4"
                src="../../assets/images/header/fineJobMark.svg"
                alt="Find Job Mark"
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
import SearchModal from '@/components/front/SearchModal.vue';

export default {
  components: {
    SearchModal,
  },
  data() {
    return {
      navState: '',
    };
  },
  methods: {
    checkNavState() {
      if (this.$route.path === '/') {
        this.navState = '首頁';
      } else if (this.$route.path === '/products-list') {
        this.navState = '優質工作';
      } else if (this.$route.path === '/collection') {
        this.navState = '收藏';
      } else {
        this.navState = '';
      }
    },
    openRwdMenu() {
      this.$refs.headerNavBox.classList.toggle('active');
      this.$refs.menuCover.classList.toggle('active');
      this.$refs.main.classList.toggle('openRwdMenu');
      this.$refs.headerSearchIcon.classList.toggle('d-none');
      this.$refs.Search.classList.remove('active');
    },
    closeRwdMenu() {
      this.$refs.headerNavBox.classList.remove('active');
      this.$refs.menuCover.classList.remove('active');
      this.$refs.main.classList.remove('openRwdMenu');
      this.$refs.headerSearchIcon.classList.remove('d-none');
    },
    openSearchModal() {
      this.$refs.Search.classList.toggle('active');
    },
    closeSearchModal() {
      this.$refs.Search.classList.remove('active');
    },
  },
  mounted() {
    this.checkNavState();
    this.closeSearchModal();
    this.closeRwdMenu();
  },
  updated() {
    this.checkNavState();
    this.closeSearchModal();
    this.closeRwdMenu();
  },
};
</script>
