<template>
  <div class="home">
    <Header />
    <div class="content">
      <el-container>
        <el-main>
          <keep-alive include="Profile"> 
          <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapState(["showSearchBar", "showSorting", "showFilter"]),
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
  methods: {
    ...mapActions([
      "changeShowSearchBar",
      "changeShowSorting",
      "changeShowFilter",
    ]),
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  .content {
    padding-top: 130px;
    min-height: calc(100vh - 150px);
    .el-main {
      width: 100%;
      // padding: 0 80px;
      width: 100%;
    }
    @media (min-width: 992px) {
      .el-main {
        // width: 100%;
        padding: 0 80px;
        // width: 100%;
      }
    }
  }
}
// @media (min-width: 992px) {
//   .home {
//     .content {
//       .el-main {
//         width: 100%;
//         padding: 0 100px;
//         width: 100%;
//       }
//     }
//   }
// }
</style>
