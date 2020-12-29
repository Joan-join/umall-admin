<template>
  <div>
    <!-- 24.遍历list -->
    <!-- :tree-props="{children:'哪个字段用来判断有下一层'}" -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180"></el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqMenuDel } from "../../../utils/http";
import { successalert } from '../../../utils/alert';
export default {
  //23.接收list
  props: ["list"],
  methods: {
    //31.删除
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点了删除按钮
          reqMenuDel({ id: id }).then(res => {
            if(res.data.code===200){
              //弹弹框
              successalert(res.data.msg)
              //32.刷新list
              this.$emit("init")
            }
          });
        })
        .catch(() => {});
    },
    //34.点了编辑按钮
    edit(id){
      //通知父组件有人点了编辑按钮
      this.$emit("edit",id)
    }
  }
};
</script>

<style>
</style>