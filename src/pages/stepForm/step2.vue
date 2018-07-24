<template>
    <el-form :model="ruleform" ref="ruleform" :rules="rules" label-width="100px" class="ruleform">
        <div :style="display">
            <el-alert title="密码修改成功后 请使用新密码登录" type="info" show-icon/>
        </div>
        <el-form-item prop="userName" label="用户名">
            <el-input v-model="ruleform.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="passWord" label="密  码">
            <el-input type="password" v-model="ruleform.passWord"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleform')">下一步</el-button>
            <el-button style = "float:right;margin-right:150px" @click="handleBack()">上一步</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { success, error, post } from "../../util/utils";
import URLS from '../../constants/urls'

export default {
    data () {
        return {
            display: 'display:block;margin-bottom:20px;margin-left:100px;width:400px',
            ruleform: {
                userName: this.$route.params.userName,
                passWord: ''
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const url = `${URLS.IP}/user`;
                    const formData = new FormData();
                    formData.append('method', "update");
                    formData.append('userName', this.ruleform.userName);
                    formData.append('passWord', this.ruleform.passWord);
                    post(url, formData)
                        .then(response => response.json())
                        .then((json) => {
                            if (json.status === '1') {
                                success('修改成功')
                                this.$router.push('/forget/step3')
                            } else {
                                error('修改失败')
                            }
                        })
                        .catch((err) => {
                            error("连接服务器失败" + err)
                        });
                } else {
                    error('密码格式不正确')
                }
            });
        },
        handleBack () {
            this.$router.push('/forget/step1')
        }
    },
    mounted () {
        this.timer = setTimeout(
            () => {
                this.display = 'display:none'
            }, 4000
        )
    },
    destroyed () {
        this.timer && clearTimeout(this.timer);
    }
}
</script>
<style>
.ruleform {
  width: 500px;
  margin: 0 auto;
}
</style>