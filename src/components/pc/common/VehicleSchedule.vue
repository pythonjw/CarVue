<template>
    <div id="vehicleSchedule">

      <el-row>


        <el-col :span="9">


          <div>选择日期：</div>
          <div style="margin-top: 3%">
            <el-radio style="margin-left: 1%" v-model="time" label="1">

              <el-date-picker
                v-model="value6"
                type="daterange"

                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>

            </el-radio>



          </div>


        </el-col>
        <el-col :span="6">
          <div>
            选择车辆：
          </div>
          <div style="margin-top:4%">
            <el-radio style="margin-left: 1%" v-model="car" label="2">
              <el-select  v-model="car2" clearable placeholder="请选择">
                <el-option

                  v-for="item in cars"

                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </el-radio>
          </div>
        </el-col>
        <el-col :span="7">
          <el-button style="margin-top:9%" @click="SelectSchedule()"   type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 1%">
        <el-col :span="24">

          <el-table
            :data="tableData"
            v-if="tableFlag"
            border
            style="width: 100%">

            <el-table-column
              label="日期"
              prop="riqi"
              width="99px"
            >
            </el-table-column>
            <el-table-column
              label="08~09"
              prop="0809"

            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone0809D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone0809D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone0809D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone0809D[3] }}</p>
                  <p>出发地：{{ scope.row.zone0809D[4] }}</p>
                  <p>目的地：{{ scope.row.zone0809D[5] }}</p>
                  <p>司机：{{ scope.row.zone0809D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone0809" size="medium">{{ scope.row.zone0809D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>

            </el-table-column>
            <el-table-column
              label="09~10"
              prop="0910"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone0910D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone0910D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone0910D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone0910D[3] }}</p>
                  <p>出发地：{{ scope.row.zone0910D[4] }}</p>
                  <p>目的地：{{ scope.row.zone0910D[5] }}</p>
                  <p>司机：{{ scope.row.zone0910D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone0910" size="medium">{{ scope.row.zone0910D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="10~11"
              prop="1011"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone1011D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone1011D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone1011D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone1011D[3] }}</p>
                  <p>出发地：{{ scope.row.zone1011D[4] }}</p>
                  <p>目的地：{{ scope.row.zone1011D[5] }}</p>
                  <p>司机：{{ scope.row.zone1011D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone1011" size="medium">{{ scope.row.zone1011D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="11~12"
              prop="1112"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone1112D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone1112D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone1112D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone1112D[3] }}</p>
                  <p>出发地：{{ scope.row.zone1112D[4] }}</p>
                  <p>目的地：{{ scope.row.zone1112D[5] }}</p>
                  <p>司机：{{ scope.row.zone1112D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone1112" size="medium">{{ scope.row.zone1112D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="12~13"
              prop="1213"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone1213D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone1213D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone1213D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone1213D[3] }}</p>
                  <p>出发地：{{ scope.row.zone1213D[4] }}</p>
                  <p>目的地：{{ scope.row.zone1213D[5] }}</p>
                  <p>司机：{{ scope.row.zone1213D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone1213" size="medium">{{ scope.row.zone1213D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="13~14"
              prop="1314"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone1314D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone1314D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone1314D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone1314D[3] }}</p>
                  <p>出发地：{{ scope.row.zone1314D[4] }}</p>
                  <p>目的地：{{ scope.row.zone1314D[5] }}</p>
                  <p>司机：{{ scope.row.zone1314D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone1314" size="medium">{{ scope.row.zone1314D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="14~15"
              prop="1415"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone1415D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone1415D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone1415D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone1415D[3] }}</p>
                  <p>出发地：{{ scope.row.zone1415D[4] }}</p>
                  <p>目的地：{{ scope.row.zone1415D[5] }}</p>
                  <p>司机：{{ scope.row.zone1415D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone1415" size="medium">{{ scope.row.zone1415D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="15~16"
              prop="1516"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone1516D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone1516D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone1516D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone1516D[3] }}</p>
                  <p>出发地：{{ scope.row.zone1516D[4] }}</p>
                  <p>目的地：{{ scope.row.zone1516D[5] }}</p>
                  <p>司机：{{ scope.row.zone1516D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone1516" size="medium">{{ scope.row.zone1516D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="16~17"
              prop="1617"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone1617D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone1617D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone1617D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone1617D[3] }}</p>
                  <p>出发地：{{ scope.row.zone1617D[4] }}</p>
                  <p>目的地：{{ scope.row.zone1617D[5] }}</p>
                  <p>司机：{{ scope.row.zone1617D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone1617" size="medium">{{ scope.row.zone1617D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="17~18"
              prop="1718"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone1718D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone1718D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone1718D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone1718D[3] }}</p>
                  <p>出发地：{{ scope.row.zone1718D[4] }}</p>
                  <p>目的地：{{ scope.row.zone1718D[5] }}</p>
                  <p>司机：{{ scope.row.zone1718D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone1718" size="medium">{{ scope.row.zone1718D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="18~19"
              prop="1819"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone1819D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone1819D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone1819D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone1819D[3] }}</p>
                  <p>出发地：{{ scope.row.zone1819D[4] }}</p>
                  <p>目的地：{{ scope.row.zone1819D[5] }}</p>
                  <p>司机：{{ scope.row.zone1819D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone1819" size="medium">{{ scope.row.zone1819D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="19~20"
              prop="1920"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone1920D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone1920D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone1920D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone1920D[3] }}</p>
                  <p>出发地：{{ scope.row.zone1920D[4] }}</p>
                  <p>目的地：{{ scope.row.zone1920D[5] }}</p>
                  <p>司机：{{ scope.row.zone1920D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone1920" size="medium">{{ scope.row.zone1920D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="20~21"
              prop="2021"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态：{{ scope.row.zone2021D[0] }}</p>
                  <p>申请时间：{{ scope.row.zone2021D[1] }}</p>
                  <p>起始时间：{{ scope.row.zone2021D[2] }}</p>
                  <p>结束时间：{{ scope.row.zone2021D[3] }}</p>
                  <p>出发地：{{ scope.row.zone2021D[4] }}</p>
                  <p>目的地：{{ scope.row.zone2021D[5] }}</p>
                  <p>司机：{{ scope.row.zone2021D[6] }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-if="scope.row.zone2021" size="medium">{{ scope.row.zone2021D[7] }}</el-tag>
                  </div>
                </el-popover>
              </template>
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
    export default {

        name: "VehicleSchedule",
      mounted(){

        Axios.get('http://127.0.0.1:8000/carinfo/'  , {
          headers: {
            'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
            'Content-Type': 'application/json'
          }
        })
          .then(response => {


              for (let i of response.data) {
                this.cars.push(
                  {

                    label:i.xinghao,
                    value:i.id,
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
      methods:{
          test($index,row){
           alert($index,row)
          },
        SelectSchedule(){
          if (this.value6!=''&&this.car2!=''){
            this.tableFlag=true
            Axios.get('http://127.0.0.1:8000/vehiclescheduledjango', {
              headers: {
                'Authorization': 'JWT ' + storage.cookie.getCookie('UserToken'),
                'Content-Type': 'application/json'
              },
              params: {
                'key': this.value6 +'__'+this.car2
              }

            },)
              .then(response => {
                console.log(response.data)
                  this.tableData=[];
                for (let i of response.data.DateList){
                  this.tableData.push({
                    riqi:i,
                    zone0809:false,
                    zone0910:false,
                    zone1011:false,
                    zone1112:false,
                    zone1213:false,
                    zone1314:false,
                    zone1415:false,
                    zone1516:false,
                    zone1617:false,
                    zone1718:false,
                    zone1819:false,
                    zone1920:false,
                    zone2021:false,

                    zone0809D:[],
                    zone0910D:[],
                    zone1011D:[],
                    zone1112D:[],
                    zone1213D:[],
                    zone1314D:[],
                    zone1415D:[],
                    zone1516D:[],
                    zone1617D:[],
                    zone1718D:[],
                    zone1819D:[],
                    zone1920D:[],
                    zone2021D:[],

                  })
                }
                for (let i of response.data.event){
                  if(i[0]=='1'){
                    let ZoneData=[];
                    let ZoneDList=[];
                    let ZoneList=[];
                    ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);

                    let StartTimeHour=parseInt(i[3].substr(11,2));
                    let StopTimeHour=parseInt(i[4].substr(11,2));

                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                        ZoneDList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList){
                      this.tableData[0][i]=true;
                    }
                    for(let i of ZoneDList){
                      this.tableData[0][i]=ZoneData
                    }
                  }else if(i[0]=='2'){
                    let ZoneData=[];
                    let ZoneDList=[];
                    let ZoneList=[];
                    ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);

                    let StartTimeHour=8;
                    let StopTimeHour=parseInt(i[4].substr(11,2));

                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneDList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList){
                      this.tableData[0][i]=true;
                    }
                    for(let i of ZoneDList){
                      this.tableData[0][i]=ZoneData
                    }
                  }else if(i[0]=='3'){
                    let ZoneData=[];
                    let ZoneDList=[];
                    let ZoneList=[];
                    ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);

                    let StartTimeHour=8;
                    let StopTimeHour=21;

                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneDList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList){
                      this.tableData[0][i]=true;
                    }
                    for(let i of ZoneDList){
                      this.tableData[0][i]=ZoneData
                    }
                  }else if(i[0]=='4'){
                    let ZoneData=[];
                    let ZoneDList=[];
                    let ZoneList=[];
                    ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);

                    let StartTimeHour=parseInt(i[3].substr(11,2));
                    let StopTimeHour=21;

                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneDList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList){
                      this.tableData[0][i]=true;
                    }
                    for(let i of ZoneDList){
                      this.tableData[0][i]=ZoneData
                    }
                  }else if(i[0]=='5'){
                    let DateFlage=i[3].substr(0,10);

                    let IndexFlag=response.data.DateList.indexOf(DateFlage)

                    let ZoneData=[];
                    let ZoneDList=[];
                    let ZoneList=[];
                    ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);

                    let StartTimeHour=parseInt(i[3].substr(11,2));
                    let StopTimeHour=parseInt(i[4].substr(11,2));

                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneDList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList){
                      this.tableData[IndexFlag][i]=true;
                    }
                    for(let i of ZoneDList){
                      this.tableData[IndexFlag][i]=ZoneData
                    }
                  }else if(i[0]=='6'||i[0]=='9'||i[0]=='10'||i[0]=='11'){
                      let BeginDateFlag=i[3].substr(0,10);
                      let EndDateFlag=i[4].substr(0,10);
                      let BeginDateIndex=response.data.DateList.indexOf(BeginDateFlag);
                      let EndDateIndex=response.data.DateList.indexOf(EndDateFlag);
                      let ZoneData=[];

                      ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);
                      //////////////////
                      let StartTimeHour1=parseInt(i[3].substr(11,2));
                      let StopTimeHour1=21;
                      let ZoneDList1=[];
                      let ZoneList1=[];
                    for(let i=StartTimeHour1;i<StopTimeHour1;i++){
                      ZoneDList1.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour1;i<StopTimeHour1;i++){
                      ZoneList1.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList1){
                      this.tableData[BeginDateIndex][i]=true;
                    }
                    for(let i of ZoneDList1){
                      this.tableData[BeginDateIndex][i]=ZoneData
                    }
                    ///////////////////
                    let StartTimeHour2=8;
                    let StopTimeHour2=parseInt(i[4].substr(11,2));
                    let ZoneDList2=[];
                    let ZoneList2=[];
                    for(let i=StartTimeHour2;i<StopTimeHour2;i++){
                      ZoneDList2.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour2;i<StopTimeHour2;i++){
                      ZoneList2.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList2){
                      this.tableData[EndDateIndex][i]=true;
                    }
                    for(let i of ZoneDList2){
                      this.tableData[EndDateIndex][i]=ZoneData
                    }
                    /////////////////////
                    if (EndDateIndex-BeginDateIndex>1){
                      let MidDates=response.data.DateList.slice(BeginDateIndex+1,EndDateIndex)
                      let StartTimeHour3=8;
                      let StopTimeHour3=21;
                      let ZoneDList3=[];
                      let ZoneList3=[];
                      for(let i=StartTimeHour3;i<StopTimeHour3;i++){
                        ZoneDList3.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                      }
                      for(let i=StartTimeHour3;i<StopTimeHour3;i++){
                        ZoneList3.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                      }

                      for (let ii of MidDates){
                        for (let i of ZoneList3){
                          this.tableData[response.data.DateList.indexOf(ii)][i]=true;
                        }
                        for(let i of ZoneDList3){
                          this.tableData[response.data.DateList.indexOf(ii)][i]=ZoneData
                        }
                      }

                    }
                  }else if(i[0]=='7'){
                    let ZoneData=[];
                    let ZoneDList=[];
                    let ZoneList=[];
                    ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);

                    let StartTimeHour=8;
                    let StopTimeHour=parseInt(i[4].substr(11,2));

                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneDList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList){
                      this.tableData[0][i]=true;
                    }
                    for(let i of ZoneDList){
                      this.tableData[0][i]=ZoneData
                    }
                  }else if(i[0]=='8'){
                    let BeginDateFlag=response.data.beginDate;
                    let EndDateFlag=i[4].substr(0,10);
                    let BeginDateIndex=response.data.DateList.indexOf(BeginDateFlag);
                    let EndDateIndex=response.data.DateList.indexOf(EndDateFlag);
                    let ZoneData=[];

                    ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);
                    //////////////////
                    let StartTimeHour1=8;
                    let StopTimeHour1=21;
                    let ZoneDList1=[];
                    let ZoneList1=[];
                    for(let i=StartTimeHour1;i<StopTimeHour1;i++){
                      ZoneDList1.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour1;i<StopTimeHour1;i++){
                      ZoneList1.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList1){
                      this.tableData[BeginDateIndex][i]=true;
                    }
                    for(let i of ZoneDList1){
                      this.tableData[BeginDateIndex][i]=ZoneData
                    }
                    ///////////////////
                    let StartTimeHour2=8;
                    let StopTimeHour2=parseInt(i[4].substr(11,2));
                    let ZoneDList2=[];
                    let ZoneList2=[];
                    for(let i=StartTimeHour2;i<StopTimeHour2;i++){
                      ZoneDList2.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour2;i<StopTimeHour2;i++){
                      ZoneList2.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList2){
                      this.tableData[EndDateIndex][i]=true;
                    }
                    for(let i of ZoneDList2){
                      this.tableData[EndDateIndex][i]=ZoneData
                    }
                    /////////////////////
                    if (EndDateIndex-BeginDateIndex>1){
                      let MidDates=response.data.DateList.slice(BeginDateIndex+1,EndDateIndex)
                      let StartTimeHour3=8;
                      let StopTimeHour3=21;
                      let ZoneDList3=[];
                      let ZoneList3=[];
                      for(let i=StartTimeHour3;i<StopTimeHour3;i++){
                        ZoneDList3.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                      }
                      for(let i=StartTimeHour3;i<StopTimeHour3;i++){
                        ZoneList3.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                      }

                      for (let ii of MidDates){
                        for (let i of ZoneList3){
                          this.tableData[response.data.DateList.indexOf(ii)][i]=true;
                        }
                        for(let i of ZoneDList3){
                          this.tableData[response.data.DateList.indexOf(ii)][i]=ZoneData
                        }
                      }

                    }
                  }else if(i[0]=='12'){
                    let BeginDateFlag=i[3].substr(0,10);
                    let EndDateFlag=response.data.endDate;
                    let BeginDateIndex=response.data.DateList.indexOf(BeginDateFlag);
                    let EndDateIndex=response.data.DateList.indexOf(EndDateFlag);
                    let ZoneData=[];

                    ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);
                    //////////////////
                    let StartTimeHour1=parseInt(i[3].substr(11,2));
                    let StopTimeHour1=21;
                    let ZoneDList1=[];
                    let ZoneList1=[];
                    for(let i=StartTimeHour1;i<StopTimeHour1;i++){
                      ZoneDList1.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour1;i<StopTimeHour1;i++){
                      ZoneList1.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList1){
                      this.tableData[BeginDateIndex][i]=true;
                    }
                    for(let i of ZoneDList1){
                      this.tableData[BeginDateIndex][i]=ZoneData
                    }
                    ///////////////////
                    let StartTimeHour2=8;
                    let StopTimeHour2=21;
                    let ZoneDList2=[];
                    let ZoneList2=[];
                    for(let i=StartTimeHour2;i<StopTimeHour2;i++){
                      ZoneDList2.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour2;i<StopTimeHour2;i++){
                      ZoneList2.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList2){
                      this.tableData[EndDateIndex][i]=true;
                    }
                    for(let i of ZoneDList2){
                      this.tableData[EndDateIndex][i]=ZoneData
                    }
                    /////////////////////
                    if (EndDateIndex-BeginDateIndex>1){
                      let MidDates=response.data.DateList.slice(BeginDateIndex+1,EndDateIndex)
                      let StartTimeHour3=8;
                      let StopTimeHour3=21;
                      let ZoneDList3=[];
                      let ZoneList3=[];
                      for(let i=StartTimeHour3;i<StopTimeHour3;i++){
                        ZoneDList3.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                      }
                      for(let i=StartTimeHour3;i<StopTimeHour3;i++){
                        ZoneList3.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                      }

                      for (let ii of MidDates){
                        for (let i of ZoneList3){
                          this.tableData[response.data.DateList.indexOf(ii)][i]=true;
                        }
                        for(let i of ZoneDList3){
                          this.tableData[response.data.DateList.indexOf(ii)][i]=ZoneData
                        }
                      }

                    }
                  }else if(i[0]=='13'){
                    let ZoneData=[];
                    let ZoneDList=[];
                    let ZoneList=[];
                    ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);

                    let StartTimeHour=parseInt(i[3].substr(11,2));
                    let StopTimeHour=21;

                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneDList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour;i<StopTimeHour;i++){
                      ZoneList.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList){
                      this.tableData[response.data.DateList.length-1][i]=true;
                    }
                    for(let i of ZoneDList){
                      this.tableData[response.data.DateList.length-1][i]=ZoneData
                    }
                  }else if(i[0]=='14'){

                    let BeginDateFlag=response.data.beginDate;
                    let EndDateFlag=i[4].substr(0,10);

                    let BeginDateIndex=response.data.DateList.indexOf(BeginDateFlag);
                    let EndDateIndex=response.data.DateList.indexOf(EndDateFlag);
                    let ZoneData=[];

                    ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);
                    //////////////////
                    let StartTimeHour1=8;
                    let StopTimeHour1=21;
                    let ZoneDList1=[];
                    let ZoneList1=[];
                    for(let i=StartTimeHour1;i<StopTimeHour1;i++){
                      ZoneDList1.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour1;i<StopTimeHour1;i++){
                      ZoneList1.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList1){
                      this.tableData[BeginDateIndex][i]=true;
                    }
                    for(let i of ZoneDList1){
                      this.tableData[BeginDateIndex][i]=ZoneData
                    }
                    ///////////////////
                    let StartTimeHour2=8;
                    let StopTimeHour2=parseInt(i[4].substr(11,2));
                    let ZoneDList2=[];
                    let ZoneList2=[];
                    for(let i=StartTimeHour2;i<StopTimeHour2;i++){
                      ZoneDList2.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour2;i<StopTimeHour2;i++){
                      ZoneList2.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList2){
                      this.tableData[EndDateIndex][i]=true;
                    }
                    for(let i of ZoneDList2){
                      this.tableData[EndDateIndex][i]=ZoneData
                    }
                    /////////////////////
                    if (EndDateIndex-BeginDateIndex>1){
                      let MidDates=response.data.DateList.slice(BeginDateIndex+1,EndDateIndex)
                      let StartTimeHour3=8;
                      let StopTimeHour3=21;
                      let ZoneDList3=[];
                      let ZoneList3=[];
                      for(let i=StartTimeHour3;i<StopTimeHour3;i++){
                        ZoneDList3.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                      }
                      for(let i=StartTimeHour3;i<StopTimeHour3;i++){
                        ZoneList3.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                      }

                      for (let ii of MidDates){
                        for (let i of ZoneList3){
                          this.tableData[response.data.DateList.indexOf(ii)][i]=true;
                        }
                        for(let i of ZoneDList3){
                          this.tableData[response.data.DateList.indexOf(ii)][i]=ZoneData
                        }
                      }

                    }
                  }else if(i[0]=='15'){
                    let BeginDateFlag=response.data.beginDate;
                    let EndDateFlag=response.data.endDate;

                    let BeginDateIndex=response.data.DateList.indexOf(BeginDateFlag);
                    let EndDateIndex=response.data.DateList.indexOf(EndDateFlag);
                    let ZoneData=[];

                    ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);
                    //////////////////
                    let StartTimeHour1=8;
                    let StopTimeHour1=21;
                    let ZoneDList1=[];
                    let ZoneList1=[];
                    for(let i=StartTimeHour1;i<StopTimeHour1;i++){
                      ZoneDList1.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour1;i<StopTimeHour1;i++){
                      ZoneList1.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList1){
                      this.tableData[BeginDateIndex][i]=true;
                    }
                    for(let i of ZoneDList1){
                      this.tableData[BeginDateIndex][i]=ZoneData
                    }
                    ///////////////////
                    let StartTimeHour2=8;
                    let StopTimeHour2=21;
                    let ZoneDList2=[];
                    let ZoneList2=[];
                    for(let i=StartTimeHour2;i<StopTimeHour2;i++){
                      ZoneDList2.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour2;i<StopTimeHour2;i++){
                      ZoneList2.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList2){
                      this.tableData[EndDateIndex][i]=true;
                    }
                    for(let i of ZoneDList2){
                      this.tableData[EndDateIndex][i]=ZoneData
                    }
                    /////////////////////
                    if (EndDateIndex-BeginDateIndex>1){
                      let MidDates=response.data.DateList.slice(BeginDateIndex+1,EndDateIndex)
                      let StartTimeHour3=8;
                      let StopTimeHour3=21;
                      let ZoneDList3=[];
                      let ZoneList3=[];
                      for(let i=StartTimeHour3;i<StopTimeHour3;i++){
                        ZoneDList3.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                      }
                      for(let i=StartTimeHour3;i<StopTimeHour3;i++){
                        ZoneList3.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                      }

                      for (let ii of MidDates){
                        for (let i of ZoneList3){
                          this.tableData[response.data.DateList.indexOf(ii)][i]=true;
                        }
                        for(let i of ZoneDList3){
                          this.tableData[response.data.DateList.indexOf(ii)][i]=ZoneData
                        }
                      }

                    }
                  }else if(i[0]=='16'){
                    let BeginDateFlag=response.data.beginDate;
                    let EndDateFlag=response.data.endDate;

                    let BeginDateIndex=response.data.DateList.indexOf(BeginDateFlag);
                    let EndDateIndex=response.data.DateList.indexOf(EndDateFlag);
                    let ZoneData=[];

                    ZoneData.push(i[8],i[1],i[3],i[4],i[5],i[6],i[2],i[7]);
                    //////////////////
                    let StartTimeHour1=parseInt(i[3].substr(11,2));
                    let StopTimeHour1=21;
                    let ZoneDList1=[];
                    let ZoneList1=[];
                    for(let i=StartTimeHour1;i<StopTimeHour1;i++){
                      ZoneDList1.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour1;i<StopTimeHour1;i++){
                      ZoneList1.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList1){
                      this.tableData[BeginDateIndex][i]=true;
                    }
                    for(let i of ZoneDList1){
                      this.tableData[BeginDateIndex][i]=ZoneData
                    }
                    ///////////////////
                    let StartTimeHour2=8;
                    let StopTimeHour2=21;
                    let ZoneDList2=[];
                    let ZoneList2=[];
                    for(let i=StartTimeHour2;i<StopTimeHour2;i++){
                      ZoneDList2.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                    }
                    for(let i=StartTimeHour2;i<StopTimeHour2;i++){
                      ZoneList2.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                    }
                    for (let i of ZoneList2){
                      this.tableData[EndDateIndex][i]=true;
                    }
                    for(let i of ZoneDList2){
                      this.tableData[EndDateIndex][i]=ZoneData
                    }
                    /////////////////////
                    if (EndDateIndex-BeginDateIndex>1){
                      let MidDates=response.data.DateList.slice(BeginDateIndex+1,EndDateIndex)
                      let StartTimeHour3=8;
                      let StopTimeHour3=21;
                      let ZoneDList3=[];
                      let ZoneList3=[];
                      for(let i=StartTimeHour3;i<StopTimeHour3;i++){
                        ZoneDList3.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1)+'D')
                      }
                      for(let i=StartTimeHour3;i<StopTimeHour3;i++){
                        ZoneList3.push('zone'+storage.num9.add0(i)+storage.num9.add0(i+1))
                      }

                      for (let ii of MidDates){
                        for (let i of ZoneList3){
                          this.tableData[response.data.DateList.indexOf(ii)][i]=true;
                        }
                        for(let i of ZoneDList3){
                          this.tableData[response.data.DateList.indexOf(ii)][i]=ZoneData
                        }
                      }

                    }
                  }






                  // alert(storage.num9.add0('5'))

                }
                // console.log(this.tableData[0])
                  // this.tableData5=[];
                  // for (let i of response.data) {
                  //
                  //
                  //   if(i.StatusCode=='1'){
                  //     i.StatusCode='已完成'
                  //   }else if(i.StatusCode=='2'){
                  //     i.StatusCode='待批准'
                  //   }else if(i.StatusCode=='3'){
                  //     i.StatusCode='进行中'
                  //   }else if(i.StatusCode=='4'){
                  //     i.StatusCode='被拒绝'
                  //   }
                  //   if(i.BeiZhu==null&&i.BeiZhu==undefined){
                  //     i.BeiZhu=''
                  //   }
                  //   console.log(i.BeiZhu)
                  //   this.tableData5.push(
                  //     {
                  //       shenqingshijian:i.ShenQingShiJian,
                  //       qishishijian: i.QiShiShiJian,
                  //       jieshushijian: i.JieShuShiJian,
                  //       siji: i.SiJi,
                  //       beizhu: i.BeiZhu,
                  //
                  //       cheliangxinghao: i.XingHao,
                  //       shenqingren: i.ShenQingRen,
                  //       shifadi: i.ChuFaDi,
                  //       mudidi:i.MuDiDi,
                  //       zhuangtai:i.StatusCode
                  //
                  //     }
                  //   )
                  //
                  // }


                }
              )

              .catch(error => {


                this.$message({
                  message: "与服务器的通信受到了阻塞，请稍后重试",
                  duration: 2000,
                  type: "warning"
                });

              });
          }
          if (this.value6==''||this.car2==''){
            alert('日期和车辆是必填项！')
          }





        } ,
      },
      data(){
          return{
            tableFlag:false,
            tableData: [
              // {
              //   riqi:'2018-10-01',
              //   zone0809:false,
              //   zone0910:false,
              //   zone1011:false,
              //   zone1112:false,
              //   zone1213:false,
              //   zone1314:false,
              //   zone1415:false,
              //   zone1516:false,
              //   zone1617:false,
              //   zone1718:false,
              //   zone1819:false,
              //   zone1920:false,
              //   zone2021:true,
              //
              //   zone0809D:[],
              //   zone0910D:[],
              //   zone1011D:[],
              //   zone1112D:[],
              //   zone1213D:[],
              //   zone1314D:[],
              //   zone1415D:[],
              //   zone1516D:[],
              //   zone1617D:[],
              //   zone1718D:[],
              //   zone1819D:[],
              //   zone1920D:[],
              //   zone2021D:['A','B'],
              //
              // },
              // {
              //   riqi:'2018-10-02',
              //   zone0809:false,
              //   zone0910:false,
              //   zone1011:false,
              //   zone1112:false,
              //   zone1213:false,
              //   zone1314:false,
              //   zone1415:false,
              //   zone1516:false,
              //   zone1617:false,
              //   zone1718:false,
              //   zone1819:false,
              //   zone1920:false,
              //   zone2021:false,
              //
              //   zone0809D:[],
              //   zone0910D:[],
              //   zone1011D:[],
              //   zone1112D:[],
              //   zone1213D:[],
              //   zone1314D:[],
              //   zone1415D:[],
              //   zone1516D:[],
              //   zone1617D:[],
              //   zone1718D:[],
              //   zone1819D:[],
              //   zone1920D:[],
              //   zone2021D:[],
              // },
              // {
              //   riqi:'2018-10-03',
              //   zone0809:false,
              //   zone0910:false,
              //   zone1011:false,
              //   zone1112:false,
              //   zone1213:false,
              //   zone1314:false,
              //   zone1415:false,
              //   zone1516:false,
              //   zone1617:false,
              //   zone1718:false,
              //   zone1819:false,
              //   zone1920:false,
              //   zone2021:false,
              //
              //   zone0809D:[],
              //   zone0910D:[],
              //   zone1011D:[],
              //   zone1112D:[],
              //   zone1213D:[],
              //   zone1314D:[],
              //   zone1415D:[],
              //   zone1516D:[],
              //   zone1617D:[],
              //   zone1718D:[],
              //   zone1819D:[],
              //   zone1920D:[],
              //   zone2021D:[],
              // }

            ],
            value6: '',
            time:'1',
            car:'2',
            car2:'',
            cars: [
              // {
              //   value: '选项5',
              //   label: '北京烤鸭'
              // }
            ],
          }
      }
    }
</script>

<style scoped>

</style>
