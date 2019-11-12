// 定义一个state
const state = {
  // 初始化数据
  nm: window.localStorage.getItem('nowNm') || '北京', // 本地存储了就用本地的，否则用 || 后面的
  id: window.localStorage.getItem('nowId') || 1 // 从本地存储会得到字符串
};
const actions = {

};
const mutations = {
  // 修改状态的方法 方法名大写，表示状态管理的方法
  // payload 传过来的载荷
  CITY_INFO(state, payload){
    state.nm = payload.nm;
    state.id = payload.id;
  }
};
export default {
  namespaced: true,
  state, // 挂载一下
  actions,
  mutations
}