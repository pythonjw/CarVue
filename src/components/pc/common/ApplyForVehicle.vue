<template>
  <div id="applyForVehicle">

    <el-dialog

      title="选择车辆"
      :visible.sync="dialogVisible_1"
      width="50%"
      :before-close="handleClose_1">

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

          prop="beizhu"

          label="备注"
        >
        </el-table-column>


        <el-table-column label="图片">
          <template slot-scope="scope">
            <el-button v-if="scope.row.tupian"
                       @click="GetImgUrl(scope.row)"
                       size="mini"
                       type="primary"
            >查看
            </el-button>

          </template>
        </el-table-column>

        <!--@click="EditCar(scope.row)"-->
        <el-table-column label="选择">
          <template slot-scope="scope">

            <el-radio :disabled="DisableCarId.indexOf(scope.row.id)!=-1" v-model="radio" :label=scope.row.id>选择
            </el-radio>
            <i @click="DisableDetail(scope.row)" v-if="DisableCarId.indexOf(scope.row.id)!=-1"
               class="el-icon-question"></i>
          </template>
        </el-table-column>


      </el-table>

      <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="SelectCarSave">保存</el-button>
  </span>
    </el-dialog>
    <el-dialog

      title="选择司机"
      :visible.sync="dialogVisible_2"
      width="50%"
      :before-close="handleClose_2">
      <el-col :span="12">
        <el-radio v-model="radioDriver" label="driver">
          <el-select v-model="dialogDriver1" :disabled="radioDriver!='driver'" placeholder="司机开车">
            <el-option v-for="i in allDrivers" v-if="DisableDriverId.indexOf(i.id)==-1" :label="i.name"
                       :value="i.id"></el-option>
          </el-select>
        </el-radio>

      </el-col>
      <el-col :span="12">
        <el-radio v-model="radioDriver" label="other">

          <el-select v-model="dialogDriver2" :disabled="radioDriver!='other'" placeholder="其他成员开车">
            <el-option v-for="i in otherDrivers" :label="i.name"
                       :value="i.id">
              <span style="float: left">{{i.name}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ i.username }}</span>
            </el-option>
          </el-select>
        </el-radio>

      </el-col>


      <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="SaveDialog">保存</el-button>
  </span>
    </el-dialog>
    <el-dialog

      title="查看图片"
      :visible.sync="dialogVisible_3"
      width="50%"
      :before-close="handleClose_3">
      <img width="100%;" :src="ImgUrl" alt="无">

      <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="dialogVisible_3 = false">关闭</el-button>
  </span>
    </el-dialog>
    <el-dialog

      title="时间冲突车辆具体使用情况"
      :visible.sync="dialogVisible_4"
      width="77%"
      :before-close="handleClose_4">
      <template>
        <el-table
          :data="tableData2"
          style="width: 100%">
          <el-table-column
            prop="xinghao"
            label="型号"
          >
          </el-table-column>
          <el-table-column
            prop="siji"
            label="司机"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="qishishijian"
            label="起始时间"
          >
          </el-table-column>
          <el-table-column
            prop="jieshushijian"
            label="结束时间"
          >
          </el-table-column>
          <el-table-column
            prop="status_code"
            label="状态"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="chufadi"
            label="出发地"
          >
          </el-table-column>
          <el-table-column
            prop="mudidi"
            label="目的地"
          >
          </el-table-column>
          <el-table-column
            prop="shenqingren"
            label="申请人"
            width="100px"
          >
          </el-table-column>

          <el-table-column
            prop="beizhu"
            label="备注"
          >
          </el-table-column>
        </el-table>
      </template>


      <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="dialogVisible_4 = false">关闭</el-button>
  </span>
    </el-dialog>
    <!--#############################################################################33-->
    <!--#############################################################################33-->
    <!--#############################################################################33-->


    <el-form style="margin-top: 22px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
             class="demo-ruleForm">
<div>
  <el-form-item style="display: inline-block" label="起始时间" prop="StartDate">
    <div class="block">
      <el-date-picker
        v-model="ruleForm.StartDate"
        :clearable="false"
        value-format="yyyy-MM-dd"
        type="date"
        @change="StartDateChange()"
        placeholder="选择日期">
      </el-date-picker>
    </div>

  </el-form-item>
  <el-form-item style="margin-left: -5%; display: inline-block" prop="StartTime">


    <el-time-select
      :clearable="false"
      @change="StartTimeChange()"
      v-model="ruleForm.StartTime"
      :picker-options="{
              start: '08:00',
              step: '00:60',
              end: '21:00'
          }"
      placeholder="选择时间">
    </el-time-select>
  </el-form-item>
