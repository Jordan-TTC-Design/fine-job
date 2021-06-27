<template>
  <Cart></Cart>
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
            <ul class="navbar-nav position-reative">
              <li class="nav-item">
                <router-link class="nav-link" aria-current="page" to="/">首頁</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/products-list">全部產品</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/apply-job">申請職位</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/add-company">新建企業</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/add-job">新建職位</router-link>
              </li>
              <li class="position-absolute end-0">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="openCart"
                >
                  購物車
                </button>
                <!-- 直接使用@click="emitter.emit('open-cart')" 好像不行 -->
                <!-- <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="emitter.emit('open-cart')"
                >
                  購物車
                </button> -->
              </li>
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
  created() {
  },
};
</script>
