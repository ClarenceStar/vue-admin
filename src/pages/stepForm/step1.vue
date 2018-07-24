<template>
    <el-form :model="ruleform" ref="ruleform" :rules="rules" label-width="100px" class="ruleform">
        <el-form-item prop="userName" label="用户名">
            <el-input v-model="ruleform.userName" autofocus="true"></el-input>
        </el-form-item>
        <el-form-item prop="captcha" label="验证码">
            <el-input style = "width:250px" v-model="ruleform.captcha"></el-input>
            <span>
                <el-tooltip content="看不清?点击刷新" placement="top">
                    <i style = "margin-right:10px" class="el-icon-question"></i>
                </el-tooltip>
                <span @click="refreshCode">
                    <v-code :identifyCode="identifyCode"></v-code>
                </span>
            </span>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleform')">下一步</el-button>
            <el-button style = "float:right;margin-right:150px" @click="handleBack()">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import VCode from '../../components/VCode'
import { error } from "../../util/utils";

export default {
    components: {
        VCode
    },
    data () {
        var validateCode = (rule, value, callback) => {
            const code = this.identifyCode.toLowerCase(),
                input = value.toLowerCase()
            console.log(code)
            if (input === code) {
                callback()
            } else {
                callback(new Error('验证码错误'));
            }
        };
        return {
            identifyCodes: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            identifyCode: "",
            ruleform: {
                userName: '',
                captcha: ''
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { validator: validateCode, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const userName = this.ruleform.userName
                    this.$router.push({ name: '/forget/step2', params: { userName: userName } })
                } else {
                    error('有信息填写错误 请检查')
                }
            });
        },
        randomNum (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode () {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode (o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }
        },
        handleBack () {
            this.$router.push('/')
        }
    },
    mounted () {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
    }
}
</script>

<style>
.ruleform {
  width: 500px;
  margin: 0 auto;
}
</style>

