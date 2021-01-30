<template>
  <el-select v-model="value" placeholder="sort by price">
    <el-option
      v-for="item in dataSource"
      :key="item"
      :label="item"
      :value="item"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "filter",
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    dataSource: {
      type: Array,
      required: true,
    },
  },
};
</script>
