<template>
  <header class="header">
    <el-row>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="logo">
        <span>E_STORE</span>
      </el-col>
       <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="logo">
        <router-link to="/cart">Cart</router-link>
      </el-col>
      <el-col :xs="3" :sm="3" :md="6" :lg="6" :xl="6" class="search_bar">
        <SearchBar />
      </el-col>
      <el-col :xs="3" :sm="3" :md="6" :lg="6" :xl="6" class="sort">
        <el-select v-model="sortingvalue" placeholder="sort by price">
          <el-option
            v-for="item in sortOptions"
            :key="item"
            :label="item === 'asc' ? 'low to hight' : 'high to low'"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="3" :sm="3" :md="6" :lg="6" :xl="6" class="filter">
        <el-select v-model="selectedCategory" placeholder="filter by category">
          <el-option
            v-for="item in categories"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      sortOptions: ["asc", "desc"],
      //   selectedCategory: "",
      //   sortValue: "",
      // categories:[]
    };
  },
  components: {
    SearchBar,
  },
  computed: {
    ...mapState(["categories", "sortingvalue"]),
    selectedCategory: {
      get() {
        return this.$store.state.selectedCategory;
      },
      set(value) {
          console.log(value)
        this.changeSelectedCategory(value);
        this.filterByCategory(value);
        // console.log(value);
        // return value;
      },
    },
    sortingvalue: {
      get() {
        return this.$store.state.sortingvalue;
      },
      set(value) {
          
        this.changeSortingValue(value);
        this.sortProduct(value);
        // console.log(value);
        // return value;
      },
    },
  },
  methods: {
    ...mapActions([
      "getAllCategories",
      "sortProduct",
      "filterByCategory",
      "changeSelectedCategory",
      "changeSortingValue",
    ]),
  },
  created() {
    // console.log("getAllCategories");
    this.getAllCategories();
  },
  watch: {
    sortValue() {
      //   console.log("拍讯", this.sortValue);

      console.log("sortValue");
      this.changeSortingValue(this.sortValue);
      this.sortProduct(this.sortValue);
    },
    selectedCategory() {
      console.log("selectedCategory");
      this.changeSelectedCategory(this.selectedCategory);
      this.filterByCategory(this.selectedCategory);
    },
  },
};
</script>

<style lang="less">
.header {
  background-color: #b3c0d1;
  color: #333;
  padding: 0 35px;
  line-height: 60px;
  position: fixed;
  width: 100vw;
  height: 60px;
  z-index: 999;
  box-sizing: border-box;
  .logo {
    margin-right: 10px;
  }
}
</style>
