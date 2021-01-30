<template>
  <div class="search_bar" :lg="6">
    <el-input
      class="keyword"
      placeholder="search by id"
      v-model="keyword"
    ></el-input>
    <el-button type="primary" @click="search">search</el-button>
    <el-alert
      v-if="showWarning"
      title="please input product ID"
      type="warning"
      @close="close"
      show-icon
    >
    </el-alert>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SearchBar",
  data() {
    return {
      keyword: "",
      showWarning: false,
    };
  },
  methods: {
    ...mapActions([
      "searchById",
      "changeSelectedCategory",
      "changeSortingValue",
    ]),
    async search() {
      if (this.keyword.length === 0) {
        this.showWarning = true;
        return;
      }
      //   this.products = [];
      //   let product = await this.$axios(`/products/${this.keyword}`);
      //   this.products.push(product);
      this.searchById(this.keyword);
      this.changeSelectedCategory("");
      this.changeSortingValue("");
      this.keyword = "";
    },
    close() {
      this.showWarning = false;
    },
  },
  watch: {
    keyword() {
      if (this.keyword.length > 0) {
        this.showWarning = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search_bar {
  .el-input {
    width: 65%;
  }
  .el-button {
    margin-left: 2%;
    width: 30%;
  }
}
</style>
