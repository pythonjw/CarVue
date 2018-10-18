<template>
    <div style="height: 100%" id="driver">
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
  import Head from '../common/MyHead'
  import Navigation from '../common/MyNavigation'

  import storage from '../../../model/storage'
    export default {
        name: "driver",
      data(){
          return{
            msg:"aaa"
          }
      },
      components: {
        'v-head': Head,
        'v-navigation': Navigation,

      },
      methods:{


      },

    }
</script>

<style scoped>

</style>
