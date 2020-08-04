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
                <a href="/stories" class="nav-link">Stories</a>
              </li>
              <li class="nav-item">
                <a href="/add" class="nav-link">Add</a>
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

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'

export default {
  name: 'App',
}
</script>


