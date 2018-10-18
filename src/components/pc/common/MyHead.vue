<template>
    <div id="myhead">
    <div>
      欢迎,{{msg}}

      <a style="color: black" href="#" @click="Logout()">注销</a>
    </div>

      <h1>车辆管理系统</h1>
    </div>
</template>

<script>
  import storage from '../../../model/storage'
    export default {
        name: "myhead",
      data(){
          return{
            msg:storage.cookie.getCookie('Name')
          }
      },
      methods:{
          Logout(){
            storage.cookie.delCookie('UserName');
            storage.cookie.delCookie('Name');
            storage.cookie.delCookie('Id');
            storage.cookie.delCookie('Department');
            storage.cookie.delCookie('UserToken');
            storage.cookie.delCookie('User_Type');
            this.$router.push({path:'/login'})
          }
      }
    }

</script>

<style scoped>

</style>
