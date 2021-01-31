import Vue from "vue";
import Vuex from "vuex";
import axiosInstance from "../api/http";
import { paginate, sortBy, errorHandle } from "../utils/common";

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
  SET_CART_INFO: "SET_CART_INFO",
  SET_USER_INFO: "SET_USER_INFO",
  SET_SHOW_SEARCHBAR: "SET_SHOW_SEARCHBAR",
  SET_SHOW_SORTING: "SET_SHOW_SORTING",
  SET_SHOW_FILTER: "SET_SHOW_FILTER",
};

const state = {
  allProducts: [],
  showProducts: [],
  totalPageSection: [],
  currentPage: 1,
  categories: JSON.parse(localStorage.getItem("estore_categories")) || [],
  selectedCategory: "",
  sortingvalue: "",
  cartInfo: "",
  userInfo: {},
  showSearchBar:true,
  showSorting:true,
  showFilter:true
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
  [types.SET_CART_INFO](state, payload) {
    state.cartInfo = payload;
  },
  [types.SET_USER_INFO](state, payload) {
    state.userInfo = payload;
  },
  [types.SET_SHOW_SEARCHBAR](state, payload) {
    state.showSearchBar = payload;
  },
  [types.SET_SHOW_SORTING](state, payload) {
    state.showSorting = payload;
  },
  [types.SET_SHOW_FILTER](state, payload) {
    state.showFilter = payload;
  },
};

const actions = {
  async getAllProducts({ commit, rootState }) {
    let products = await axiosInstance("/products");
    errorHandle(products);
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
    errorHandle(products);
    commit(types.SET_ALL_PRODUCTS, products);
    commit(types.SET_SHOW_PRODUCTS, products);
    commit(types.SET_TOTAL_PAGE_SECTION, []);
  },
  async getAllCategories({ commit }) {
    let categories = await axiosInstance("/products/categories");
    errorHandle(categories);
    localStorage.setItem("estore_categories", JSON.stringify(categories));
    commit(types.SET_CATEGORIES, categories);
  },
  async filterByCategory({ commit, rootState }, payload) {
    let products = await axiosInstance(`/products/category/${payload}`);
    errorHandle(products);
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
  async getCartInfo({ commit }) {
    let cartInfo = await axiosInstance("/carts/user/1");
    errorHandle(cartInfo);
    commit(types.SET_CART_INFO, cartInfo);
    console.log(cartInfo);
  },
  async getUserInfo({ commit }) {
    let userInfo = await axiosInstance("/users/1");
    errorHandle(userInfo);
    // console.log(userInfo);
    commit(types.SET_USER_INFO, userInfo);
  },
  async updateUserInfo({ commit }, payload) {
    console.log(JSON.stringify(payload));
    let userInfo = await axiosInstance.put("/users/1", JSON.stringify(payload));
    errorHandle(userInfo);
    commit(types.SET_USER_INFO, userInfo);
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
    commit(
      types.SET_SHOW_PRODUCTS,
      rootState.totalPageSection[rootState.currentPage - 1]
    );
  },
  changeSelectedCategory({ commit }, payload) {
    commit(types.SET_SELECTED_CATEGORY, payload);
  },
  changeSortingValue({ commit }, payload) {
    commit(types.SET_SORTING_VALUE, payload);
  },
  changeShowSearchBar({ commit }, payload){
    commit(types.SET_SHOW_SEARCHBAR, payload);
  },
  changeShowSorting({ commit }, payload){
    commit(types.SET_SHOW_SORTING, payload);
  },
  changeShowFilter({ commit }, payload){
    commit(types.SET_SHOW_FILTER, payload);
  },
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
});
