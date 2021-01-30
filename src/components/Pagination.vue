<template>
  <div class="pagination" v-if="total>pagesize">
    <el-pagination
      background
      @current-change="$emit('handleCurrentChange',pageNumber)"
      :current-page.sync="pageNumber"
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
    pagesize:{
        type: Number,
    },
    currentPage:{
        type: Number,
    }
  },
  data(){
      return {
          pageNumber:this.currentPage
      }
  },
//   computed:{
//       current:{
//           get(){
//               return this.currentPage
//           },
//           set(val){
//               console.log(val)
//               return val
//             //   this.currentPage = val;
            
//           }
//       }
//   },
//   mounted(){
//       console.log('current page',this.currentPage)
//   },
//   destroyed(){
//       console.log('destroyed')
//   }
};
</script>

<style lang="less" scoped>
.pagination {
  // height: 20px;
  // padding: 10px 0;
  padding: 20px 0;
  .el-pagination{
    text-align: center;
    
  }
}
</style>