</div>
<div>
        <el-form-item style="display: inline-block;"  label="结束时间" prop="StopDate">
        <div class="block">
          <el-date-picker
            v-model="ruleForm.StopDate"
            :clearable="false"
            type="date"
            @change="StopDateChange()"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :disabled="StopDateFlag"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </div>

      </el-form-item>
        <el-form-item style="margin-left: -5%; display: inline-block" prop="StopTime">


          <el-time-select
            @change="StopTimeChange()"
            :clearable="false"
            :disabled="StopTimeFlag"
            v-model="ruleForm.StopTime"
            :picker-options="{
              start: '08:00',
              step: '00:60',
              end: '21:00'
          }"
            placeholder="选择时间">
          </el-time-select>
        </el-form-item></div>
      
      <el-form-item label="选择车辆" prop="car">
        <el-select v-model="ruleForm.car" :disabled="SelectCarDetail" placeholder="请选择车辆">
          <el-option v-for="i in SelectCarList" v-if="DisableCarId.indexOf(i.id)==-1" :label="i.xinghao"
                     :value="i.id"></el-option>
        </el-select>
        <el-button @click="SelectCarClick()" :disabled="SelectCar" type="primary" icon="el-icon-search"></el-button>
      </el-form-item>

      <el-form-item label="选择司机" prop="driver">
        <el-select v-model="ruleForm.driver" :disabled="SelectDriverDetail" placeholder="请选择司机">
          <el-option v-for="i in otherDrivers" :label="i.name" v-if="radioDriver=='other'"
                     :value="i.id">
            <span style="float: left">{{i.name}}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ i.username }}</span>
          </el-option>

          <el-option v-for="i in allDrivers" v-if="DisableDriverId.indexOf(i.id)==-1&&radioDriver=='driver'"
                     :label="i.name"
                     :value="i.id"></el-option>


        </el-select>
        <el-button @click="SelectDriverClick" :disabled="SelectDriver" type="primary" icon="el-icon-search"></el-button>
      </el-form-item>
      <el-form-item label="始发地" prop="shifadi">
        <el-input style="width: 35%" v-model="ruleForm.shifadi" clearable></el-input>
      </el-form-item>
      <el-form-item label="目的地" prop="mudidi">
        <el-input style="width: 35%" v-model="ruleForm.mudidi" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          style="width: 35%;"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="限500字以内，备注可不填"
          v-model="ruleForm.desc">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即申请</el-button>


      </el-form-item>


    </el-form>


  </div>
</template>

