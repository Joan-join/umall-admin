import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {actions} from "./actions"
import {state,getters,mutations} from "./mutations" 
import cate from "./modules/cate"
import banner from "./modules/banner"
import specs from "./modules/specs"
import goods from "./modules/goods"
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        // 2.引入 注册
        cate,
        banner,
        specs,
        goods
    }
})