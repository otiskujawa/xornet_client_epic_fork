<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>
  </div> -->
  <router-view/>
</template>

<style>

:root {
  --black: #0B0B15;
  --dark: #151527;
  --dark-light: #0F0F1E;
  --dark-lighter: #252547;
  --white: #EDF2F4;
}

* {
  margin: 0;
  padding: 0;
  font-family: 'Comfortaa', cursive;
}

#app {
  background-color: var(--black);
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
  flex-direction: column;
  height: 100%;
  width: 100%;
}

</style>
