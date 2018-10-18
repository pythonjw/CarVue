<template>
    <div id="drivering">
      <el-table

        :data="tableData"


        style="width: 100%">
        <el-table-column
          type="index"
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
          prop="shifadi"
          label="始发地"
        >
        </el-table-column>
        <el-table-column
          prop="mudidi"
          label="目的地"
        >
        </el-table-column>
        <el-table-column
          prop="xinghao"
          label="型号"
        >
        </el-table-column>
        <el-table-column
          prop="shenqingren"

          label="申请人"
        >
        </el-table-column>




        <!--@click="EditCar(scope.row)"-->
        <el-table-column label="操作" >
          <template slot-scope="scope">

            <el-button
              size="mini"
              type="primary"
              @click="DriverDone(scope.row,scope.$index, tableData)"

            >点击结束行程</el-button>
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
        name: "Drivering",
      mounted(){
        Axios.get('http://127.0.0.1:8000/usecarfordriver/?status_code=3&siji_userinfo='+storage.cookie.getCookie('user_id'), {
          headers: {
            'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
            'Content-Type': 'application/json'
          },

        },)
          .then(response => {
              this.tableData = [];
              for (let i of response.data) {
                i.using_time_start=i.using_time_start.replace('T',' ');
                i.using_time_stop=i.using_time_stop.replace('T',' ');

                this.tableData.push(
                  {
                    id:i.id,
                    qishishijian:i.using_time_start,
                    jieshushijian: i.using_time_stop,
                    shifadi: i.chufadi,
                    mudidi: i.mudidi,
                    xinghao: i.carinfo.xinghao,
                    shenqingren:i.shenqingren_userinfo.name

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
      },
      data(){
          return{
            tableData:[]
          }
      },
      methods:{
        DriverDone(row,index, rows){
          var data = Qs.stringify(
            {
              "status_code":'1'
            }
          );
          Axios.patch('http://127.0.0.1:8000/usecar/'+row.id+'/', data, {

            headers: {
              'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
              'Content-Type': 'application/x-www-form-urlencoded'
            },


          },)
            .then(response => {
                console.log(response.data)

                this.$message({
                  message: "已完成",
                  duration: 2000,
                  type: "success"
                });
                rows.splice(index, 1);

              }
            )

            .catch(error => {
              this.$message({
                message: "与服务器之间通信受到阻塞，请稍后再试",
                duration: 2000,
                type: "warning"
              });


            });

        },
        deleteRow(index, rows) {
          rows.splice(index, 1);
        },



      },

    }
</script>

<style scoped>

</style>
