import constant from '../constant'

export default {
  data: {
    menus: []
  },
  actions: {
    getTestList: async ({commit, state}, params) => {
      debugger
      commit(constant.GET_MENU_LIST, [])
    }
  },
  mutations: {
    [constant.GET_MENU_LIST](state, data) {
     state.menus = data
    }
  }
}
