<template>
  <div class="pagination" v-if="total > pagesize">
    <el-pagination
      background
      @current-change="$emit('handleCurrentChange', pageNumber)"
      :current-page.sync="page"
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
    },
    pagesize: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },
  },
  data() {
    return {
      pageNumber: this.currentPage,
    }
  },
  computed:{
    page:{
        get(){
          return this.currentPage
        },
        set(val){
          this.pageNumber = val;
        }
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  padding: 20px 0;
  .el-pagination {
    text-align: center;
  }
}
</style>
