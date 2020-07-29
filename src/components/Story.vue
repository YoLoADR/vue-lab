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
      @click="deleteStory"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateStory"
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

export default {
  name: "story",
  data() {
    return {
      currentStory: null,
      message: ''
    };
  },
  methods: {
    getStory(id) {
      console.log("id", id);
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
      var data = {
        title: this.currentStory.title,
        description: this.currentStory.description,
        completed: status
      };

      StoryDataService.update(this.currentStory._id, data)
        .then(response => {
          this.currentStory.completed = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateStory() {
      var {title, description , completed} = this.currentStory;
      StoryDataService.update(this.currentStory._id, {
        title, description, completed
      })
        .then(response => {
          console.log(response.data);
          this.message = 'The story was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteStory() {
      StoryDataService.delete(this.currentStory._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "stories" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
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