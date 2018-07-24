export default {
  /**
   * 书写所有的状态管理逻辑函数
   * Mutations必须是同步函数
   * @constructor
   */
  CHECH_SELECT(state, res) {
    //写业务逻辑
    state.is_select = res
  }
}
