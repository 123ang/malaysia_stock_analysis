import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

    isLoggedIn: false,
    Email: false,
    language: "",
    StockCode: "",
    TradeRecord: "",

  },
  getters: {
    
  },
  mutations: {
    IsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },

    Email(state, data) {
      state.Email = data;
    },
    language(state,data) {
      state.language = data
    },
    StockCode(state,data) {
      state.StockCode = data
    },
    TradeRecord(state,data) {
      state.TradeRecord = data
    },
   
  },
  actions: {

  },
  plugins: [new VuexPersistence().plugin]

})
export default store