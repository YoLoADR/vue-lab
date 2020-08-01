<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="findByTitle(title)"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Stories List Vuex</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(story, index) in allStories"
          :key="index"
          @click="setActiveStory(story, index)"
        >
          {{ story.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllStories">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentStory">
        <h4>Story</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentStory.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentStory.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentStory.completed ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/stories/' + currentStory._id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Story...</p>
      </div>
    </div>
  </div>
</template>

<script>
import StoryDataService from "../services/StoryDataService";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "stories-list",
  data() {
    return {
      stories: [],
      currentStory: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    ...mapActions(["fetchStories", "findByTitle"]),

    refreshList() {
      this.fetchStories();
      this.currentStory = null;
      this.currentIndex = -1;
    },

    setActiveStory(story, index) {
      console.log("story",story)
      this.currentStory = story;
      this.currentIndex = index;
    },

    removeAllStories() {
      StoryDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  computed: mapGetters(["allStories"]),
  created() {
    this.fetchStories();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>