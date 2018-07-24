import { CHECH_SELECT } from './mutation-types.js' //从定义的Mutations逻辑函数中取需要用到的逻辑函数
/**
 *Action 类似于 mutation，不同在于：
 *Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 */
export default {
  async check_select({ commit }, is_select) {
    commit(CHECH_SELECT, is_select)
  }
}
