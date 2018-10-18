<template>
  <div style="height: 100%" id="ordinary">
    <div style="height: 25%;background-color: #34aff5">
      <v-head></v-head>
    </div>
    <div>
      <el-col :span="7">
        <v-navigation></v-navigation>
      </el-col>
      <el-col :span="17">
        <router-view></router-view>
      </el-col>
    </div>
  </div>
</template>

<script>
  import storage from '../../../model/storage'
  import store from '../../../vuex/store'
  import Axios from 'axios'
  import Head from '../common/MyHead'
  import Navigation from '../common/MyNavigation'



  export default {
    name: "ordinary",
    store,
    components: {
      'v-head': Head,
      'v-navigation': Navigation,

    },

    beforeCreate() {
      if (storage.cookie.getCookie('UserToken')){
        if(storage.cookie.getCookie('User_Type')!='1'){
          this.$router.push({path: '/login'})
        }
      }else {
        this.$router.push({path: '/login'})
      }
    },
  }
</script>

<style scoped>

</style>
