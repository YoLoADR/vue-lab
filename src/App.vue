<template>
  <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a href="/" class="nav-link">Home</a>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" v-if="$auth.isAuthenticated" to="/stories">Stories</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" v-if="$auth.isAuthenticated" to="/add">Add</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" v-if="$auth.isAuthenticated" to="/profile">Profile</router-link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mt-3">
            <router-view />
      </div>
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>


