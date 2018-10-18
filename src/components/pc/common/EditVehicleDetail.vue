<template>
    <div id=""editVehicleDetail>

      <el-breadcrumb style="margin-top: 5px; margin-left: 7px;" separator-class="el-icon-arrow-right">

        <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/admin/editvehicle' }">修改/删除车辆</el-breadcrumb-item>
        <el-breadcrumb-item>详细信息</el-breadcrumb-item>

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
            <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>

          </el-form-item>

        </el-form>
      </el-col>

    </div>
</template>

<script>
  import * as qiniu from 'qiniu-js'
  import store from '../../../vuex/store'
  import Axios from 'axios'
  import storage from '../../../model/storage'
  import Qs from 'qs'

  export default {
    name: "EditVehicleDetail",
    data() {
      return {
        UpdateContent:{},
        ImgUrl:'',

        dialogVisible_1: false,
        dialogVisible_2: false,
        tableData: [
          //   {
          //   xinghao:'',
          //   chepai:'',
          //   renshu:'',
          //   chejia:'',
          //   fuwu:'',
          //   beizhu:'',
          //   tupian:'',
          // },
        ],
        upload_qiniu_addr: "http://pghapj5ae.bkt.clouddn.com/",
        UpData: {},
        PicFormat: '',
        HavePic: 'no',
        imageUrl: '',
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
        },
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
        OriginalruleForm: {
          model: '',
          PlateNumber: '',
          place: '',
          PeopleOfNumber: '',
          service: '',
          desc: '',


        },









      };
    },
    methods: {










      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.UpdateContent={};

            if (this.ruleForm.desc!=this.OriginalruleForm.desc){

              this.UpdateContent["beizhu"]=this.ruleForm.desc
            }
            if (this.ruleForm.model!=this.OriginalruleForm.model){
              this.UpdateContent["xinghao"]=this.ruleForm.model
            }
            if (this.ruleForm.PlateNumber!=this.OriginalruleForm.PlateNumber){
              this.UpdateContent["chepai"]=this.ruleForm.PlateNumber
            }
            if (this.ruleForm.place!=this.OriginalruleForm.place){
              this.UpdateContent["chejia"]=this.ruleForm.place
            }
            if (this.ruleForm.PeopleOfNumber!=this.OriginalruleForm.PeopleOfNumber){
              this.UpdateContent["renshu"]=this.ruleForm.PeopleOfNumber
            }
            if (this.ruleForm.service!=this.OriginalruleForm.service){
              this.UpdateContent["fuwu"]=this.ruleForm.service
            }
            if(this.OriginalruleForm.desc==null){
              if (this.UpdateContent["beizhu"]==''){
                delete(this.UpdateContent["beizhu"])
              }
            }
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




              var data = Qs.stringify(
                this.UpdateContent
              );
              Axios.patch('http://127.0.0.1:8000/carinfo/'+storage.storage.getS('id')+'/', data, {

                headers: {
                  'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
                  'Content-Type': 'application/x-www-form-urlencoded'
                },


              },)
                .then(response => {


                    this.$message({
                      message: "修改车辆成功",
                      duration: 2000,
                      type: "success"
                    });
                  this.$router.push({path:'/admin/editvehicle/'})

                  }
                )

                .catch(error => {
                  this.$message({
                    message: "修改车辆失败",
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

        console.log(this.UpdateContent)
        console.log(this.UpdateContent.fuwu)
        console.log(Object.keys(this.UpdateContent).length)

        this.imageUrl = this.upload_qiniu_addr + res.key;
        this.UpdateContent["tupian"]=this.imageUrl

        var data = Qs.stringify(this.UpdateContent);
        Axios.patch('http://127.0.0.1:8000/carinfo/'+storage.storage.getS('id')+'/', data, {
          headers: {
            'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
            'Content-Type': 'application/x-www-form-urlencoded'
          },


        },)
          .then(response => {


              this.$refs.upload.clearFiles();
              this.$message({
                message: "修改车辆成功",
                duration: 2000,
                type: "success"

              });


              this.imageUrl = '';
              this.HavePic = 'no';
              this.PicFormat = '';
              this.$router.push({path:'/admin/editvehicle/'})
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
    },





    mounted(){

        var fuwuFlag;
        if(storage.storage.getS('fuwu')=='年检到期提醒'){
            fuwuFlag='1'
        }else if(storage.storage.getS('fuwu')=='保险到期提醒'){
          fuwuFlag='2'
        }else if(storage.storage.getS('fuwu')=='年检、保险到期提醒'){
          fuwuFlag='3'
        }else if(storage.storage.getS('fuwu')=='都不需要'){
          fuwuFlag='4'
        }

        this.ruleForm.desc=storage.storage.getS('beizhu')
        this.ruleForm.model=storage.storage.getS('xinghao');
        this.ruleForm.PlateNumber=storage.storage.getS('chepai');
        this.ruleForm.place=storage.storage.getS('chejia');
        this.ruleForm.PeopleOfNumber=storage.storage.getS('renshu');
        this.ruleForm.service=fuwuFlag

        this.OriginalruleForm.desc=storage.storage.getS('beizhu')
        this.OriginalruleForm.model=storage.storage.getS('xinghao')
        this.OriginalruleForm.PlateNumber=storage.storage.getS('chepai')
        this.OriginalruleForm.place=storage.storage.getS('chejia')
        this.OriginalruleForm.PeopleOfNumber=storage.storage.getS('renshu')
        this.OriginalruleForm.service=fuwuFlag;
      //this.$refs.ruleForm.clearValidate();


        console.log(this.$refs)
        console.log(this.$refs.ruleForm)
        console.log(this.$refs.upload)

    },
    updated(){
      this.$refs.ruleForm.clearValidate();
    },



  }
</script>

<style scoped>

</style>
