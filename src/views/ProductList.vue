<template>
  <div class="product_list">
    <Product :dataSource="showProducts" />
    <Pagination
      :total="allProducts.length"
      :pagesize="pageSize"
      :currentPage="currentPage"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Pagination from "@/components/Pagination";
import Product from "@/components/Product";

export default {
  name: "ProductList",
  computed: {
    ...mapState([
      "allProducts",
      "showProducts",
      "currentPage",
      "showSearchBar",
      "showSorting",
      "showFilter",
    ]),
    pageSize() {
      return Number(process.env.VUE_APP_PAGESIZE);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.showSearchBar) {
        vm.changeShowSearchBar(true);
      }
      if (!vm.showSorting) {
        vm.changeShowSorting(true);
      }
      if (!vm.showFilter) {
        vm.changeShowFilter(true);
      }
    });
  },
  components: {
    Pagination,
    Product,
  },
  methods: {
    ...mapActions([
      "getAllProducts",
      "changeCurrentPage",
      "changeShowSearchBar",
      "changeShowSorting",
      "changeShowFilter",
    ]),
    handleCurrentChange(val) {
      this.changeCurrentPage(val);
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>

