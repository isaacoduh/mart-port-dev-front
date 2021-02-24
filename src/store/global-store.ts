import { make } from "vuex-pathify";

class GlobalStore {}

const state = new GlobalStore();

const mutations = make.mutations(state);

const actions = {};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
