import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions/actions'
import getters from './getters/getters'
import mutations from './mutations/mutations'

Vue.use(Vuex);

let store = new Vuex.Store({

    state: {
        note_list: []
    },

    mutations,
    actions,
    getters,
    
});

export default store;