<template>
  <div id="vehicleRecode">


    <el-row>

      <el-col :span="9">

        <div>申请时间：</div>
        <div style="margin-left: 1%;margin-top: 1%">
          <el-radio v-model="time" label="1">全部时间</el-radio>
        </div>
        <div style="margin-left: 1%;margin-top: 1%"><el-radio v-model="time" label="2">
        <el-date-picker
        :disabled="time!=2"
        :clearable="false"

        v-model="date"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:30:30', '12:30:30']">
        </el-date-picker>
        </el-radio>
        </div>

      </el-col>


      <el-col :span="5">
        <div>选择申请人：</div>
        <div style="margin-top: 1%">
          <el-radio v-model="people" label="1">全部申请人</el-radio>
        </div>
        <div style="margin-top: 3%">
          <el-radio v-model="people" label="2">
            <el-select v-model="people2" placeholder="请选择" :disabled="people!=2">
              <el-option
                v-for="item in peoples"

                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>

          </el-radio>
        </div>
      </el-col>


      <el-col :span="10">
        <div>选择车辆：</div>
        <div style="margin-top: 1%">
          <el-radio v-model="car" label="1">全部车辆</el-radio>
        </div>
        <div style="margin-top: 1%;display: inline-block;">
          <el-radio v-model="car" label="2">
            <el-select :disabled="car!=2" v-model="car2" clearable placeholder="请选择">
              <el-option

                v-for="item in cars"

                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-radio>
        </div>
        <el-button @click="SearchVehicleRecode()" style="margin-left:7%" type="primary" icon="el-icon-search">搜索
        </el-button>
        <el-button @click="SearchVehicleExcel()" style="margin-left:3%" type="success">导出EXCEL</el-button>


      </el-col>


    </el-row>


    <el-row style="margin-top: 1%">
      <el-col :span="24">

        <el-table
          v-if="tableFlag"
          :data="tableData5"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="起始时间：">
                  <span>{{ props.row.qishishijian }}</span>
                </el-form-item>
                <el-form-item label="结束时间：">
                  <span>{{ props.row.jieshushijian }}</span>
                </el-form-item>
                <el-form-item label="司机：">
                  <span>{{ props.row.siji }}</span>
                </el-form-item>
                <el-form-item label="备注：">
                  <span>{{ props.row.beizhu }}</span>
                </el-form-item>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="申请时间"
            prop="shenqingshijian"

          >
          </el-table-column>
          <el-table-column
            label="车辆型号"
            prop="cheliangxinghao"
            width="180px"
          >
          </el-table-column>
          <el-table-column
            label="申请人"
            prop="shenqingren"
          >
          </el-table-column>
          <el-table-column
            label="始发地"
            prop="shifadi"
          >
          </el-table-column>
          <el-table-column
            label="目的地"
            prop="mudidi"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            prop="zhuangtai"
          >
          </el-table-column>
        </el-table>


        <!--<el-pagination-->
        <!--style="margin-top: 1%;"-->
        <!--background-->
        <!--layout="prev, pager, next"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:total=PageCount>-->
        <!--</el-pagination>-->


      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as qiniu from 'qiniu-js'
  import store from '../../../vuex/store'
  import Axios from 'axios'
  import storage from '../../../model/storage'
  import Qs from 'qs'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {
    name: "VehicleRecode",
    mounted() {
      this.time = '1';
      this.people = '1';
      this.car = '1';
      Axios.get('http://127.0.0.1:8000/queryalldriverandcar', {
        headers: {
          'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
          'Content-Type': 'application/json'
        }
      })
        .then(response => {


            for (let i of response.data[0]) {
              this.peoples.push(
                {
                  id: i.id,
                  label: i.name,
                  value: i.username,
                },
              )

            }

            for (let i of response.data[1]) {
              this.cars.push(
                {
                  value: i.id,
                  label: i.xinghao,

                },
              )

            }


          }
        )
        .catch(error => {
          this.$message({
            message: "与服务器的通信受到了阻塞，请刷新页面",
            duration: 2000,
            type: "warning"
          });
        });


    },
    data() {
      return {
        tableFlag:false,
        StartDateFlag:true,
        StartTimeFlag:true,
        StopDateFlag:true,
        StopTimeFlag:true,
        PageCount: '',
        StartDate:'',
        StartTime:'',
        StopDate:'',
        StopTime:'',
        tableData5: [
          //      {
          //   shenqingshijian:'kk',
          // qishishijian: 'kk',
          // jieshushijian: 'kk',
          // siji: 'kk',
          // beizhu: 'kk',
          // cheliangxinghao: 'kk',
          // shenqingren: 'kk',
          // shifadi:'kk',
          // mudidi:'kk',
          // zhuangtai:'kk',
          //    },

        ],
        time: '',
        date: '',
        people: '',
        peoples: [

          // {
          //   value: 'Guangzhou',
          //   label: '广州'
          // },


        ],
        people2: '',
        car: '',
        cars: [
          // {
          //   value: '选项5',
          //   label: '北京烤鸭'
          // }
        ],
        car2: ''
      }
    },
    methods: {

      SearchVehicleRecode() {
        this.tableFlag=true;
        var date;
        var people;
        var car;
        if (this.time == '1') {
          date = 'all'
        } else if (this.time == '2') {
          if (this.date == '' || this.date == undefined || this.date == null) {
            date = 'all'
          } else if (this.date != '' && this.date != undefined && this.date != null) {
            var date1 = new Date(this.date[0]);
            var month1 = date1.getMonth() + 1;
            var strDate1 = date1.getDate();
            var strHours1 = date1.getHours();
            var strMinutes1 = date1.getMinutes();
            var strSeconds1 = date1.getSeconds();
            if (month1 >= 1 && month1 <= 9) {
              month1 = "0" + month1;
            }
            if (strDate1 >= 0 && strDate1 <= 9) {
              strDate1 = "0" + strDate1;
            }
            if (strHours1 >= 0 && strHours1 <= 9) {
              strHours1 = "0" + strHours1;
            }
            if (strMinutes1 >= 0 && strMinutes1 <= 9) {
              strMinutes1 = "0" + strMinutes1;
            }
            if (strSeconds1 >= 0 && strSeconds1 <= 9) {
              strSeconds1 = "0" + strSeconds1;
            }
            var date11 = date1.getFullYear() + '-' + month1 + '-' + strDate1 + ' '
              + strHours1 + ':' + strMinutes1 + ':' + strSeconds1;
            ///////////////////////////////////////////////////////////////////
            var date2 = new Date(this.date[1]);
            var month2 = date2.getMonth() + 1;
            var strDate2 = date2.getDate();
            var strHours2 = date2.getHours();
            var strMinutes2 = date2.getMinutes();
            var strSeconds2 = date2.getSeconds();
            if (month2 >= 1 && month2 <= 9) {
              month2 = "0" + month2;
            }
            if (strDate2 >= 0 && strDate2 <= 9) {
              strDate2 = "0" + strDate2;
            }
            if (strHours2 >= 0 && strHours2 <= 9) {
              strHours2 = "0" + strHours2;
            }
            if (strMinutes2 >= 0 && strMinutes2 <= 9) {
              strMinutes2 = "0" + strMinutes2;
            }
            if (strSeconds2 >= 0 && strSeconds2 <= 9) {
              strSeconds2 = "0" + strSeconds2;
            }
            var date22 = date2.getFullYear() + '-' + month2 + '-' + strDate2 + ' '
              + strHours2 + ':' + strMinutes2 + ':' + strSeconds2;
            date = date11 + '_' + date22
          }


        }

        if (this.people == '1') {
          people = 'all'
        } else if (this.people == '2') {
          if (this.people2 == '' || this.people2 == undefined || this.people2 == null) {
            people = 'all'
          } else if (this.people2 != '' && this.people2 != undefined && this.people2 != null) {
            people = this.people2
          }


        }


        if (this.car == '1') {
          car = 'all'
        } else if (this.car == '2') {
          if (this.car2 == '' || this.car2 == undefined || this.car2 == null) {
            car = 'all'
          } else if (this.car2 != '' && this.car2 != undefined && this.car2 != null) {
            car = this.car2
          }


        }

        Axios.get('http://127.0.0.1:8000/vehiclerecodedjango', {
          headers: {
            'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
            'Content-Type': 'application/json'
          },
          params: {
            'key': date + '__' + people + '__' + car
          }

        },)
          .then(response => {

              this.tableData5 = [];
              for (let i of response.data) {


                if (i.StatusCode == '1') {
                  i.StatusCode = '已完成'
                } else if (i.StatusCode == '2') {
                  i.StatusCode = '待批准'
                } else if (i.StatusCode == '3') {
                  i.StatusCode = '进行中'
                } else if (i.StatusCode == '4') {
                  i.StatusCode = '被拒绝'
                }
                if (i.BeiZhu == null && i.BeiZhu == undefined) {
                  i.BeiZhu = ''
                }
                console.log(i.BeiZhu)
                this.tableData5.push(
                  {
                    shenqingshijian: i.ShenQingShiJian,
                    qishishijian: i.QiShiShiJian,
                    jieshushijian: i.JieShuShiJian,
                    siji: i.SiJi,
                    beizhu: i.BeiZhu,

                    cheliangxinghao: i.XingHao,
                    shenqingren: i.ShenQingRen,
                    shifadi: i.ChuFaDi,
                    mudidi: i.MuDiDi,
                    zhuangtai: i.StatusCode

                  }
                )

              }

              console.log(response.data)

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
      SearchVehicleExcel() {
        var date;
        var people;
        var car;
        if (this.time == '1') {
          date = 'all'
        } else if (this.time == '2') {
          if (this.date == '' || this.date == undefined || this.date == null) {
            date = 'all'
          } else if (this.date != '' && this.date != undefined && this.date != null) {
            var date1 = new Date(this.date[0]);
            var month1 = date1.getMonth() + 1;
            var strDate1 = date1.getDate();
            var strHours1 = date1.getHours();
            var strMinutes1 = date1.getMinutes();
            var strSeconds1 = date1.getSeconds();
            if (month1 >= 1 && month1 <= 9) {
              month1 = "0" + month1;
            }
            if (strDate1 >= 0 && strDate1 <= 9) {
              strDate1 = "0" + strDate1;
            }
            if (strHours1 >= 0 && strHours1 <= 9) {
              strHours1 = "0" + strHours1;
            }
            if (strMinutes1 >= 0 && strMinutes1 <= 9) {
              strMinutes1 = "0" + strMinutes1;
            }
            if (strSeconds1 >= 0 && strSeconds1 <= 9) {
              strSeconds1 = "0" + strSeconds1;
            }
            var date11 = date1.getFullYear() + '-' + month1 + '-' + strDate1 + ' '
              + strHours1 + ':' + strMinutes1 + ':' + strSeconds1;
            ///////////////////////////////////////////////////////////////////
            var date2 = new Date(this.date[1]);
            var month2 = date2.getMonth() + 1;
            var strDate2 = date2.getDate();
            var strHours2 = date2.getHours();
            var strMinutes2 = date2.getMinutes();
            var strSeconds2 = date2.getSeconds();
            if (month2 >= 1 && month2 <= 9) {
              month2 = "0" + month2;
            }
            if (strDate2 >= 0 && strDate2 <= 9) {
              strDate2 = "0" + strDate2;
            }
            if (strHours2 >= 0 && strHours2 <= 9) {
              strHours2 = "0" + strHours2;
            }
            if (strMinutes2 >= 0 && strMinutes2 <= 9) {
              strMinutes2 = "0" + strMinutes2;
            }
            if (strSeconds2 >= 0 && strSeconds2 <= 9) {
              strSeconds2 = "0" + strSeconds2;
            }
            var date22 = date2.getFullYear() + '-' + month2 + '-' + strDate2 + ' '
              + strHours2 + ':' + strMinutes2 + ':' + strSeconds2;
            date = date11 + '_' + date22
          }


        }

        if (this.people == '1') {
          people = 'all'
        } else if (this.people == '2') {
          if (this.people2 == '' || this.people2 == undefined || this.people2 == null) {
            people = 'all'
          } else if (this.people2 != '' && this.people2 != undefined && this.people2 != null) {
            people = this.people2
          }


        }


        if (this.car == '1') {
          car = 'all'
        } else if (this.car == '2') {
          if (this.car2 == '' || this.car2 == undefined || this.car2 == null) {
            car = 'all'
          } else if (this.car2 != '' && this.car2 != undefined && this.car2 != null) {
            car = this.car2
          }


        }

        Axios.get('http://127.0.0.1:8000/vehiclerecodeexcel', {
          headers: {
            'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
            'Content-Type': 'application/json'
          },
          params: {
            'key': date + '__' + people + '__' + car
          }

        },)
          .then(response => {

            window.open(response.data)
            //this.$router.push({path: 'http://127.0.0.1:8000/static/excel/1539658608.xlsx'})

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
      // handleCurrentChange(val) {
      //   console.log(`${val}`);
      //
      //
      //   Axios.get('http://127.0.0.1:8000/usecarnormal/?ordering=-application_date&shenqingren_userinfo='+storage.cookie.getCookie('user_id')+'&p='+ `${val}`  , {
      //     headers: {
      //       'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
      //       'Content-Type': 'application/json'
      //     }
      //   })
      //     .then(response => {
      //
      //
      //         for (let i of response.data) {
      //
      //
      //
      //           this.tableData5.push(
      //             {
      //               id:i.id,
      //               chufadi:i.chufadi,
      //               mudidi: i.mudidi,
      //               shenqingshijian: shenqingshijian,
      //               status_code:i.status_code,
      //               cheliangxinghao: i.carinfo.xinghao,
      //               siji: i.siji_userinfo.name,
      //               qishishijian: qishishijian,
      //               jieshushijian: jieshushijian,
      //             },
      //           )
      //
      //         }
      //
      //
      //
      //       }
      //     )
      //     .catch(error => {
      //       this.$message({
      //         message: "与服务器的通信受到了阻塞，请刷新页面",
      //         duration: 2000,
      //         type: "warning"
      //       });
      //     });
      // }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
