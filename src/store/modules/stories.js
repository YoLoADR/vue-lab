import http from "../../http-common";

const state = {
  stories: [],
  story : null,
  token: ""
};
const getters = {
  allStories: state => state.stories,
  selectedStory: state => state.story
};
const actions = {
  async fetchStories({ commit }, token) {
    const response = await http.get("/user-story", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    state.token = token;
    commit("setStories", response.data);
  },
  async fetchStory({ commit }, payload) {
    const response = await http.get(`/user-story/${payload._id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${payload.token}`
      }
    });
    commit("setStory", response.data);
  },
  async findByTitle({ commit }, title) {
    const response = await http.get(`/user-story?title=${title}`, {
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    });
    commit("searchStoryByTitle", response.data);
  },
  async addStory({ commit }, payload) {
    const data = {description : payload.description, title: payload.title}
    const response = await http.post("/user-story", data, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${payload.token}`
      }
    });
    commit("newStory", response.data);
  },
  async deleteStory({ commit }, payload) {
    await http.delete(`/user-story/${payload._id}`, {
      headers: {
        Authorization: `Bearer ${payload.token}`
      }
    });
    commit("removeStory", payload.id);
  },
  async updateStory({ commit }, updStory) {
    var data = {
        title: updStory.title,
        description: updStory.description,
        completed: updStory.completed
      };
      
    const response = await http.patch(`/user-story/${updStory._id}`, data, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${updStory.token}`
      }
    });
    commit("updateStory", response.data);
  },
  async deleteStories({ commit }, token) {
    await http.delete(`/user-story`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
  setToken: (state, newToken) => (state.token = newToken),
};
export default { state, getters, actions, mutations };
