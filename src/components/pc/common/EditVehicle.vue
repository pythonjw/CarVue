<template>



    <div id="editVehicle">
      <el-breadcrumb style="margin-top: 5px; margin-left: 7px;" separator-class="el-icon-arrow-right">

        <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
        <el-breadcrumb-item >修改/删除车辆</el-breadcrumb-item>

      </el-breadcrumb>
      <el-dialog
        title="查看图片"
        :visible.sync="dialogVisible_1"
        width="50%"
        :before-close="handleClose_1">
        <img width="100%;" :src="ImgUrl" alt="无">

        <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="dialogVisible_1 = false">关闭</el-button>
  </span>
      </el-dialog>

      <el-dialog
        title="编辑车辆"
        :visible.sync="dialogVisible_2"
        width="50%"
        :before-close="handleClose_2">

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
            <el-button @click="test">test</el-button>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="EditSave">保存</el-button>
  </span>
      </el-dialog>





      <el-table

        :data="tableData"


        style="width: 100%">
        <el-table-column
          type="index"
          >
        </el-table-column>
        <el-table-column
          prop="xinghao"
          label="型号"
          >
        </el-table-column>
        <el-table-column
          prop="chepai"
          label="车牌"
          >
        </el-table-column>
        <el-table-column
          prop="renshu"
          label="可乘坐人数"
          >
        </el-table-column>
        <el-table-column
          prop="chejia"
          label="车架"
          >
        </el-table-column>
        <el-table-column
          prop="fuwu"
          label="已选服务"
          >
        </el-table-column>
        <el-table-column
          prop="beizhu"

          label="备注"
          >
        </el-table-column>


        <el-table-column label="图片" >
          <template slot-scope="scope">
            <el-button v-if="scope.row.tupian"
              @click="GetImgUrl(scope.row)"
              size="mini"
              type="primary"
            >查看</el-button>

          </template>
        </el-table-column>

        <!--@click="EditCar(scope.row)"-->
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="EditCar(scope.row)"

              >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="DeleteCar(scope.row)"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              >删除</el-button>
          </template>
        </el-table-column>



      </el-table>
    </div>
</template>

<script>
  import * as qiniu from 'qiniu-js'
  import store from '../../../vuex/store'
  import Axios from 'axios'
  import storage from '../../../model/storage'
  import Qs from 'qs'

  export default {
    name: "EditVehicle",
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
        upload_qiniu_addr: "http://pex9zs6hv.bkt.clouddn.com/",
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
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      DeleteCar(row){
        Axios.delete('http://127.0.0.1:8000/carinfo/'+row.id+'/', {
          headers: {
            'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
            'Content-Type': 'application/json'
          },

        },)
          .then(response => {
            this.$message({
              message: "删除车辆成功",
              duration: 2000,
              type: "success"
            });
            this.$router.push({path:'/admin/editvehicle'})

            }
          )
          .catch(error => {
            this.$message({
              message: "与服务器的通信受到阻塞，删除失败",
              duration: 2000,
              type: "warning"
            });

          });

      },
      EditSave(){

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
        console.log(this.UpdateContent)

        console.log(Object.keys(this.UpdateContent).length)


        // this.dialogVisible_2 = false
      },

      // EditCar(row){
      //
      //   var fuwuFlag;
      //   if(row.fuwu=='年检到期提醒'){
      //       fuwuFlag='1'
      //   }else if(row.fuwu=='保险到期提醒'){
      //     fuwuFlag='2'
      //   }else if(row.fuwu=='年检、保险到期提醒'){
      //     fuwuFlag='3'
      //   }else if(row.fuwu=='都不需要'){
      //     fuwuFlag='4'
      //   }
      //
      //   this.ruleForm.desc=row.beizhu;
      //   this.ruleForm.model=row.xinghao;
      //   this.ruleForm.PlateNumber=row.chepai;
      //   this.ruleForm.place=row.chejia;
      //   this.ruleForm.PeopleOfNumber=row.renshu;
      //   this.ruleForm.service=fuwuFlag
      //
      //   this.OriginalruleForm.desc=row.beizhu;
      //   this.OriginalruleForm.model=row.xinghao;
      //   this.OriginalruleForm.PlateNumber=row.chepai;
      //   this.OriginalruleForm.place=row.chejia;
      //   this.OriginalruleForm.PeopleOfNumber=row.renshu;
      //   this.OriginalruleForm.service=fuwuFlag;
      //
      //
      //   this.dialogVisible_2=true;
      //   console.log(this.$refs)
      //   console.log(this.$refs.ruleForm)
      //   console.log(this.$refs.upload)
      //  this.$refs.ruleForm.clearValidate();
      //
      // },
      EditCar(row){
        // this.$store.commit('ClearEditVehicleDetail')
        // this.$store.commit('AddEditVehicleDetail',{'id':row.id})
        // this.$store.commit('AddEditVehicleDetail',{'xinghao':row.xinghao})
        // this.$store.commit('AddEditVehicleDetail',{'chepai':row.chepai})
        // this.$store.commit('AddEditVehicleDetail',{'chejia':row.chejia})
        // this.$store.commit('AddEditVehicleDetail',{'renshu':row.renshu})
        // this.$store.commit('AddEditVehicleDetail',{'fuwu':row.fuwu})
        // this.$store.commit('AddEditVehicleDetail',{'beizhu':row.beizhu})
        // console.log(this.$store.state.EditVehicleDetail)
        storage.storage.removeS('id')
        storage.storage.removeS('xinghao')
        storage.storage.removeS('chepai')
        storage.storage.removeS('chejia')
        storage.storage.removeS('renshu')
        storage.storage.removeS('fuwu')
        storage.storage.removeS('beizhu')

        storage.storage.setS('id',row.id)
        storage.storage.setS('xinghao',row.xinghao)
        storage.storage.setS('chepai',row.chepai)
        storage.storage.setS('chejia',row.chejia)
        storage.storage.setS('renshu',row.renshu)
        storage.storage.setS('fuwu',row.fuwu)
        storage.storage.setS('beizhu',row.beizhu)
        this.$router.push({path:'/admin/editvehicleDetail'})

      },
      GetImgUrl(row){
        this.ImgUrl='';
        this.ImgUrl=row.tupian;
        this.dialogVisible_1=true;
      },


      handleClose_1(done) {
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
        done();

      },
      handleClose_2(done) {
        //console.log(this.$refs)
        this.$refs.ruleForm.clearValidate();
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});


      },
      test(){

        this.$refs.ruleForm.clearValidate();

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
    },





    mounted(){
      Axios.get('http://127.0.0.1:8000/carinfo/', {
        headers: {
          'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
          'Content-Type': 'application/json'
        },

      },)
        .then(response => {
            this.tableData = [];
            for (let i of response.data) {
              var service;
              if (i.fuwu == '1') {
                service = '年检到期提醒'
              } else if (i.fuwu == '2') {
                service = '保险到期提醒'
              } else if (i.fuwu == '3') {
                service = '年检、保险到期提醒'
              } else if (i.fuwu == '4') {
                service = '都不需要'
              }
              this.tableData.push(
                {
                  id:i.id,
                  xinghao: i.xinghao,
                  chepai: i.chepai,
                  renshu: i.renshu,
                  chejia: i.chejia,
                  fuwu: service,
                  beizhu: i.beizhu,
                  tupian: i.tupian,

                },
              )

            }


          }
        )
        .catch(error => {
          this.$message({
            message: "从数据库获取数据失败",
            duration: 2000,
            type: "warning"
          });

        });
    }

  }
</script>

<style scoped>

</style>
