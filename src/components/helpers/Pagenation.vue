<template>
  <div class="container" v-if="paginationData.total_pages.length > 1">
    <div class="d-flex justify-content-center pt-5">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: !paginationData.has_pre }">
            <button
              type="button"
              class="page-link"
              aria-label="Previous"
              @click="changePage('pre')"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li v-for="item in paginationData.total_pages" :key="item" class="page-item">
            <button class="page-link" :data-num="item" @click="jumpPage(item)" type="button">
              {{ item }}
            </button>
          </li>
          <li class="page-item" :class="{ disabled: !paginationData.has_next }">
            <button type="button" class="page-link" aria-label="Next" @click="changePage('next')">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ['jobsList'],
  data() {
    return {
      paginationData: {
        total_pages: [],
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
    };
  },
  methods: {
    jumpPage(num) {
      this.paginationData.current_page = num;
      this.checkPagination();
    },
    changePage(action) {
      if (action === 'next' && this.paginationData.has_next) {
        this.paginationData.current_page += 1;
      } else if (action === 'pre' && this.paginationData.has_pre) {
        this.paginationData.current_page -= 1;
      }
      this.checkPagination();
    },
    checkPagination() {
      this.paginationData.total_pages = [];
      //   多少產品一頁
      const totalPageNum = Math.ceil(this.temList.length / 10);
      for (let i = 1; i <= totalPageNum; i += 1) {
        this.paginationData.total_pages.push(i);
      }
      if (totalPageNum > this.paginationData.current_page && this.paginationData.current_page > 1) {
        this.paginationData.has_next = true;
        this.paginationData.has_pre = true;
      } else if (this.paginationData.current_page === 1) {
        this.paginationData.has_next = true;
        this.paginationData.has_pre = false;
      } else if (this.paginationData.current_page === totalPageNum) {
        this.paginationData.has_next = false;
        this.paginationData.has_pre = true;
      }
      this.$emit('change-page', this.paginationData.current_page);
    },
  },
  watch: {
    jobsList: {
      deep: true,
      handler(newValue) {
        this.paginationData.current_page = 1;
        this.temList = newValue;
        this.checkPagination();
      },
    },
  },
  created() {
    this.temList = this.jobsList;
  },
};
</script>

<style lang="scss"></style>
