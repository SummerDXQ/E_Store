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
  // data(){
  //   return{
  //     loading:true
  //   }
  // },
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
    // currentPage:{
    //   get(){
    //     this.$store.state.currentPage;
    //   },
    //   set(value){
    //     console.log("set",value)
    //     return value;
    //   }
    // }
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
  // mounted(){
  //   // this.loading=false;
  // }
  // watch: {
  //   currentPage: {
  //     handler() {
  //       console.log(arguments);
  //       console.log("页码改变");
  //     },
  //   },
  // },
};
</script>
