<template>
  <div id="addVehicle" style="">
    <el-breadcrumb style="margin-top: 5px; margin-left: 7px;" separator-class="el-icon-arrow-right">

      <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
      <el-breadcrumb-item >添加车辆</el-breadcrumb-item>

    </el-breadcrumb>



        <el-col :span="12" style="margin-top: 27px;">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="型号" prop="model">
              <el-input v-model="ruleForm.model" clearable></el-input>
            </el-form-item>
            <el-form-item label="车牌号" prop="PlateNumber">
              <el-input v-model="ruleForm.PlateNumber" clearable></el-input>
            </el-form-item>
            <el-form-item label="车架号" prop="place">
              <el-input v-model="ruleForm.place" clearable></el-input>
            </el-form-item>
            <el-form-item label="可乘坐人数" prop="PeopleOfNumber">
              <el-input v-model="ruleForm.PeopleOfNumber" clearable></el-input>
            </el-form-item>
            <el-form-item label="提醒服务" prop="service">
              <el-select v-model="ruleForm.service" placeholder="请选择提醒服务">
                <el-option label="年检到期提醒" value="1"></el-option>
                <el-option label="保险到期提醒" value="2"></el-option>
                <el-option label="年检、保险到期提醒" value="3"></el-option>
                <el-option label="都不需要" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="限500字以内，备注可不填"
                v-model="ruleForm.desc">
              </el-input>
            </el-form-item>


            <el-form-item label="车辆图片">
              <el-upload
                class="upload-demo"
                accept="image/jpeg,image/png,image/bmp"
                ref="upload"
                action="http://upload-z1.qiniup.com"
                :before-upload="BeforeUpload"
                list-type="picture-card"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                :on-success="handleAvatarSuccess"
                :on-error="handleError"
                :multiple="false"
                :limit=1
                :on-change="OnChange"
                :data=this.UpData

              >

                <i slot="trigger" class="el-icon-plus"></i>
                <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload2()">上传到服务器-->
                <!--</el-button>-->
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>

            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="12"></el-col>











  </div>
</template>

<script>
  import * as qiniu from 'qiniu-js'
  import store from '../../../vuex/store'
  import Axios from 'axios'
  import storage from '../../../model/storage'
  import Qs from 'qs'

  export default {
    name: "AddVehicle",
    data() {
      return {


        upload_qiniu_addr: "http://pghapj5ae.bkt.clouddn.com/",
        UpData: {},
        PicFormat: '',
        HavePic: 'no',
        imageUrl: '',

        fileList: [
          //   {
          //   name: '',
          //   url: ''
          // },
        ],


        ruleForm: {
          model: '',
          PlateNumber: '',
          place: '',
          PeopleOfNumber: '',
          service: '',
          desc: '',


        },
        rules: {
          model: [
            {required: true, message: '请输入车辆型号', trigger: 'blur'},
          ],
          PlateNumber: [
            {required: true, message: '请输入车牌号', trigger: 'blur'}
          ],
          place: [
            {required: true, message: '请输入车架号', trigger: 'blur'}
          ],
          PeopleOfNumber: [
            {required: true, message: '请输入可乘坐人数', trigger: 'blur'}
          ],
          service: [
            {required: true, message: '请选择服务', trigger: 'change'}
          ],
        }
      };
    },
    methods: {



      BeforeUpload(file) {
        console.log(this.UpData)
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isLt2M = file.size / 1024 / 1024 < 1;

        if (!isJPG && !isPNG && !isBMP) {
          this.$message.error('上传图片必须是JPG/PNG/BMP 格式!');
        }
        if (!isLt2M) {
          this.$message.error('图片大小不能超过 1MB!');
        }
        return (isJPG || isBMP || isPNG) && isLt2M;
      },
      handleAvatarSuccess: function (res, file) {


        this.imageUrl = this.upload_qiniu_addr + res.key;


        var data = Qs.stringify({
          renshu: this.ruleForm.PeopleOfNumber,
          chepai: this.ruleForm.PlateNumber,
          xinghao: this.ruleForm.model,
          chejia: this.ruleForm.place,
          tupian: this.imageUrl,
          beizhu: this.ruleForm.desc,
          fuwu: this.ruleForm.service,
          PicHash: res.hash
        });
        Axios.post('http://127.0.0.1:8000/carinfo/', data, {

          headers: {
            'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
            'Content-Type': 'application/x-www-form-urlencoded'
          },


        },)
          .then(response => {


              this.$refs.upload.clearFiles();
              this.$message({
                message: "添加车辆成功",
                duration: 2000,
                type: "success"

              });
              this.$refs.ruleForm.resetFields();
              this.ruleForm.desc = '';
              this.imageUrl = '';
              this.HavePic = 'no';
              this.PicFormat = '';

            }
          )

          .catch(error => {
            this.$message({
              message: "与服务器之前的通信遇到阻塞，请稍后再试",
              duration: 2000,
              type: "warining"

            });
            this.imageUrl = '';
            this.$refs.upload.clearFiles();
            this.HavePic = 'no';
            this.PicFormat = '';
          });

      },
      handleError: function (res) {

        //console.log(this.QiNiuToken)
        //console.log(this.QiNiuKey)
        this.$message({
          message: "上传图片失败，请重试",
          duration: 2000,
          type: "warning"

        });
        this.$refs.upload.clearFiles();
        this.HavePic = 'no';
        this.PicFormat = '';


      },
      OnChange(file, fileList) {
        this.HavePic = 'yes';
        this.PicFormat = file.name
      },
      // handleClick(tab, event) {
      //   console.log(tab, event);
      // },

      handleRemove(file, fileList) {
        this.HavePic = 'no'
      },


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.HavePic == 'yes') {
              Axios.get('http://127.0.0.1:8000/qiniutoken', {
                headers: {
                  'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
                  'Content-Type': 'application/json'
                },
                params: {
                  'key': this.ruleForm.PlateNumber + '_' + this.PicFormat
                }

              },)
                .then(response => {


                    this.UpData = {token: response.data.token, key: response.data.key};

                    // setTimeout(function () {
                    //   this.$refs.upload.submit()
                    // },100);
                    //  this.$refs.upload.submit()
                    //this.$options.methods.submitUpload2()


                  }
                ).then(responsse => {

                this.$refs.upload.submit()
              })

                .catch(error => {
                  this.$refs.upload.clearFiles();
                  this.HavePic = 'no';
                  this.PicFormat = '';
                  this.$message({
                    message: "上传图片凭证获取失败",
                    duration: 2000,
                    type: "warning"
                  });

                });

            } else if (this.HavePic == 'no') {
              var data = Qs.stringify({
                renshu: this.ruleForm.PeopleOfNumber,
                chepai: this.ruleForm.PlateNumber,
                xinghao: this.ruleForm.model,
                chejia: this.ruleForm.place,
                beizhu: this.ruleForm.desc,
                fuwu: this.ruleForm.service,
              });
              Axios.post('http://127.0.0.1:8000/carinfo/', data, {

                headers: {
                  'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
                  'Content-Type': 'application/x-www-form-urlencoded'
                },


              },)
                .then(response => {


                    this.$message({
                      message: "添加车辆成功",
                      duration: 2000,
                      type: "success"
                    });
                    this.$refs.ruleForm.resetFields();
                    this.ruleForm.desc = '';
                  }
                )

                .catch(error => {
                  this.$message({
                    message: "添加车辆失败",
                    duration: 2000,
                    type: "warning"
                  });


                });


            }


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.fileList = [];
        this.ruleForm.desc = '';
        storage.storage.removeS('PictureName')
      },

    },


  }
</script>

<style scoped>

</style>
