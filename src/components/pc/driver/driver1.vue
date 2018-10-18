<template>
  <div id="driver1">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"

        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="08~09"

      >
      </el-table-column>
    </el-table>

    <button @click="test()">test</button>
  </div>
</template>

<script>
  import store from '../../../vuex/store'
  import storage from '../../../model/storage'
  export default {
    name: "driver1",
    store,
    data() {
      return {
        a:['a','b','c']
      }
    },
    methods: {
        test(){
          for(let ii of [1,2,3]){
            for(let i of [4,5,6]){
              console.log(ii)
            }
          }
        }

      }



  }
</script>

<style scoped>

</style>
