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
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="用户名称" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用 </el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqMenuDel, reqRoleDel, reqManageDel } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  //23.接收list
  props: ["list"],
  methods: {
    //31.删除
    del(uid) {
      reqManageDel({ uid: uid }).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("init");
        }
      });
    },

    //34.点了编辑按钮
    edit(id) {
      //通知父组件有人点了编辑按钮
      this.$emit("edit", id);
    }
  }
};
</script>




<style>
</style>