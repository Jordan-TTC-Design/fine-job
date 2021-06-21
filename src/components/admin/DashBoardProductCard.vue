<template>
  <tr>
    <th>{{ item.title }}</th>
    <th width="120">{{ item.origin_price }}</th>
    <th width="120">{{ item.price }}</th>
    <th width="150">
      <div class="form-check form-switch">
        <input
          type="checkbox"
          class="form-check-input"
          :id="item.id"
          :data-id="item.id"
          :checked="item.is_enabled > 0 ? true : false"
          @change="$emit('change-product-state', item.id)"
        />
        <label class="form-check-label" :for="item.id">{{
          item.is_enabled > 0 ? '啟動' : '未啟動'
        }}</label>
      </div>
    </th>
    <th width="120">
      <button
        type="button"
        class="btn btn-sm btn-outline-primary move mr-1"
        data-action="editProduct"
        :data-id="item.id"
        @click="$emit('open-modal', $event, item)"
      >
        編輯
      </button>
      <button
        type="button"
        class="btn btn-sm btn-danger move"
        data-action="deleteProduct"
        :data-id="item.id"
        @click="$emit('open-modal', $event, item)"
      >
        刪除
      </button>
    </th>
  </tr>
</template>

<script>

export default {
  props: ['item'],
  methods: {
    deleteProduct() {
      const { id } = this.temProduct;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          console.log(res);
          this.getProductData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

};
</script>

<style lang="scss"></style>
