import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
var state = {
  ApplicationCount:0
};
var mutations = {
  ApplicationCountChange(state,data){
        state.ApplicationCount=data

  }
};

const store = new Vuex.Store({
  state,
  mutations
});

export default store;
