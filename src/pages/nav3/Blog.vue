<template>
	<section>
		<A></A>
		<B></B>
		<C></C>
	</section>
</template>

<script>
import Vue from 'vue'

//准备一个空的实例对象
var Event = new Vue();

//组件A
Vue.component('A', {
	template: `
      <div>
        <span>我是A组件的数据->{{a}}</span>
        <input type="button" value="把A数据传给C" @click = "send"/>
      </div>
    `,
	methods: {
		send () {
			Event.$emit("a-msg", this.a);
		}
	},
	data () {
		return {
			a: "我是a组件中数据"
		}
	}
}
)
//组件B
Vue.component('B', {
	template: `
      <div>
        <span>我是B组件的数据->{{a}}</span>
        <input type="button" value="把B数据传给C" @click = "send"/>
      </div>
    `,
	methods: {
		send () {
			Event.$emit("b-msg", this.a);
		}
	},
	data () {
		return {
			a: "我是b组件中数据"
		}
	}
}
)
//组件C
Vue.component('C', {
	template: `
      <div>
        <h3>我是C组件</h3>
        <span>接收过来A的数据为: {{a}}</span>
        <br>
        <span>接收过来B的数据为: {{b}}</span>
      </div>
    `,
	mounted () {
		//接收A组件的数据
		Event.$on("a-msg", function (a) {
			this.a = a;
		}.bind(this));

		//接收B组件的数据
		Event.$on("b-msg", function (b) {
			this.b = b;
		}.bind(this));
	},
	data () {
		return {
			a: "",
			b: ""
		}
	}
}
)

export default {

}
</script>
