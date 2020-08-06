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

import { mapActions } from "vuex";
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
    ...mapActions(["addStory"]),
    async saveStory() {
      const token = await this.$auth.getTokenSilently();
      var payload = {
        title: this.story.title,
        description: this.story.description,
        user: this.$auth.user,
        token
      };
      this.addStory(payload);
      this.submitted = true;
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