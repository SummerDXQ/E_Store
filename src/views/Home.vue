<template>
  <div class="home">
    <Header />
    <div class="body">
      <el-container>
        <el-main>
          <Product :dataSource="showProducts"/>
          <Pagination
            :total="allProducts.length"
            :pagesize="pageSize"
            :currentPage="currentPage"
            @handleCurrentChange="handleCurrentChange"
          />
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
import Product from '@/components/Product';

export default {
  name: "Home",
  data() {
    return {
      // ...mapState(['allProducts'])
    };
  },
  computed: {
    ...mapState(["allProducts", "showProducts", "currentPage"]),
    pageSize() {
      return Number(process.env.VUE_APP_PAGESIZE);
    },
  },
  components: {
    Header,
    Footer,
    Pagination,
    Product
  },
  methods: {
    ...mapActions(["getAllProducts","changeCurrentPage"]),
    handleCurrentChange(val) {
      console.log(val);
      this.changeCurrentPage(val);
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  .body {
    // text-align: center;
    padding-top: 70px;
    min-height: calc(100vh - 120px);
    .el-main {
      // background-color: #e9eef3;
      // color: #333;
      // text-align: center;
      // line-height: 160px;
      width: 100%;
      padding: 0 30px;
      // .el-row {
      //   display: flex;
      //   flex-wrap: wrap;
      //   // justify-content: space-between;
      //   .el-col {
      //     // display: flex;
      //     border: 1px solid #ccc;
      //     padding: 20px;
      //     // text-align: center;
      //     margin-bottom: 15px;
      //     .image {
      //       height: 180px;
      //       // height: 70%;
      //       width: 100%;
      //       img {
      //         width: 100%;
      //         height: 100%;
      //         object-fit: contain;
      //       }
      //     }
      //     .category {
      //       padding-bottom: 10px;
      //     }
      //     .title {
      //       width: 100%;
      //       overflow: hidden;
      //       text-overflow: ellipsis;
      //       white-space: nowrap;
      //       padding: 10px 0;
      //     }
      //     .desc {
      //       display: -webkit-box;
      //       -webkit-line-clamp: 2;
      //       -webkit-box-orient: vertical;
      //       word-break: break-all;
      //       overflow: hidden;
      //       // padding-bottom: 10px;
      //     }
      //     .price {
      //       font-size: 30px;
      //       padding-top: 10px;
      //     }
      //   }
      // }
      width: 100%;
      // ul {
      //   width: 100%;
      //   li {
      //     width: 20%;
      //     // height: 300px;
      //     float: left;
      //     box-sizing: border-box;
      //     padding: 10px;
      //     border: 1px solid #ccc;
      //     margin-right: 10px;
      //     .image {
      //       height: 210px;
      //       // height: 70%;
      //       width: 80%;
      //       img {
      //         width: 100%;
      //         height: 100%;
      //         object-fit: contain;
      //       }
      //     }
      //     .title {
      //       width: 100%;
      //       overflow: hidden;
      //       text-overflow: ellipsis;
      //       white-space: nowrap;
      //     }
      //     .desc {
      //       width: 100%;
      //       overflow: hidden;
      //       text-overflow: ellipsis;
      //       white-space: nowrap;
      //     }

      //   }
      // }
    }
  }
}
.keyword {
  width: 200px;
}
</style>
