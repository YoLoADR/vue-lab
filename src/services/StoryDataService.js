import http from "../http-common";

class StoryDataService {
  getAll() {
    return http.get("/user-story");
  }

  get(id) {
    return http.get(`/user-story/${id}`);
  }

  create(data) {
    return http.post("/user-story", data);
  }

  update(id, data) {
    console.log("update data", data);
    console.log("update id", id);
    return http.patch(`/user-story/${id}`, data);
  }

  delete(id) {
    return http.delete(`/user-story/${id}`);
  }

  deleteAll() {
    return http.delete(`/user-story`);
  }
  findByTitle(title) {
    return http.get(`/user-story?title=${title}`);
  }
}

export default new StoryDataService();