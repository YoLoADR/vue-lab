<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="story.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="story.description"
          name="description"
        />
      </div>

      <button @click="saveStory" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newStory">Add</button>
    </div>
  </div>
</template>

<script>
import StoryDataService from "../services/StoryDataService";

export default {
  name: "add-story",
  data() {
    return {
      story: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveStory() {
      var data = {
        title: this.story.title,
        description: this.story.description
      };

      StoryDataService.create(data)
        .then(response => {
          this.story.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newStory() {
      this.submitted = false;
      this.story = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>