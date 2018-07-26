<template>
    <el-card shadow="always" style="width:400px;margin:0 auto;text-align:center">
        <h1>修改成功</h1>
        <el-button type="primary" @click="back">返回</el-button>
    </el-card>
</template>

<script>
export default {
    methods: {
        back () {
            this.$router.push('/')
        }
    },
    mounted () {
        this.timer = setTimeout(
            () => {
                this.$router.push('/')
            }, 3000
        )
    }

}
</script>
