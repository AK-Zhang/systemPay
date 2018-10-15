/**
 * Created by kevin.si on 2017/6/7.
 */
import $ajax from '../../utils/fetch'
const user = {
  state: {
    info: {"accountBalance":"123"}, // 用于保存用户信息
    idInfo: {}, // 用于保存用户认证信息
    // accountBalance:'11111',
    accountBalance:'',
  },

  mutations: {
    SET_USER_INFO: (state, info) => {
      state.info = info
    },
    SET_ID_INFO: (state, info) => {
      state.idInfo = info
    }
    
  },

  actions: {
    setUserInfo ({commit}, info) {
      commit('SET_USER_INFO', info)
    },
    loginBySession ({commit, state, dispatch}) {
      return new Promise((resolve, reject) => {
        $ajax.get('/customer/profile', data => {
          dispatch('setUserInfo', data)
          resolve(data)
        }, err => {
          reject(err)
        })
      })
    },
    setIdInfo ({commit}, info) {
      commit('SET_ID_INFO', info)
    },
  }
}

export default user
