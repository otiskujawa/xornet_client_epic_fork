<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>
  </div> -->
  <router-view/>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  background-color: #2B2D42;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav {
  padding: 30px;
  position: absolute;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

</style>
