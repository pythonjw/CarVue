import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from './components/pc/login/Login';
import Admin from './components/pc/admin/Admin';
import Driver from './components/pc/driver/Driver';
import Driver1 from './components/pc/driver/driver1';
import Driver2 from './components/pc/driver/driver2';
import Ordinary from './components/pc/ordinary/Ordinary';
import ApplyForVehicle from './components/pc/common/ApplyForVehicle';
import ApplicationResult from './components/pc/common/ApplicationResult';
import VehicleRecode from './components/pc/common/VehicleRecode';
import HandleApplication from './components/pc/common/HandleApplication';
import AddVehicle from './components/pc/common/AddVehicle';
import MemberManagement from './components/pc/common/MemberManagement';
import ElementUI from 'element-ui';
import EditVehicleDetail from './components/pc/common/EditVehicleDetail'
import EditVehicle from './components/pc/common/EditVehicle'
import Drivering from './components/pc/common/Drivering'
import VehicleSchedule from './components/pc/common/VehicleSchedule'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
Vue.use(ElementUI);
Vue.use(VueRouter);


const routes = [
  {path: '/login', component: Login},
  {
    path: '/admin', component: Admin,
    children: [
      {path: 'applyforvehicle', component: ApplyForVehicle},
      {path: 'vehiclerecode', component: VehicleRecode},
      {path: 'handleapplication', component: HandleApplication},
      {path: 'vehicleschedule', component: VehicleSchedule},
      //{path:'addvehicle',component:AddVehicle},

      {path: 'editvehicledetail', component: EditVehicleDetail},
      {path: 'addvehicle', component: AddVehicle},
      {path: 'editvehicle', component: EditVehicle},


      {path: 'membermanagement', component: MemberManagement},
    ]
  },
  {path: '/driver', component: Driver,
    children: [
      {path: 'drivering', component: Drivering},

    ]


  },
  {path: '/driver1', component: Driver1},
  {path: '/driver2', component: Driver2},
  {
    path: '/ordinary', component: Ordinary,
    children: [
      {path: 'applyforvehicle', component: ApplyForVehicle},
      {path: 'applicationresult', component: ApplicationResult},
      {path: 'vehiclerecode', component: VehicleRecode},
      {path: 'vehicleschedule', component: VehicleSchedule},
    ]
  },
  {path: '/', redirect: '/login'}
];
const router = new VueRouter({
  routes
});


new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
