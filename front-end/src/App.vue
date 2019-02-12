<template>
  <div id="app">
    <b-navbar toggleble="md" type="dark" variant="info">
      <!--b-navbar-toggle target="nav_collapse"></b-navbar-toggle-->
      <b-navbar-brand><h5><router-link to="/" class="router-link">Restaurant System</router-link></h5></b-navbar-brand>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
// import firebase from 'firebase'

export default {
  name: 'App',
  data () {
    return {}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.router-link:hover, .router-link {
  text-decoration: none;
  color: aliceblue;
}
</style>
