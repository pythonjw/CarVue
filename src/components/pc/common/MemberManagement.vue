<template>
  <div style="margin-left: 7px;" id="memberManagement">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="修改成员密码" name="first">

        <el-col :span="12">

          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="model">
              <el-input  style="width: 50%" v-model.number="ruleForm2.model" clearable placeholder="账号为工号"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="service">
              <el-input type="password" style="width: 50%" v-model="ruleForm2.service" placeholder="请输入新密码" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm2('ruleForm2')">立即修改</el-button>
              <el-button @click="resetForm2('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>


        </el-col>

        <el-col :span="12"></el-col>

      </el-tab-pane>
      <el-tab-pane label="添加成员" name="second">

        <el-col :span="12">


          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="model">
              <el-input style="width: 50%" v-model.number="ruleForm.model" clearable placeholder="账号为工号"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="mname">
              <el-input style="width: 50%" v-model.number="ruleForm.mname" clearable placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input style="width: 50%" placeholder="请输入邮箱地址" v-model="ruleForm.email"></el-input>
            </el-form-item>


            <el-form-item label="角色" prop="service">
              <el-select v-model="ruleForm.service" placeholder="请选择角色">
                <el-option label="普通成员" value="1"></el-option>
                <el-option label="管理员" value="2"></el-option>
                <el-option label="司机" value="3"></el-option>

              </el-select>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>

            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="12"></el-col>
      </el-tab-pane>


    </el-tabs>

  </div>
</template>

<script>
  import * as qiniu from 'qiniu-js'
  import store from '../../../vuex/store'
  import Axios from 'axios'
  import storage from '../../../model/storage'
  import Qs from 'qs'

  export default {
    name: "MemberManagement",
    data() {
      return {
        activeName: 'first',


        fileList: [
          //   {
          //   name: '',
          //   url: ''
          // },
        ],


        ruleForm: {
          model: '',
          email: '',
          service: '',
          mname: '',


        },
        ruleForm2: {
          model: '',

          service: '',


        },
        rules: {
          model: [

            {required: true, message: '账号不能为空', trigger: 'blur'},
            {type: 'number', message: '账号必须为数字(工号)',trigger: ['blur', 'change']},
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          mname: [
            {required: true, message: '请输入姓名', trigger: 'change'}
          ],
          service: [
            {required: true, message: '请选择角色', trigger: 'change'}
          ],
        },
        rules2: {
          model: [

            {required: true, message: '账号不能为空', trigger: 'blur'},
            {type: 'number', message: '账号必须为数字(工号)'},
          ],


          service: [
            {required: true, message: '请输入新密码', trigger: 'blur'}
          ],
        }
      };
    },
    methods: {


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Axios.get('http://127.0.0.1:8000/addmember', {
              headers: {
                'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
                'Content-Type': 'application/json'
              },
              params: {
                'key': this.ruleForm.model + '_' + this.ruleForm.mname+ '_' +this.ruleForm.email+ '_' +this.ruleForm.service
              }

            },)
              .then(response => {


                  this.$message({
                    message: "添加成员成功",
                    duration: 2000,
                    type: "success"
                  });
                  this.$refs.ruleForm.resetFields();
                }
              )

              .catch(error => {

                this.$message({
                  message: "与服务器之间的通信受到阻塞，请稍后再试",
                  duration: 2000,
                  type: "warning"
                });

              });


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.fileList = [];

      },
      submitForm2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Axios.get('http://127.0.0.1:8000/changepassword', {
              headers: {
                'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
                'Content-Type': 'application/json'
              },
              params: {
                'key': this.ruleForm2.model + '_' + this.ruleForm2.service
              }

            },)
              .then(response => {


                  this.$message({
                    message: "修改成员密码成功",
                    duration: 2000,
                    type: "success"
                  });
                  this.$refs.ruleForm2.resetFields();
                }
              )

              .catch(error => {

                this.$message({
                  message: "与服务器之间的通信受到阻塞，请稍后再试",
                  duration: 2000,
                  type: "warning"
                });

              });


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm2(formName) {
        this.$refs[formName].resetFields();
        this.fileList = [];

      },


    },


  }
</script>
<style scoped>

</style>
