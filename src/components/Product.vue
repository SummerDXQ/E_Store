<template>
  <el-row >
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
     
      <p class="desc">{{ item.description }}</p>
      <span class="price">${{ item.price.toFixed(2) }}</span>
       <span class="category">{{ item.category }}</span>
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
  }
};
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
  .el-col {
    padding: 20px;
    margin-bottom: 15px;
    position: relative;
    .image {
      height: 180px;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .category {
      padding: 2px;
      background: #FFAE00;
      color: #5B3F04;
      font-size: 14px;
      position: absolute;
      top: 0px;
      right: 0px;
    }
    .title {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 10px 0;
      font-weight: bolder;
    }
    .desc {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      overflow: hidden;
      color: #ccc;
      font-size: 12px;
    }
    .price {
      font-size: 30px;
      display: inline-block;
      margin-top: 10px;
    }
  }
}
</style>
