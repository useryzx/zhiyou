import vuex from "vuex";
import Vue from "vue";

Vue.use(vuex);

import state from "./state.js";
import mutations from "./mutations.js";
import actions from "./actions.js"


const store = new vuex.Store({
    state,
    mutations,
    actions
});


export default store;