<template>
    <div :style="note">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm login-container">
            <h3 class="title">系统登录</h3>
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="ruleForm.userName" type="text" placeholder="请输入账号" clearable autofocus="true"></el-input>
            </el-form-item>
            <el-form-item label="密　码" prop="passWord">
                <el-input v-model="ruleForm.passWord" type="password" placeholder="请输入密码" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="ruleForm.checked" class="remember">记住密码</el-checkbox>
                <router-link style = "float:right;margin-right:100px" to="/forget">忘记密码</router-link>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="logining">登录</el-button>
                <el-button style = "float:right;margin-right:100px" @click="handleRegister()">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { success, error, post } from "../util/utils";
import URLS from '../constants/urls'

export default {
    data () {
        var loginData = localStorage.getItem('loginData');
        loginData = JSON.parse(loginData);
        return {
            logining: false,
            ruleForm: {
                userName: loginData != null ? loginData.userName : '',
                passWord: loginData != null ? loginData.passWord : '',
                checked: loginData != null ? loginData.check : false
            },
            note: {
                backgroundImage: "url(" + require("../assets/loginbg.jpg") + ")",
                width: "100%",
                height: "100%",
                top: '0px',
                bottom: '0px',
                position: 'absolute'
            },
            rules: {
                userName: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 2, max: 10, message: "长度在 2 到 5 个字符", trigger: "blur" }
                ],
                passWord: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
                ],
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.logining = true;
                    var userName = this.ruleForm.userName,
                        passWord = this.ruleForm.passWord
                    const url = `${URLS.IP}/user`;
                    const formData = new FormData();
                    formData.append('method', "login");
                    formData.append('userName', userName);
                    formData.append('passWord', passWord);
                    post(url, formData)
                        .then(response => response.json())
                        .then((json) => {
                            if (json.status === '1') {
                                success("登录成功")
                                this.logining = false
                                if (this.ruleForm.checked) {
                                    let logindata = {
                                        'userName': userName,
                                        'passWord': passWord,
                                        'check': true
                                    }
                                    localStorage.setItem('loginData', JSON.stringify(logindata))
                                    localStorage.setItem('user', JSON.stringify(json.data));
                                } else {
                                    let logindata = {
                                        'userName': '',
                                        'passWord': '',
                                        'check': false
                                    }
                                    localStorage.setItem('loginData', JSON.stringify(logindata))
                                    localStorage.setItem('user', JSON.stringify(json.data));
                                }
                                this.$router.push('/main/welcome');
                            } else {
                                error("用户名密码错误")
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
        handleRegister () {
            this.$router.push('/register')
        }
    },
};
</script>
<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 400px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
