<template>
  <div>
      <el-dialog :title="info.isadd?'添加规格':'编辑规格'" :visible.sync="info.isshow" @closed="cancel">
      <!-- 14.数据绑定到页面 -->
     
      <el-form :model="user">
        <div>
          user:{{user}}
        </div>
        <div>
          attrsArr:{{attrsArr}}
        </div>
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="user.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="100px"
        v-for="(item,index) in attrsArr"
        :key="index"
        >
          <div class="line">
            <el-input class="line-ipt" v-model="item.value"></el-input>
            <el-button type="primary" class="line-btn" v-if="index==0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" class="line-btn" v-else @click="delAttr(index)">删除</el-button>
          </div>
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
import { mapActions, mapGetters } from "vuex";
import { reqspecsAdd, reqspecsDetail, reqspecsUpdate } from '../../../utils/http';
import { successalert } from '../../../utils/alert';
export default {
  props:["info"],
  data() {
    return {
      user:{
        specsname:"",
        attrs:"[]",
        status:1
      },
      attrsArr:[
        {value:""}
      ]
    };
  },
  computed: {
    ...mapGetters({
      
    })
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
       reqTotal:"specs/reqTotal",
    }),
    //取消
    cancel(){
      if(!this.info.isadd){
        this.empty()
      }
      this.info.isshow=false;
    },
    //新增属性
    addAttr(){
      this.attrsArr.push({value:""})
    },
    //删除属性
    delAttr(index){
      this.attrsArr.splice(index,1)
    },
    //清空
    empty(){
      this.user={
        specsname:"",
        attrs:"[]",
        status:1
      };
      this.attrsArr=[
        {value:""}
      ]
    },
    //点了添加
    add(){
      //attrsArr:[ { "value": "s" }, { "value": "m" }, { "value": "l" } ] 
      //user.attrs='["s","m","l"]'
      this.user.attrs=JSON.stringify(this.attrsArr.map(item=>item.value))
      //发请求
      reqspecsAdd(this.user).then(res=>{
        if(res.data.code==200){
          //1.弹框消失
          this.cancel()
          //2.数据清空
          this.empty()
          //3.弹成功
          successalert(res.data.msg)
          //4.刷新list
          this.reqList()
          this.reqTotal()
        }
      })
    },
    //获取一条数据
    getOne(id){
      reqspecsDetail({id:id}).then(res=>{
        if(res.data.code==200){
          this.user=res.data.list[0]
          //user.attrs=attrs": "[\"红色\"", "\"绿色\"", "\"黄色\"]" 
          this.user.attrs=JSON.parse(this.user.attrs);//['红色','绿色','黄色']
          //attrsArr=[{value:"红色"},{value:"绿色"},{value:"黄色"}]
          this.attrsArr=this.user.attrs.map(item=>({value:item}))

        }
      })
    },
    //修改
    update(){
      this.user.attrs=JSON.stringify(this.attrsArr.map(item=>item.value))
      reqspecsUpdate(this.user).then(res=>{
         if(res.data.code==200){
          //1.弹框消失
          this.cancel()
          //2.数据清空
          this.empty()
          //3.弹成功
          successalert(res.data.msg)
          //4.刷新list
          this.reqList()
        }
      })
    }
  },
  mounted() {}
};
</script>

<style scoped>
.line{
  display: flex;
}
.line-btn{
  width: auto;
}
.line-ipt{
  flex: 1;
}
</style>