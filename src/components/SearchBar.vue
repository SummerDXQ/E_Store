<template>
  <div class="search_bar" :lg="6">
    <el-input
      class="keyword"
      placeholder="search product"
      v-model="keyword"
      @keyup.enter.native="search"
    ></el-input>
    <el-button @click="search">SEARCH</el-button>
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
import { mapActions } from "vuex";

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
    .el-input__inner {
      border-radius: 0;
      background: #f7f7f9;
    }
  }
  .el-button {
    margin-left: 5px;
    width: 25%;
    color: #4bbf73;
    border-color: #4bbf73;
    background-color: #343a40;
    font-size: 12px;
    border-width: 2px;
    border-radius: 0;
    font-weight: 500;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
