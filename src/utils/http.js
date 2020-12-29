import Vue from 'vue'

import axios from "axios"
import qs from "qs"
import { erroralert } from './alert'


//开发环境使用 ：8080
let baseUrl="/api"

Vue.prototype.$pre="http://localhost:3000"

//生产环境使用,打包的时候打开
//let baseUrl=""
//Vue.prototype.$pre=""

//响应拦截
axios.interceptors.response.use(res => {
    
    //18.统一处理失败
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    //统一处理list是null的情况
    if(!res.data.list){
        res.data.list=[]
    }
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    return res
})

// post 带有文件，参数转换
function dataToFormData(user){
    let data=new FormData()
    for(let i in user){
        data.append(i,user[i])
    }
    return data
}

/*************菜单管理start*************************/
//7.添加
export const reqMenuAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(user)
    })
}

//19.列表
export let reqMenulist=()=>{
    return axios({
        url: baseUrl + "/api/menulist",
        params:{
            istree:true
        }
    })
}
//30.删除
export let reqMenuDel=(obj)=>{
    return axios({
        url: baseUrl + "/api/menudelete",
        method:"post",
        data:qs.stringify(obj)
    })
}

//38.一条数据
export let reqMenuDetail=(obj)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        params:obj
    })
}

//39.修改接口
export let reqMenuUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(user)
    })
}
/*************菜单管理end*************************/
 
/************角色管理 start**************************/

//添加
export let reqRoleAdd = (user) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表
export let reqRolelist = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
    })
}

//详情 user={id:1}
export let reqRoleDetail = (user) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填"}
export let reqRoleUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={id:1}
export let reqRoleDel = (user) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(user)
    })
}



/************角色管理 end**************************/

/************管理管理 start**************************/

//添加
export let reqManageAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 obj={page:1,size:50}
export let reqManagelist = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method:"get",
        params:obj
    })
}

//详情 user={uid:123342}
export let reqManageDetail = (user) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: user
    })
}

//修改 user={uid:"必填"}
export let reqManageUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={uid:13432}
export let reqManageDel = (user) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(user)
    })
}
//总数
export let reqManageCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount"
    })
}

/************管理员管理 end**************************/

/************商品分类管理 start**************************/

//添加 user={img:File,catename:"12",pid:1}
export let reqcateAdd = (user) => {
    /*
    let data=new FormData()
    data.append("img",file)
    data.append("catename","123")
    data.append("pid",1)
    */ 
    /*
    let data=new FormData()
    for(let i in user){
        data.append(i,user[i])
    }*/

    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 p={istree:true} {pid:1}
export let reqcatelist = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        params:p
    })
}

//详情 user={id:1}
export let reqcateDetail = (user) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,catename:""}
export let reqcateUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqcateDel = (user) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(user)
    })
}



/************商品分类管理 end**************************/

/************商品规格管理 start**************************/

//添加 user={}
export let reqspecsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 p={page:1,size:500}
export let reqspecslist = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        params:p
    })
}

//详情 user={id:1}
export let reqspecsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,specsname:""}
export let reqspecsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={id:1}
export let reqspecsDel = (user) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqspecsCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount"
    })
}

/************商品规格管理 end**************************/


/************商品管理 start**************************/

//添加 user={}
export let reqgoodsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 p={page:1,size:500}
export let reqgoodslist = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        params:p
    })
}

//详情 user={id:1}
export let reqgoodsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,goodsname:""}
export let reqgoodsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqgoodsDel = (user) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqgoodsCount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount"
    })
}

/************商品管理 end**************************/