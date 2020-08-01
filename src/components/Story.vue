<template>
  <div v-if="currentStory" class="edit-form">
    <h4>Story</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentStory.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentStory.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentStory.completed ? "Completed" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentStory.completed"
      @click="updateCompleted(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updateCompleted(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="removeStory"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateSelectedStory"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Story...</p>
  </div>
</template>

<script>
import StoryDataService from "../services/StoryDataService";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "story",
  data() {
    return {
      currentStory: null,
      message: ''
    };
  },
  methods: {
    ...mapActions(["deleteStory", "updateStory", "fetchStory"]),
    getStory(id) {
      // TODO --> n'arrive pas à recupérer l'objet en cours via VUEX pattern
      console.log("id", id);
      // this.fetchStory(id)
      // this.currentStory = this.selectedStory;
      //
      StoryDataService.get(id)
        .then(response => {
          this.currentStory = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCompleted(status) {
      this.currentStory.completed = status;
      this.updateStory(this.currentStory);
    },

    updateSelectedStory() {
      this.updateStory(this.currentStory);
      this.$router.push({ name: "stories" });
    },

    removeStory() {
      this.deleteStory(this.currentStory._id)
      this.$router.push({ name: "stories" });
    }
  },
  computed: mapGetters(["selectedStory"]),
  mounted() {
    this.message = '';
    this.getStory(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>