<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>忘记密码</span>
        </div>
        <el-steps :active="active" finish-status="success">
            <el-step title="确认用户名">
            </el-step>
            <el-step title="验证用户名">
            </el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <div style="margin-top:50px">
            <router-view></router-view>
        </div>
    </el-card>
</template>

<script>
export default {
    data () {
        return {
            active: 0
        }
    },
    methods: {
        getCurrentStep () {
            const path = this.$route.path
            const pathList = path.split('/');
            switch (pathList[pathList.length - 1]) {
                case 'step1':
                    return 0;
                case 'step2':
                    return 1;
                case 'step3':
                    return 2;
                default:
                    return 0;
            }
        },
    },
    updated () {
        const step = this.getCurrentStep()
        this.active = step
    }

}
</script>
<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin: 0 auto;
  height: 100%;
}
</style>