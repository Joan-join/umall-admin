<template>
  <div>
    <!-- 44.绑定closed  -->
    <el-dialog :title="info.isadd?'添加菜单':'编辑菜单'" :visible.sync="info.isshow"
    @closed="cancel"
    >
      <!-- 14.数据绑定到页面 -->
      <el-form :model="user">
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid" @change="changePid">
            <el-option :value="0" label="顶级菜单"></el-option>
            <!-- 需要一段数据 -->
            <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="100px">
          <el-radio v-model="user.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="100px" v-if="user.type==1">
          <el-select v-model="user.icon">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="100px" v-else>
          <el-select v-model="user.url">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :value="'/'+item.path"
              :label="item.name+'-/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRoutes } from "../../../router";
import { reqMenuAdd, reqMenuDetail, reqMenuUpdate } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  // 4.接收info
  // 28.收list
  props: ["info","list"],
  data() {
    return {
      //8.初始化user
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      //9.icon集合
      icons: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order"
      ],
      //13.路由集合
      indexRoutes
    };
  },
  methods: {
    //6.点了取消
    cancel() {
      //45.编辑清空数据
      if(!this.info.isadd){
        this.empty()
      }
      this.info.isshow = false;
    },
    //清空user
    empty() {
      this.user = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
    },
    //15.添加
    add() {
      reqMenuAdd(this.user).then(res => {
        if (res.data.code == 200) {
          // 16.封装了成功弹框
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //17.清空user
          this.empty();
          //25.列表刷新
          this.$emit("init")
        }
      });
    },
    //修改了顶级菜单
    changePid(){
      if(this.user.pid==0){
        this.user.type=1
      }else{
        this.user.type=2;
      }
    },
    //37.获取详情
    getOne(id){
      reqMenuDetail({id:id}).then(res=>{
        if(res.data.code==200){
          this.user=res.data.list
          //补id
          this.user.id=id;
        }
      })
    },
    //40修改
    update(){
      reqMenuUpdate(this.user).then(res=>{
        if(res.data.code==200){
          //弹成功
          successalert(res.data.msg)
          //弹框消失
          this.cancel()
          //数据清空
          this.empty()
          //刷新list
          this.$emit("init")
        }
      })
    }
  }
};
</script>

<style>
</style>