<script>
  import * as qiniu from 'qiniu-js'
  import store from '../../../vuex/store'
  import Axios from 'axios'
  import storage from '../../../model/storage'
  import Qs from 'qs'

  export default {
    name: "ApplyForVehicle",
    data() {
      return {
        TestDate:'2018-10-10',
        CompareDate:'',
        StopDateFlag:true,
        StopTimeFlag:true,
        pickerOptions1: {
          disabledDate:(time)=> {

             // starttime =this.ruleForm.StartDate.replace(new RegExp("-","gm"),"/")   
             // starttime = starttime.replace(new RegExp("-","gm"),"/");   
             // let starttimeHaoMiao = (new Date(starttime)).getTime(); //得到毫秒数

            // var test1='2018-10-23';

            return time.getTime() < (new Date(this.ruleForm.StartDate.replace(new RegExp("-","gm"),"/"))).getTime();
            //return time.getTime() < this.ruleForm.StartDate
          },

        },
        allDrivers: [],
        otherDrivers: [],
        radioDriver: '',
        DisableDriverId: [],
        DisableCarId: [],
        DisableCarList: [],
        SelectCarList: [],
        dialogDriver1: '',
        dialogDriver2: '',
        radio: '',

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
        tableData2: [
          //   {
          //   xinghao:'',
          //   siji:'',
          //   qishishijian:'',
          //   jieshushijian:'',
          //   chufadi:'',
          //   mudidi:'',
          //   shenqingren:'',
          //   beizhu:'',
          //   status_code:'',
          // },
        ],
        dialogVisible_1: false,
        dialogVisible_2: false,
        dialogVisible_3: false,
        dialogVisible_4: false,
        SelectCar: true,
        SelectDriver: true,
        SelectCarDetail: true,
        SelectDriverDetail: true,

        ImgUrl: '',
        fileList: [
          //   {
          //   name: '',
          //   url: ''
          // },
        ],


        ruleForm: {
          StartDate: '',
          StartTime: '',
          StopDate: '',
          StopTime: '',
          car: '',
          driver: '',
          shifadi: '',
          mudidi: '',
          desc: '',


        },
        rules: {
          StartDate: [
            {required: true, message: '请选择起始日期', trigger: 'blur'}
          ],
          StartTime: [
            {required: true, message: '请选择起始时间', trigger: 'blur'}
          ],
          StopDate: [
            {required: true, message: '请选择结束日期', trigger: 'blur'}
          ],
          StopTime: [
            {required: true, message: '请选择结束时间', trigger: 'blur'}
          ],

          driver: [
            {required: true, message: '请选择司机', trigger: 'change'}
          ],
          car: [
            {required: true, message: '请选择车辆', trigger: 'change'}
          ],
          mudidi: [
            {required: true, message: '请输入目的地', trigger: 'blur'}
          ],
          shifadi: [
            {required: true, message: '请选择始发地', trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
test(){

  console.log(this.SelectCarList)
},
      StartDateChange(){
        this.SelectCar=true
        this.SelectDriver=true
        this.ruleForm.car=''
        this.ruleForm.driver=''
        this.SelectCarDetail = true
        this.SelectDriverDetail=true



        if (this.ruleForm.StartDate!=''&&this.ruleForm.StartTime!=''){
          this.StopDateFlag=false;
          this.StopTimeFlag=false;
          if(this.ruleForm.StopDate!=''&&this.ruleForm.StopTime!=''){
            if (this.ruleForm.StartDate==this.ruleForm.StopDate){
              if(this.ruleForm.StopTime<=this.ruleForm.StartTime){
                alert('结束时间必须大于起始时间')
                this.ruleForm.StopTime=''
              }
            }
            if (this.ruleForm.StartDate>this.ruleForm.StopDate){
              this.ruleForm.StopDate=''
              this.ruleForm.StopTime=''
            }
          }
        }
      if (this.ruleForm.StartDate!=''&&this.ruleForm.StartTime!=''&&this.ruleForm.StopDate!=''&&this.ruleForm.StopTime!=''){
        this.SelectCar=false
        this.SelectDriver=false
      }
      },
      StartTimeChange(){
        this.SelectCar=true
        this.SelectDriver=true
        this.ruleForm.car=''
        this.ruleForm.driver=''
        this.SelectCarDetail = true
        this.SelectDriverDetail=true
        if (this.ruleForm.StartDate!=''&&this.ruleForm.StartTime!=''){
          this.StopDateFlag=false;
          this.StopTimeFlag=false;
          if (this.ruleForm.StartDate==this.ruleForm.StopDate){
            if (this.ruleForm.StopTime<=this.ruleForm.StartTime){
              alert('结束时间必须大于起始时间')
              this.ruleForm.StopTime=''
            }
          }
        }
        if (this.ruleForm.StartDate!=''&&this.ruleForm.StartTime!=''&&this.ruleForm.StopDate!=''&&this.ruleForm.StopTime!=''){
          this.SelectCar=false
          this.SelectDriver=false
        }
      },

      StopDateChange(){
        this.SelectCar=true
        this.SelectDriver=true
        this.ruleForm.car=''
        this.ruleForm.driver=''
        this.SelectCarDetail = true
        this.SelectDriverDetail=true
        if (this.ruleForm.StopDate!=''&&this.ruleForm.StopTime!=''){
          if (this.ruleForm.StartDate==this.ruleForm.StopDate){
              if (this.ruleForm.StartTime>=this.ruleForm.StopTime){
                alert('起始时间必须小于结束时间')
                this.ruleForm.StopTime=''
              }
          }
        }
        if (this.ruleForm.StartDate!=''&&this.ruleForm.StartTime!=''&&this.ruleForm.StopDate!=''&&this.ruleForm.StopTime!=''){
          this.SelectCar=false
          this.SelectDriver=false
        }
      },
      StopTimeChange(){
        this.SelectCar=true
        this.SelectDriver=true
        this.ruleForm.car=''
        this.ruleForm.driver=''
        this.SelectCarDetail = true
        this.SelectDriverDetail=true
        if (this.ruleForm.StopDate!=''&&this.ruleForm.StopTime!=''){
          if (this.ruleForm.StartDate==this.ruleForm.StopDate){
            if (this.ruleForm.StartTime>=this.ruleForm.StopTime){
              alert('起始时间必须小于结束时间')
              this.ruleForm.StopTime=''
            }
          }
        }
        if (this.ruleForm.StartDate!=''&&this.ruleForm.StartTime!=''&&this.ruleForm.StopDate!=''&&this.ruleForm.StopTime!=''){
          this.SelectCar=false
          this.SelectDriver=false
        }
      },

      SaveDialog() {
        if (this.radioDriver != '') {
          this.SelectDriverDetail = false
        }
        if (this.radioDriver == 'driver') {
          this.ruleForm.driver = this.dialogDriver1
        } else if (this.radioDriver == 'other') {
          this.ruleForm.driver = this.dialogDriver2
        }


        this.dialogVisible_2 = false

      },
      SelectCarSave() {
        if (this.radio != '') {
          this.SelectCarDetail = false
          this.ruleForm.car = this.radio
        }


        this.dialogVisible_1 = false
      },
      DisableDetail(row) {

        this.tableData2 = []

        for (let i of this.DisableCarList) {


          if (i.carinfo_id == row.id) {

            if (i.status_code == '2') {
              i.status_code = '待审批'

            } else if (i.status_code == '3') {
              i.status_code = '进行中'
            }
            this.tableData2.push(i)
          }

        }
        console.log()
        this.dialogVisible_4 = true

      },
      GetImgUrl(row) {
        this.ImgUrl = '';
        this.ImgUrl = row.tupian;
        this.dialogVisible_3 = true;
      },
      SelectCarClick() {
        this.radio = '';

        Axios.get('http://127.0.0.1:8000/queryusecartime', {
          headers: {
            'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
            'Content-Type': 'application/json'
          },
          params: {
            'key': this.ruleForm.StartDate + ' ' + this.ruleForm.StartTime+ '_' +this.ruleForm.StopDate+ ' ' +this.ruleForm.StopTime
          }

        },)
          .then(response => {

              // console.log(this.ruleForm.date[0])
              // var date = new Date(this.ruleForm.date[0]);
              // var date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
              // console.log(date_value)
              this.DisableCarId = [];

              this.DisableCarList = response.data
              console.log(this.DisableCarList)
              for (let i of response.data) {

                this.DisableCarId.push(
                  i.carinfo_id
                )

              }

              this.dialogVisible_1 = true
            }
          )

          .catch(error => {


            this.$message({
              message: "与服务器的通信受到了阻塞，请稍后重试",
              duration: 2000,
              type: "warning"
            });

          });


      },
      SelectDriverClick() {

        this.radioDriver = '';
        this.dialogDriver1=''
        this.dialogDriver2=''
        Axios.get('http://127.0.0.1:8000/querydriver', {
          headers: {
            'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
            'Content-Type': 'application/json'
          },
          params: {
            'key': this.ruleForm.StartDate + ' ' + this.ruleForm.StartTime+ '_' +this.ruleForm.StopDate+ ' ' +this.ruleForm.StopTime
          }

        },)
          .then(response => {
              console.log(response.data)
              this.allDrivers = [];
              this.otherDrivers = [];
              this.DisableDriverId = [];
              for (let i of response.data) {


                if (i.siji_id != undefined || i.siji_id != null) {
                  this.DisableDriverId.push(
                    i.siji_id
                  );
                }

                if (i.allDrivers != undefined || i.allDrivers != null) {
                  this.allDrivers = i.allDrivers
                }
                if (i.otherDrivers != undefined || i.otherDrivers != null) {
                  this.otherDrivers = i.otherDrivers
                }
              }
              console.log(this.allDrivers)
              console.log(this.otherDrivers)
              console.log(this.DisableDriverId)
              this.dialogVisible_2 = true
            }
          )

          .catch(error => {


            this.$message({
              message: "与服务器的通信受到了阻塞，请稍后重试",
              duration: 2000,
              type: "warning"
            });

          });


      },




      handleClose_1(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
        // done();

      },
      handleClose_2(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
        // done();

      },
      handleClose_3(done) {
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
        done();

      },
      handleClose_4(done) {
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
        done();

      },


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var DataOrignal = {
              status_code: '2',
              using_time_start: this.ruleForm.StartDate+' '+this.ruleForm.StartTime,
              using_time_stop: this.ruleForm.StopDate+' '+this.ruleForm.StopTime,
              carinfo: this.ruleForm.car,
              shenqingren_userinfo: storage.cookie.getCookie('user_id'),
              beizhu: this.ruleForm.desc,
              chufadi: this.ruleForm.shifadi,
              mudidi: this.ruleForm.mudidi,
              siji_userinfo: this.ruleForm.driver
            };



            var data = Qs.stringify(DataOrignal);
            Axios.post('http://127.0.0.1:8000/usecaradd/', data, {

              headers: {
                'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
                'Content-Type': 'application/x-www-form-urlencoded'
              },


            },)
              .then(response => {


                  this.$message({
                    message: "申请成功",
                    duration: 2000,
                    type: "success"
                  });


                  if (storage.cookie.getCookie('User_Type') == '2') {
                    this.$router.push({path: '/admin/handleapplication'})
                  } else if (storage.cookie.getCookie('User_Type') == '1') {
                    this.$router.push({path: '/ordinary/applicationresult'})
                  }


                }
              )

              .catch(error => {
                this.$message({
                  message: "申请失败，请稍后再试",
                  duration: 2000,
                  type: "warning"
                });


              });


          } else {
            console.log('error submit!!');
            return false;
          }
        })
        ;
      },


    },
    mounted() {



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
              this.SelectCarList.push({xinghao: i.xinghao, id: i.id});

              this.tableData.push(
                {
                  id: i.id,
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
