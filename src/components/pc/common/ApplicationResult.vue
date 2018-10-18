<template>



  <div id="applicationResult">

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
            <el-form-item label="司机：">
              <span>{{ props.row.siji }}</span>
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
        label="起始时间"
        prop="qishishijian"
      >
      </el-table-column>
      <el-table-column
        label="结束时间"
        prop="jieshushijian"
      >
      </el-table-column>
      <el-table-column
        label="申请结果"
        prop="status_code"
      >
      </el-table-column>
    </el-table>


    <el-pagination
      style="
     margin-top: 1%;

"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total=PageCount>
    </el-pagination>





  </div>
</template>

<script>
  import * as qiniu from 'qiniu-js'
  import store from '../../../vuex/store'
  import Axios from 'axios'
  import storage from '../../../model/storage'
  import Qs from 'qs'

  export default {
    name: "ApplicationResult",
    mounted(){
      this.tableData5=[];
      Axios.get('http://127.0.0.1:8000/usecarnormal/?ordering=-application_date&shenqingren_userinfo='+storage.cookie.getCookie('user_id')   , {
        headers: {
          'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
          'Content-Type': 'application/json'
        }
      })
        .then(response => {

          console.log(response.data.results)
          this.PageCount=response.data.count
            for (let i of response.data.results) {
              var shenqingshijian;
              var qishishijian;
              var jieshushijian;
              shenqingshijian=i.application_date.substr(0,10)+' '+i.application_date.substr(11,8);
              qishishijian=i.using_time_start.substr(0,10)+' '+i.using_time_start.substr(11,8);
              jieshushijian=i.using_time_stop.substr(0,10)+' '+i.using_time_stop.substr(11,8);
              if (i.status_code=='1'){
                i.status_code='已同意'
              } else if(i.status_code=='2'){
                i.status_code='待审批'
              } else if(i.status_code=='3'){
                i.status_code='已同意'
              } else if(i.status_code=='4'){
                i.status_code='被拒绝'
              }



              this.tableData5.push(
                {
                  id:i.id,
                  chufadi:i.chufadi,
                  mudidi: i.mudidi,
                  shenqingshijian: shenqingshijian,
                  status_code:i.status_code,
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
            message: "与服务器的通信受到了阻塞，请刷新页面",
            duration: 2000,
            type: "warning"
          });
        });
    },
    data() {
      return {
        PageCount:'',
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
    methods:{
      handleCurrentChange(val) {
        console.log(`${val}`);


        Axios.get('http://127.0.0.1:8000/usecarnormal/?ordering=-application_date&shenqingren_userinfo='+storage.cookie.getCookie('user_id')+'&p='+ `${val}`  , {
          headers: {
            'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
            'Content-Type': 'application/json'
          }
        })
          .then(response => {

              console.log(response.data.results)
              this.PageCount=response.data.count
              for (let i of response.data.results) {
                var shenqingshijian;
                var qishishijian;
                var jieshushijian;
                shenqingshijian=i.application_date.substr(0,10)+' '+i.application_date.substr(11,8);
                qishishijian=i.using_time_start.substr(0,10)+' '+i.using_time_start.substr(11,8);
                jieshushijian=i.using_time_stop.substr(0,10)+' '+i.using_time_stop.substr(11,8);
                if (i.status_code=='1'){
                  i.status_code='已同意'
                } else if(i.status_code=='2'){
                  i.status_code='待审批'
                } else if(i.status_code=='3'){
                  i.status_code='已同意'
                } else if(i.status_code=='4'){
                  i.status_code='被拒绝'
                }



                this.tableData5.push(
                  {
                    id:i.id,
                    chufadi:i.chufadi,
                    mudidi: i.mudidi,
                    shenqingshijian: shenqingshijian,
                    status_code:i.status_code,
                    cheliangxinghao: i.carinfo.xinghao,
                    siji: i.siji_userinfo.name,
                    qishishijian: qishishijian,
                    jieshushijian: jieshushijian,
                  },
                )

              }

              this.tableData5.splice(0,2)

            }
          )
          .catch(error => {
            this.$message({
              message: "与服务器的通信受到了阻塞，请刷新页面",
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
