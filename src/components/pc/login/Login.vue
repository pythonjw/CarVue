<template>
  <div id="login">


    <div id="login-child">
      <div id="login-son">车辆管理系统</div>
      <br>
      <div>
        <el-input
          style="font-size: 16px"
          placeholder="请输入账号"
          v-model="input10"
          clearable>
        </el-input>
      </div>
      <br>
      <div>
        <el-input
          type="password"
          style="font-size: 16px"
          placeholder="请输入密码"
          v-model="input11"
          clearable>
        </el-input>
      </div>
      <div>
        <el-checkbox style="color: white" v-model="ExemptLogin">未来7天免登录</el-checkbox>
      </div>

      <br>
      <div>
        <el-button @click="yanzheng_tijiao()" class="tijiao" type="primary">登陆</el-button>
      </div>
      <br>
      <div v-bind:style="{'display':flag1}" class="tishi">账号或者密码不能为空！</div>
      <div v-bind:style="{'display':flag2}" class="tishi">账号或者密码错误！</div>


    </div>
  </div>
</template>

<script>
  import store from '../../../vuex/store'
  import Axios from 'axios'
  import storage from '../../../model/storage'

  export default {
    name: "Login",
    store,
    data() {
      return {
        input10: '',
        input11: '',
        flag1: 'none',
        flag2: 'none',
        ExemptLogin: true,

      }
    },
    methods: {

      yanzheng_tijiao() {
        if (this.input10 == '' || this.input11 == '') {

          this.flag1 = '';
          this.flag2 = 'none';
        } else if (this.input10 != '' && this.input11 != '') {
          Axios.post('http://127.0.0.1:8000/login/', {
            username: this.input10,
            password: this.input11,
          })
            .then(response => {
                this.flag1 = 'none';
                this.flag2 = 'none';
                if (this.ExemptLogin==true){
                  storage.cookie.setCookie('UserToken', response.data.token,7);
                  storage.cookie.setCookie('UserName', this.input10,7);
                } else if(this.ExemptLogin==false){
                  storage.cookie.setCookie('UserToken', response.data.token);
                  storage.cookie.setCookie('UserName', this.input10);
                }
                Axios.get('http://127.0.0.1:8000/userinfo/?username=' + this.input10, {
                  headers: {
                    'Authorization': 'JWT ' + response.data.token
                  }
                })
                  .then(response => {
                    if (this.ExemptLogin==true){
                      storage.cookie.setCookie('User_Type', response.data[0].user_type,7);
                      storage.cookie.setCookie('user_id', response.data[0].id,7);
                      storage.cookie.setCookie('Name', response.data[0].name,7);
                    }else if (this.ExemptLogin==false){
                      storage.cookie.setCookie('User_Type', response.data[0].user_type);
                      storage.cookie.setCookie('user_id',response.data[0].id);
                      storage.cookie.setCookie('Name', response.data[0].name);
                    }

                      if (response.data[0].user_type == '1') {
                        this.$router.push({path: '/ordinary/applyforvehicle'})
                      } else if (response.data[0].user_type == '2') {
                        this.$router.push({path: '/admin/handleapplication'})
                      } else if (response.data[0].user_type == '3') {
                        this.$router.push({path: '/driver/drivering'})
                      }
                    }
                  )
                  .catch(error => {
                    console.log(error)
                  });


              }
            )
            .catch(error => {
              this.flag2 = '';
              this.flag1 = 'none';
            });

        }
      },

    },
    beforeCreate() {
      if (storage.cookie.getCookie('UserToken')) {
        if (storage.cookie.getCookie('User_Type') == '1') {
          this.$router.push({path: '/ordinary'})
        } else if (storage.cookie.getCookie('User_Type') == '2') {
          this.$router.push({path: '/admin'})
        } else if (storage.cookie.getCookie('User_Type') == '3') {
          this.$router.push({path: '/driver'})
        }
      }
    },
  }

</script>

<style scoped>
  .tishi {
    color: red;
  }

  #login {
    background-image: url("../../../assets/galaxy.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
  }

  #login-child {
    position: absolute;
    width: 24%;
    left: 38%;
    background-color: rgba(255, 255, 255, 0);
    height: 30%;
    top: 30%;

  }

  #login-son {
    color: white;
    text-align: center;
    font-size: 27px;
  }

</style>
