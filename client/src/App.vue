<template>
  <router-view/>
</template>

<style>

:root {
  --background-color: #ffffff;
  --white: #f6f6f6;
  --black: #0B0B15;
  --dark: #151527;
  --dark-light: #0F0F1E;
  --dark-lighter: #252547;
  --slyColor: #414569;
  --rogue-red: #ffb1b1;
  --rogue-red-border: #ff0000;
  --rogue-red-active: #ff9999;
  --filter: 0;
}

* {
  margin: 0;
  padding: 0;
  font-family: 'Comfortaa', cursive;
  box-sizing: border-box;
}

html {
  overflow: hidden;
}

#app {
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

</style>