<template>
	<section>
		测试子组件接收父组件数据 用props
		<son1 :data='hehe'></son1>
		测试父组件分发数据到子组件 子组件要包含slot
		<son2 :data='haha'> this is son_name</son2>
		父组件的事件传给子组件，需要子组件通过$emit来触发事件 将参数传递回来
		<son3 @compClick='compClick' style="border:1px solid red;width:50px">点击我</son3>
	</section>
</template>

<script>
import Vue from 'vue'
Vue.component('son1', {
	props: ['data'],
	template: '<div>{{data}}</div>',
}
)
Vue.component('son2', {
	props: ['data'],
	template: '<div>{{data}}<slot></slot></div>',
}
)

Vue.component('son3', {
	template: '<div @click="testClick"><slot></slot></div>',
	methods: {
		testClick () {
			this.$emit('compClick', 'data')
			//注：点击事件方法名称必须与emit触发的方法名称不同
		}
	}
}
)
export default {
	data () {
		return {
			hehe: 'hehe',
			haha: 'haha'
		}
	},
	methods: {
		compClick (res) {
			alert('子组件接收到点击事件了')
		}
	}

}
</script>
