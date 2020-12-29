<template>
  <el-button type="danger" @click="del">删除</el-button>
</template>

<script>
export default {
  methods: {
    del() {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        confirmButtonClass:"el-button el-button--danger",
        type: "warning"
      })
        .then(() => {
           //用户点了确定，通知父组件该删了
           this.$emit("confirm")
            
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
</style>