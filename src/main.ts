import Vue from "vue";
import App from "./App.vue";
Vue.prototype.$currentInfo = null;


new Vue({
  render: h => h(App),
  
}).$mount("#app");