import http from "../../http-common";

const state = {
  stories: []
};
const getters = {
  allStories: state => state.stories
};
const actions = {
  async fetchStories({ commit }) {
    const response = await http.get("/user-story");
    commit("setStories", response.data);
  },
};
const mutations = {
  setStories: (state, stories) => (state.stories = stories),
};
export default { state, getters, actions, mutations };
