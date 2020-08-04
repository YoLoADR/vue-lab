import http from "../../http-common";

const state = {
  stories: [],
  story : null
};
const getters = {
  allStories: state => state.stories,
  selectedStory: state => state.story
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
  async updateStory({ commit }, updStory) {
    var data = {
        title: updStory.title,
        description: updStory.description,
        completed: updStory.completed
      };
    const response = await http.patch(`/user-story/${updStory._id}`, data);
    commit("updateStory", response.data);
  },
  async deleteStories({ commit }) {
    await http.delete(`/user-story`);
    commit("removeStories", []);
  },
};
const mutations = {
  setStories: (state, stories) => (state.stories = stories),
  setStory: (state, story) => state.story = story,
  searchStoryByTitle: (state, stories) => (state.stories = stories),
  newStory: (state, story) => state.stories.unshift(story),
  updateStory: (state, updStory) => {
    const index = state.stories.findIndex(story => story._id == updStory._id);
    if (index !== -1) {
      state.stories.splice(index, 1, updStory);
    }
  },
  removeStory: (state, _id) =>
    (state.stories = state.stories.filter(story => story._id !== _id)),
  removeStories: (state, stories) => (state.stories = stories),
};
export default { state, getters, actions, mutations };
