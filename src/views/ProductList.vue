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
    ...mapState(["allProducts", "showProducts", "currentPage"]),
    pageSize() {
      return Number(process.env.VUE_APP_PAGESIZE);
    },
  },
  components: {
    Pagination,
    Product,
  },
  methods: {
    ...mapActions(["getAllProducts", "changeCurrentPage"]),
    handleCurrentChange(val) {
      this.changeCurrentPage(val);
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>
<style lang="less">
.product_list{
    
}    
</style>
