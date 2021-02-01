<template>
  <header class="header">
    <el-row>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="2"
        :md="2"
        :lg="2"
        :xl="2"
        class="logo"
      >
        <router-link to="/">ESTORE</router-link>
      </el-col>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="8"
        :md="6"
        :lg="6"
        :xl="6"
        class="search_bar"
        v-if="showSearchBar"
      >
        <SearchBar />
      </el-col>
      <el-col
        :xs="{ span: 6, offset: 0 }"
        :sm="{ span: 4, offset: 1 }"
        :md="{ span: 4, offset: 3 }"
        :lg="{ span: 3, offset: 5 }"
        :xl="{ span: 3, offset: 5 }"
        class="sort"
        v-if="showSorting"
      >
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
      <el-col
        :xs="{ span: 6, offset: 1 }"
        :sm="{ span: 4 }"
        :md="{ span: 4 }"
        :lg="{ span: 3 }"
        :xl="{ span: 3 }"
        class="filter"
        v-if="showFilter"
      >
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
      <el-col
        :xs="{ span: 5, offset: 0 }"
        :sm="2"
        :md="2"
        :lg="{ span: 2 }"
        :xl="{ span: 2 }"
        class="user"
      >
        <i class="fas fa-user"></i>
        <router-link to="/profile">Profile</router-link>
      </el-col>
      <el-col
        :xs="{ span: 5, offset: 0 }"
        :sm="2"
        :md="2"
        :lg="{ span: 2 }"
        :xl="{ span: 2 }"
        class="cart"
      >
        <i class="fas fa-shopping-cart"></i>
        <router-link to="/cart">Cart</router-link>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import { mapState, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      sortOptions: ["asc", "desc"],
    };
  },
  components: {
    SearchBar,
  },
  computed: {
    ...mapState([
      "categories",
      "sortingvalue",
      "showSearchBar",
      "showSorting",
      "showFilter",
    ]),
    selectedCategory: {
      get() {
        return this.$store.state.selectedCategory;
      },
      set(value) {
        this.changeSelectedCategory(value);
        // refilter product if we select another category
        this.filterByCategory(value);
      },
    },
    sortingvalue: {
      get() {
        return this.$store.state.sortingvalue;
      },
      set(value) {
        this.changeSortingValue(value);
        // resort the product if we change the sorting order
        this.sortProduct(value);
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
    this.getAllCategories();
  },
  watch: {
    sortValue() {
      this.changeSortingValue(this.sortValue);
      this.sortProduct(this.sortValue);
    },
    selectedCategory() {
      this.changeSelectedCategory(this.selectedCategory);
      this.filterByCategory(this.selectedCategory);
    },
  },
};
</script>

<style lang="less">
.header {
  background-color: #343a40;
  color: #fff;
  padding: 0 6vw;
  line-height: 90px;
  position: fixed;
  width: 100vw;
  height: 90px;
  z-index: 999;
  box-sizing: border-box;
  font-size: 20px;
  @media (max-width: 767px) {
    height: 130px;
    line-height: 40px;
    .logo {
      text-align: center;
    }
  }
  .logo {
    margin-right: 10px;
    a {
      text-decoration: none;
    }
    .router-link-active {
      color: #fff;
    }
  }
  @media (min-width: 767px) and (max-width: 991px) {
    .sort {
      margin-right: 5px;
    }
    .logo {
      margin-right: 20px;
    }
  }
  @media (min-width: 992px) {
    .sort {
      margin-right: 5px;
    }
  }
  .user,
  .cart {
    color: #8d9194;
    text-align: right;
    font-size: 13px;
    i {
      padding-right: 3px;
    }
    a {
      text-decoration: none;
      color: #8d9194;
    }
    .router-link-active {
      color: #8d9194;
    }
  }
  @media (min-width: 1200px) {
    .user {
      margin-left: 30px;
    }
  }
  @media (min-width: 992px) {
    .user {
      margin-left: 20px;
    }
  }
}
</style>
