<template>
  <div class="container-fuild">
    <h2 class="text-center mb-4">單一產品</h2>
    <div v-if="isExist" class="productPage-container">
      <p>{{ product.title }}</p>
    </div>
    <div v-else-if="isExist == false" class="cantFoundProduct">
        <h5>找不到產品</h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      isExist: null,
    };
  },
  methods: {
    getProductData() {
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.isExist = true;
            // console.log(res);
            this.product = res.data.product;
          } else {
            this.isExist = false;
          }
        //   console.log(this.isExist);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    // console.log(this.$route.params.id);
    this.getProductData();
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
