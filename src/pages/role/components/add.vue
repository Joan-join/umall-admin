<template>
  <div>
    <!-- 44.绑定closed  -->
    <el-dialog :title="info.isadd?'添加角色':'编辑角色'" :visible.sync="info.isshow" @closed="cancel">
      <!-- 14.数据绑定到页面 -->
      <el-form :model="user">
        
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="100px">
          <!-- 树形控件 
          data：展示的数据 
          show-checkbox：展示选择框
          node-key:每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
          default-expanded-keys :默认展开
          default-checked-keys：默认选中
          :props="{children: '用来判断有没有下一个子节点的字段',label: '展示的内容的字段'}"
          this.$refs.tree.getCheckedNodes() 取到选中的数据的所有信息
          this.$refs.tree.getCheckedKeys() 取到选中的数据的node-key拼成的数组
          -->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children: 'children',label: 'title'}"
          ></el-tree>
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
import { reqRoleAdd, reqMenuDetail, reqMenuUpdate, reqMenulist, reqRoleDetail, reqRoleUpdate } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  // 4.接收info
  // 28.收list
  props: ["info", "list"],
  data() {
    return {
      //1.树形控件的数据
      menuList:[],
      //3.初始化user
      user: {
        rolename:"",
        menus:"",
        status:1
      },
     
    };
  },
  mounted(){
    // 2.一进来就要获取菜单列表
    reqMenulist().then(res=>{
      if(res.data.code==200){
        this.menuList=res.data.list
      }
    })
  },
  methods: {
    //6.点了取消
    cancel() {
      //45.编辑清空数据
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空user
    empty() {
      this.user = {
       rolename:"",
        menus:"",
        status:1
      };
      //树形控件要清空数据
      this.$refs.tree.setCheckedKeys([])
    },
    //4.添加
    add() {
      /*
      user的rolename、status是和表单关联的，所以这两个字段不用操作；
      但是menus和树形控件没有关联，在发起请求之前，需要将树形控件上选中的内容赋值给menus，
      再发请求。*/

      this.user.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      
      reqRoleAdd(this.user).then(res => {
        if (res.data.code == 200) {
          // 封装了成功弹框
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //5.清空user
          this.empty();
          //25.列表刷新
          this.$emit("init");
        }
      });
    },
    //修改了顶级菜单
    changePid() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    //10.获取详情
    getOne(id) {
      reqRoleDetail({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //补id
          this.user.id = id;
          //给树形控件赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus))
        }
      });
    },
    //40修改
    update() {
      //先取出树形控件的数据给menus，再发请求
      this.user.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleUpdate(this.user).then(res => {
        if (res.data.code == 200) {
          //弹成功
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.$emit("init");
        }
      });
    }
  }
};
</script>

<style>
</style>