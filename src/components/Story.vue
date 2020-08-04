<template>
  <div v-if="selectedStory" class="edit-form">
    <h4>Story</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="selectedStory.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="selectedStory.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ selectedStory.completed ? "Completed" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="selectedStory.completed"
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

import { mapActions, mapGetters } from "vuex";

export default {
  name: "story",
  data() {
    return {
      currentStory: null,
      message: '',
    };
  },
  methods: {
    ...mapActions(["deleteStory", "updateStory","fetchStory"]),
    async getStory(_id) {
      const token = await this.$auth.getTokenSilently();
      let payload = {
        token,
        _id
      }
      this.fetchStory(payload);
    },

    async updateCompleted(status) {
      const token = await this.$auth.getTokenSilently();
      this.selectedStory.completed = status;
      this.selectedStory.token = token;
      this.updateStory(this.selectedStory);
    },

   async updateSelectedStory() {
      this.selectedStory.token = await this.$auth.getTokenSilently();
      this.updateStory(this.selectedStory);
      this.$router.push({ name: "stories" });
    },
  

   async removeStory() {
      console.log("this.currentStory._id",this.$route.params.id);
      const token = await this.$auth.getTokenSilently();
      var data = {
        _id: this.$route.params.id,
        token
      };
      this.deleteStory(data)
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