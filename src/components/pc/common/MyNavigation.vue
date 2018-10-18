<template>
  <div id="mynavigation">
    <el-menu
      :default-active="ActiveFlag"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="4" v-if="this.flag4" @click="HandleApplication()">
        <i class="el-icon-message"></i>

        <span slot="title">处理申请


        </span>
      </el-menu-item>
      <el-menu-item index="1" v-if="this.flag1" @click="ApplyForVehicle()">
        <i class="el-icon-star-off"></i>
        <span slot="title">申请车辆</span>
      </el-menu-item>
      <el-menu-item index="8" v-if="this.flag8" @click="VehicleSchedule()">
        <i class="el-icon-search"></i>
        <span slot="title">车辆日程</span>
      </el-menu-item>
      <el-menu-item index="2" v-if="this.flag2" @click="ApplicationResult()">
        <i class="el-icon-time"></i>
        <span slot="title">申请结果</span>
      </el-menu-item>

      <el-menu-item index="3" v-if="this.flag3" @click="VehicleRecode()">
        <i class="el-icon-tickets"></i>
        <span slot="title">用车记录</span>
      </el-menu-item>


      <el-submenu index="5" v-if="this.flag5" >
        <template slot="title"><i class="el-icon-circle-plus-outline"></i>车辆管理</template>
        <el-menu-item @click="AddVehicle" index="5-1">添加车辆</el-menu-item>
        <el-menu-item @click="EditVehicle" index="5-2">修改/删除车辆</el-menu-item>
      </el-submenu>

      <el-menu-item index="6" v-if="this.flag6" @click="MemberManagement()">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">成员管理</span>
      </el-menu-item>
      <el-menu-item index="7" v-if="this.flag7" @click="Drivering()">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">进行中的行程</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import storage from '../../../model/storage'

  export default {
    name: "mynavigation",
    data() {
      return {
        ActiveFlag:'',
        flag1: true,
        flag2: true,
        flag3: true,
        flag4: true,
        flag5: true,
        flag6: true,
        flag7:false,
        flag8:true,
      }
    },

    methods: {

      EditVehicle(){

        this.$router.push({path: '/admin/editvehicle'})
      },
      AddVehicle(){

        this.$router.push({path: '/admin/addvehicle'})
      },
      handleOpen(key, keyPath) {

        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      HandleApplication() {
        this.$router.push({path: '/admin/handleapplication'})
      },

      MemberManagement() {
        this.$router.push({path: '/admin/membermanagement'})
      },
      Drivering(){
        this.$router.push({path: '/driver/drivering'})
      },
      VehicleSchedule(){
        if (storage.cookie.getCookie('User_Type') == 1) {
          this.$router.push({path: '/ordinary/vehicleschedule'})
        } else if (storage.cookie.getCookie('User_Type') == 2) {
          this.$router.push({path: '/admin/vehicleschedule'})
        }
      },
      ApplyForVehicle() {
        if (storage.cookie.getCookie('User_Type') == 1) {
          this.$router.push({path: '/ordinary/applyforvehicle'})
        } else if (storage.cookie.getCookie('User_Type') == 2) {
          this.$router.push({path: '/admin/applyforvehicle'})
        }
      },
      VehicleRecode() {
        // if (storage.cookie.getCookie('User_Type') == 1) {
        //   this.$router.push({path: '/ordinary/vehiclerecode'})
        // } else if (storage.cookie.getCookie('User_Type') == 2) {
        //   this.$router.push({path: '/admin/vehiclerecode'})
        // }

        this.$router.push({path: '/admin/vehiclerecode'})


      },
      ApplicationResult() {
        this.$router.push({path: '/ordinary/applicationresult'})
      }
    },
    mounted() {
      if (storage.cookie.getCookie('User_Type') != '2') {
        this.flag3 = false;
        this.flag4 = false;
        this.flag5 = false;
        this.flag6 = false;
      }
      if (storage.cookie.getCookie('User_Type') != '1') {
        this.flag2 = false;
      }
      if(storage.cookie.getCookie('User_Type') == '3'){
        this.flag1 = false;
        this.flag7=true;
        this,flag8=false;
      }

    }

  }
</script>

<style scoped>

</style>
