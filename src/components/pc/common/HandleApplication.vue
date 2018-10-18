<template>


  <div id="handleApplication">

    <el-table
      :data="tableData5"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="出发地：">
              <span>{{ props.row.chufadi }}</span>
            </el-form-item>
            <el-form-item label="目的地：">
              <span>{{ props.row.mudidi }}</span>
            </el-form-item>
            <el-form-item label="申请时间：">
              <span>{{ props.row.shenqingshijian }}</span>
            </el-form-item>
            <el-form-item label="备注：">
              <span>{{ props.row.beizhu }}</span>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="申请人"
        prop="shenqingren"
        width="100px"
      >
      </el-table-column>
      <el-table-column
        label="车辆型号"
        prop="cheliangxinghao"
        width="180px"
      >
      </el-table-column>
      <el-table-column
        label="司机"
        prop="siji"
        width="120px"
      >
      </el-table-column>
      <el-table-column
        label="起始时间"
        prop="qishishijian"
      >
      </el-table-column>
      <el-table-column
        label="结束时间"
        prop="jieshushijian"
      >
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="AgreeApplication(scope.row,scope.$index, tableData5)"

          >同意
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="RefuseApplication(scope.row,scope.$index, tableData5)"

          >拒绝
          </el-button>
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
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {
    name: "HandleApplication",
    mounted() {
      Axios.get('http://127.0.0.1:8000/usecar/?status_code=2', {
        headers: {
          'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
          'Content-Type': 'application/json'
        }
      })
        .then(response => {

            for (let i of response.data) {
              var shenqingshijian;
              var qishishijian;
              var jieshushijian;
              shenqingshijian = i.application_date.substr(0, 10) + ' ' + i.application_date.substr(11, 8);
              qishishijian = i.using_time_start.substr(0, 10) + ' ' + i.using_time_start.substr(11, 8);
              jieshushijian = i.using_time_stop.substr(0, 10) + ' ' + i.using_time_stop.substr(11, 8);
              console.log(response.data)
              this.tableData5.push(
                {
                  id: i.id,
                  chufadi: i.chufadi,
                  mudidi: i.mudidi,
                  shenqingshijian: shenqingshijian,
                  beizhu: i.beizhu,
                  shenqingren: i.shenqingren_userinfo.name,
                  cheliangxinghao: i.carinfo.xinghao,
                  siji: i.siji_userinfo.name,
                  qishishijian: qishishijian,
                  jieshushijian: jieshushijian,
                },
              )

            }


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
    data() {
      return {
        tableData5: [
          //   {
          //   chufadi: '12987122',
          //   mudidi: '好滋好味鸡蛋仔',
          //   shenqingshijian: '江浙小吃、小吃零食',
          //   beizhu: '荷兰优质淡奶，奶香浓而不腻',
          //   shenqingren: '上海市普陀区真北路',
          //   cheliangxinghao: '王小虎夫妻店',
          //   siji: '王小虎夫妻店',
          //   qishishijian: '王小虎夫妻店',
          //   jieshushijian: '王小虎夫妻店',
          // },

        ]
      }
    },
    methods: {

      AgreeApplication(row, index, rows) {
        rows.splice(index, 1);
        this.$message({
          message: "已同意！",
          duration: 2000,
          type: "success"
        });
        Axios.get('http://127.0.0.1:8000/agreeapply', {
          headers: {
            'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
            'Content-Type': 'application/json'
          },
          params: {
            'key': row.id
          }

        },)
          .then(response => {

            }
          )

          .catch(error => {


            this.$message({
              message: "因网络问题，您的决裁未成功，请刷新页面后重试！",
              duration: 2000,
              type: "warning"
            });

          });


      },
      RefuseApplication(row, index, rows) {
        rows.splice(index, 1);
        this.$message({
          message: "已拒绝！",
          duration: 2000,
          type: "error"
        });
        Axios.get('http://127.0.0.1:8000/disagreeapply', {
          headers: {
            'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
            'Content-Type': 'application/json'
          },
          params: {
            'key': row.id
          }

        },)
          .then(response => {

            }
          )

          .catch(error => {


            this.$message({
              message: "因网络问题，您的决裁未成功，请刷新页面后重试！",
              duration: 2000,
              type: "warning"
            });

          });



      }
    },

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
