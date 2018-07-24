<template>
	<section>欢迎页...
		<div>
			<h3>我'{{isSelect? "是" : "不是"}}'测试页</h3>
			<button @click="commit">点我确定</button>
			<button @click="cancels">取消</button>
		</div>
	</section>
</template>

<script>


export default {
	data () {
		return {
			isSelect: false
		}
	},
	methods: {
		commit () {
			const _self = this;
			_self.$store.dispatch("check_select", true)
				.then(function () {
					_self.isSelect = _self.$store.state.is_select;
				})

		},
		cancels () {
			const _self = this;
			_self.$store.dispatch("check_select", false)
				.then(function () {
					_self.isSelect = _self.$store.state.is_select;
				})
		},
	}
}
</script>
