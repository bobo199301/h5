import Vue from 'vue'
import Vuex from 'vuex'
import testStore from './module/testStore'

let mutations = Object.assign(testStore.mutations)
let actions = Object.assign(testStore.actions)
Vue.use(Vuex)

export default new Vuex.Store({
    state: {...testStore.data},
    actions,
    mutations
})
