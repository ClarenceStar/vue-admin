<template>
    <section>第3步
        <el-button style="margin-top: 100px;" @click="next">完成</el-button>
    </section>
</template>

<script>
export default {
    methods: {
        next () {

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
