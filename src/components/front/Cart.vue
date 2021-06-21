<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="cartModal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">購物車</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="cartbox">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">產品數量</th>
                  <th scope="col">產品價格</th>
                  <th scope="col">動作</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="cartList">
                  <tr v-for="cart in cartList" :key="cart.id">
                    <td>{{ cart.product.title }}</td>
                    <td class="d-flex">
                      <input
                        type="number"
                        class="form-control w-auto me-1"
                        v-model.number="cart.qty"
                        min="1"
                      /><button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="updateCart(cart)"
                      >
                        更新購物車
                      </button>
                    </td>
                    <td>{{ cart.product.price * cart.qty }} 元</td>
                    <td>
                      <div class="btn-group" role="group">
                        <button
                          type="button"
                          class="btn btn-outline-primary"
                          @click="deleteCartProduct(cart.id)"
                        >
                          移除
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="4">目前購物車沒東西～</td>
                  </tr>
                </template>
              </tbody>
              <tfoot>
                <tr>
                  <td>總共 {{ cartTotal }} 元</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" @click="deleteCart">
            清空購物車
          </button>
          <router-link
            to="/cart-checkout"
            type="button"
            class="btn btn-outline-primary"
            @click="closeCart"
          >
            結帳
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/components/helpers/emitter';
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      modal: {},
      cartList: [],
      cartTotal: null,
      cartState: false,
    };
  },
  methods: {
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
    deleteCartProduct(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
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
    updateCart(item) {
      const product = { data: { product_id: item.product.id, qty: item.qty } };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .put(url, product)
        .then((res) => {
          console.log(`${res.data.message}`);
          this.getCart();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeCart() {
      this.modal.hide();
    },
    openCart() {
      this.modal.show();
    },
  },
  watch: {
    carts() {
      if (this.carts.length > 0) {
        this.cartState = true;
      } else {
        this.cartState = false;
      }
      console.log(this.cartState);
      emitter.emit('sendCartState', this.cartState);
    },
  },
  created() {
    emitter.on('get-cart', () => {
      this.getCart();
    });
    emitter.on('close-cart', () => {
      this.closeCart();
    });
    emitter.on('open-cart', () => {
      this.openCart();
    });
  },
  mounted() {
    this.getCart();
    this.modal = new Modal(this.$refs.cartModal);
  },
};
</script>

<style lang="scss">
</style>
