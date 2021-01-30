<template>
  <el-row>
    <el-col
      :xs="24"
      :sm="12"
      :md="6"
      :lg="6"
      :xl="6"
      v-for="item in dataSource"
      :key="item.id"
    >
      <div class="image">
        <img :src="item.image" alt="" />
      </div>
      <div class="title">{{ item.title }}</div>
      <div class="category">Category: {{ item.category }}</div>
      <p class="desc">{{ item.description }}</p>
      <div class="price">${{ item.price.toFixed(2) }}</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    dataSource: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  .el-col {
    // display: flex;
    border: 1px solid #ccc;
    padding: 20px;
    // text-align: center;
    margin-bottom: 15px;
    .image {
      height: 180px;
      // height: 70%;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .category {
      padding-bottom: 10px;
    }
    .title {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 10px 0;
    }
    .desc {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      overflow: hidden;
      // padding-bottom: 10px;
    }
    .price {
      font-size: 30px;
      padding-top: 10px;
    }
  }
}
</style>
