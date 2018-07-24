<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm login-container">
        <h3 class="title">系统注册</h3>
        <el-form-item label="用户名" prop="userName">
            <el-input type="text" v-model="ruleForm2.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
            <el-input type="password" v-model="ruleForm2.passWord" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" :loading="registering">提交</el-button>
            <el-button  @click="handleBack()">返回</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { success, error, post } from "../util/utils";
import URLS from '../constants/urls'

export default {
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('验证码错误'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.passWord) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            registering: false,
            ruleForm2: {
                passWord: '',
                checkPass: '',
            },
            rules2: {
                userName: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 2, max: 10, message: "长度在 2 到 5 个字符", trigger: "blur" }
                ],
                passWord: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: "请确认密码", trigger: "blur" },
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.registering = true;
                    var userName = this.ruleForm2.userName,
                        passWord = this.ruleForm2.passWord
                    const url = `${URLS.IP}/user`;
                    const formData = new FormData();
                    formData.append('method', "register");
                    formData.append('userName', userName);
                    formData.append('passWord', passWord);
                    post(url, formData)
                        .then(response => response.json())
                        .then((json) => {
                            if (json.status === '1') {
                                success("注册成功")
                                this.registering = false
                                this.$router.push('/');
                            } else {
                                error("注册失败")
                            }
                        })
                        .catch((err) => {
                            error("连接服务器失败" + err)
                        });
                } else {
                    error("error submit!!");
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        handleBack () {
            this.$router.push('/');
        }
    }
}
</script>
<style lang="less">
@import './index.less';
</style>
