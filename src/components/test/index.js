import MyTest from './Test'
// 这里是重点
const Test = {
  install: function(Vue) {
      Vue.component('hehe', MyTest)
  }
}

// 导出组件
export default Test