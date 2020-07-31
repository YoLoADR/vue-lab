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
  async addStory({ commit }, data) {
    const response = await http.post("/user-story", data);
    commit("newStory", response.data);
  },
  async deleteStory({ commit }, _id) {
    await http.delete(`/user-story/${_id}`);
    commit("removeStory", _id);
  },
};
const mutations = {
  setStories: (state, stories) => (state.stories = stories),
  setStory: (state, story) => (state.story = story),
  searchStoryByTitle: (state, stories) => (state.stories = stories),
  newStory: (state, story) => state.stories.unshift(story),
  removeStory: (state, _id) =>
    (state.stories = state.stories.filter(story => story._id !== _id)),
};
export default { state, getters, actions, mutations };
