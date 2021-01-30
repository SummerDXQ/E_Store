import Vue from "vue";
import Vuex from "vuex";
import axiosInstance from "../api/http";
import { paginate, sortBy } from "../utils/common";

Vue.use(Vuex);

const types = {
  SET_ALL_PRODUCTS: "SET_ALL_PRODUCTS",
  SET_SHOW_PRODUCTS: "SET_SHOW_PRODUCTS",
  SET_TOTAL_PAGE_SECTION: "SET_TOTAL_PAGE_SECTION",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_SEARCH_KEYWORD: "SET_SEARCH_KEYWORD",
  SORT_PRODUCTS: "SORT_PRODUCTS",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_SELECTED_CATEGORY: "SET_SELECTED_CATEGORY",
  SET_SORTING_VALUE: "SET_SORTING_VALUE",
};

const state = {
  allProducts: [],
  showProducts: [],
  totalPageSection: [],
  currentPage: 1,
  categories: JSON.parse(localStorage.getItem("estore_categories")) || [],
  selectedCategory: "",
  sortingvalue: "",
  // searchKeyword: "",
};

const mutations = {
  [types.SET_ALL_PRODUCTS](state, payload) {
    if (Object.prototype.toString.call(payload) === "[object Object]") {
      state.allProducts = [];
      state.allProducts.push(payload);
      return;
    }
    state.allProducts = payload;
  },
  [types.SET_SHOW_PRODUCTS](state, payload) {
    if (Object.prototype.toString.call(payload) === "[object Object]") {
      state.showProducts = [];
      state.showProducts.push(payload);
      return;
    }
    state.showProducts = payload;
  },
  [types.SET_TOTAL_PAGE_SECTION](state, payload) {
    state.totalPageSection = payload;
  },
  [types.SET_CATEGORIES](state, payload) {
    state.categories = payload;
  },
  [types.SET_SEARCH_KEYWORD](state, payload) {
    state.searchKeyword = payload;
  },
  [types.SORT_PRODUCTS](state, payload) {
    state.allProducts.sort(sortBy("price", payload));
  },
  [types.SET_CURRENT_PAGE](state, payload) {
    state.currentPage = payload;
  },
  [types.SET_SELECTED_CATEGORY](state, payload) {
    state.selectedCategory = payload;
  },
  [types.SET_SORTING_VALUE](state, payload) {
    state.sortingvalue = payload;
  },
};

const actions = {
  async getAllProducts({ commit, rootState }) {
    let products = await axiosInstance("/products");
    // error handling
    commit(types.SET_ALL_PRODUCTS, products);
    let totalPageSection = paginate(
      products,
      Number(process.env.VUE_APP_PAGESIZE)
    );
    commit(types.SET_TOTAL_PAGE_SECTION, totalPageSection);
    commit(
      types.SET_SHOW_PRODUCTS,
      totalPageSection[rootState.currentPage - 1]
    );
  },
  async searchById({ commit }, id) {
    commit(types.SET_ALL_PRODUCTS, []);
    let products = await axiosInstance(`/products/${id}`);
    commit(types.SET_ALL_PRODUCTS, products);
    commit(types.SET_SHOW_PRODUCTS, products);
    commit(types.SET_TOTAL_PAGE_SECTION, []);
  },
  async getAllCategories({ commit }) {
    let categories = await axiosInstance("/products/categories");
    localStorage.setItem("estore_categories", JSON.stringify(categories));
    commit(types.SET_CATEGORIES, categories);
  },
  async filterByCategory({ commit, rootState }, payload) {
    console.log(payload);
    let products = await axiosInstance(`/products/category/${payload}`);
    commit(types.SET_ALL_PRODUCTS, products);
    let totalPageSection = paginate(
      products,
      Number(process.env.VUE_APP_PAGESIZE)
    );
    commit(types.SET_TOTAL_PAGE_SECTION, totalPageSection);
    commit(
      types.SET_SHOW_PRODUCTS,
      totalPageSection[rootState.currentPage - 1]
    );
  },
  sortProduct({ commit, rootState }, payload) {
    commit(types.SORT_PRODUCTS, payload);
    commit(types.SET_CURRENT_PAGE, 1);

    let totalPageSection = paginate(
      rootState.allProducts,
      Number(process.env.VUE_APP_PAGESIZE)
    );
    commit(types.SET_TOTAL_PAGE_SECTION, totalPageSection);
    commit(
      types.SET_SHOW_PRODUCTS,
      totalPageSection[rootState.currentPage - 1]
    );
  },
  changeCurrentPage({ commit, rootState }, payload) {
    commit(types.SET_CURRENT_PAGE, payload);
    // commit(types.SET_TOTAL_PAGE_SECTION,)
    commit(
      types.SET_SHOW_PRODUCTS,
      rootState.totalPageSection[rootState.currentPage - 1]
    );
    // let totalPageSection = paginate(
    //   rootState.products,
    //   Number(process.env.VUE_APP_PAGESIZE)
    // );
    // commit(types.SET_TOTAL_PAGE_SECTION, totalPageSection);
    // commit(
    //   types.SET_SHOW_PRODUCTS,
    //   totalPageSection[rootState.currentPage - 1]
    // );
  },
  changeSelectedCategory({ commit }, payload) {
    commit(types.SET_SELECTED_CATEGORY, payload);
  },
  changeSortingValue({ commit }, payload) {
    commit(types.SET_SORTING_VALUE, payload);
  },
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
});
