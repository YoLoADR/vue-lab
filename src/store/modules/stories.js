import http from "../../http-common";

const state = {
  stories: [],
  story : {
    id: null,
    title: "",
    description: "",
    completed: false
  }
};
const getters = {
  allStories: state => state.stories,
};
const actions = {
  async fetchStories({ commit }) {
    const response = await http.get("/user-story");
    commit("setStories", response.data);
  },
  async fetchStory({ commit }, _id) {
    const response = await http.get(`/user-story/${_id}`);
    commit("setStory", response.data);
  },
  async findByTitle({ commit }, title) {
    const response = await http.get(`/user-story?title=${title}`);
    commit("searchStoryByTitle", response.data);
  },
};
const mutations = {
  setStories: (state, stories) => (state.stories = stories),
  setStory: (state, story) => (state.story = story),
  searchStoryByTitle: (state, stories) => (state.stories = stories),
};
export default { state, getters, actions, mutations };
