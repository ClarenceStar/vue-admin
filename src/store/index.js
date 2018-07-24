import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'

Vue.use(Vuex)
//所有的状态树
const state = {
  is_select: false
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
