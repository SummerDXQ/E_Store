<template>
  <div class="home">
    <Header />
    <div class="content">
      <el-container>
        <el-main>
          <router-view />
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
import Pagination from "@/components/Pagination";
import Product from "@/components/Product";
import ProductList from "./ProductList";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  .content {
    padding-top: 100px;
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
