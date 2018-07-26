<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="margin-top:100px" class="demo-ruleForm form-container">
        <h3 class="title">个人信息</h3>
        <el-form-item label="昵称" prop="nickName">
            <el-input type="text" v-model="ruleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="ruleForm.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="籍贯" prop="residence">
            <el-cascader expand-trigger="hover" :options="options" v-model="ruleForm.residence" @change="handleChange">
            </el-cascader>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="portrait">
            <el-upload class="upload-demo" ref="upload" accept=".jpg,.png,.gif" :action="action" :data="uploadData" :onError="uploadError" :onSuccess="uploadSuccess" :headers="headers" :http-request="handleUpload" :on-change="handleChange" :file-list="fileList" :auto-upload="false" :before-upload="beforeUpload">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
            <el-input style="width:200px" type="password" v-model="ruleForm.passWord" auto-complete="off" placeholder="如需更改密码 请在此输入"></el-input>
            <el-button style="margin-left:25px" type="primary" @click="modifyPwd" :loading="updatePwd">修改</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="updateing">更新</el-button>
            <el-button style="margin-left:50px" @click="handleBack()">返回</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { success, error, post } from "../util/utils";
import URLS from '../constants/urls'
import City from '../constants/city'

export default {
    data () {
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        return {
            updateing: false,
            updatePwd: false,
            portrait: user.portrait,
            options: City.options,
            userName: user.userName,
            fileList: [],
            file: {},//要上传的文件对象
            action: `${URLS.IP}/upload`,
            uploadData: {},
            headers: {
                Accept: 'application/json; charset=UTF-8',
            },
            ruleForm: {
                nickName: '',
                gender: '男',
                passWord: '',
                residence: []
            },
            rules: {
                nickName: [
                    { required: true, message: "请输入昵称", trigger: "blur" },
                    { min: 2, max: 10, message: "长度在 2 到 5 个字符", trigger: "blur" }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
                ],
                // passWord: [
                //     { required: true, message: "请输入密码", trigger: "blur" },
                // ],
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.updateing = true;
                    const url = `${URLS.IP}/user`
                    const formData = new FormData();
                    formData.append('method', "edit");
                    formData.append('userName', this.userName);
                    formData.append('nickName', this.ruleForm.nickName);
                    formData.append('gender', this.ruleForm.gender);
                    formData.append('email', this.ruleForm.email);
                    formData.append('residence', this.ruleForm.residence.join('-'));
                    post(url, formData)
                        .then(response => response.json())
                        .then((json) => {
                            if (json.status === '1') {
                                this.updateing = false
                                success("更新成功")
                                let newData = {
                                    'userName': this.userName,
                                    'nickName': this.ruleForm.nickName,
                                    'portrait': this.portrait
                                }
                                localStorage.setItem('user', JSON.stringify(newData));
                                this.$router.push('/main/welcome');
                            } else {
                                error("更新失败")
                            }
                        }).catch((err) => {
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
            this.$router.push('/main/welcome');
        },
        handleChange (file) {
            this.file = file.raw
        },
        submitUpload () {
            this.$refs.upload.submit();
        },
        // 上传成功后的回调
        uploadSuccess (response, file, fileList) {
            console.log('上传文件', response)
        },
        // 上传错误
        uploadError (response, file, fileList) {
            console.log('上传失败，请重试！')
        },
        beforeUpload (file) {
        },
        handleUpload () {
            const formData = new FormData();
            const url = `${URLS.IP}/user`;
            formData.append('method', 'upload');
            formData.append('file', this.file);
            formData.append('userName', this.userName);
            post(url, formData)
                .then(response => response.json())
                .then((json) => {
                    if (json.status === '1') {
                        success("上传成功")
                        this.fileList.push(this.file)
                    } else {
                        error("上传失败")
                    }
                }).catch((err) => {
                    error("连接服务器失败" + err)
                });
        },
        modifyPwd () {
            this.updatePwd = true
            this.timer = setTimeout(
                () => {
                    this.updatePwd = false
                }, 1000
            )
            const passWord = this.ruleForm.passWord
            if (passWord !== '') {
                const url = `${URLS.IP}/user`;
                const formData = new FormData();
                formData.append('method', "update");
                formData.append('userName', this.userName);
                formData.append('passWord', passWord);
                post(url, formData)
                    .then(response => response.json())
                    .then((json) => {
                        if (json.status === '1') {
                            success('修改成功')
                        } else {
                            error('修改失败')
                        }
                    })
                    .catch((err) => {
                        error("连接服务器失败" + err)
                    });
            } else {
                error("请输入新密码")
            }
        }
    },

}
</script>
<style lang="less">
@import './index.less';
</style>
