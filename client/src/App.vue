<template>
  <router-view/>
</template>

<script>
export default {
  created() {
    if (!localStorage.settings) localStorage.setItem('settings', JSON.stringify({
      darkmode: false
    }));
  }
}
</script>

<style>

:root {

  /* Static colors that wont change */
  --dark: #151527;
  --dark-light: #0F0F1E;
  --dark-lighter: #252547;
  --rogue-red-border: #f85149;
  --terminal-background: #0B0B15;

  /* Initial colors */
  --background-color: #ffffff;
  --white: #f6f6f6;
  --black: #0B0B15;
  --slyColor: #414569;
  --rogue-red: #ffeef0;
  --rogue-red-active:#fdaeb7;
    
  /* Darkmode colors */
  --darkmode-background-color: #0B0B15;
  --darkmode-white:#0F0F1E;
  --darkmode-black:#fff;
  --darkmode-slyColor: #fff;
  --darkmode-rogue-red: rgba(218, 54, 51, 0.2);
  --darkmode-rogue-red-active: #8e1519;

 /* This variable decides weither the images on the buttons will have their color inverted 
    it switches states if darkmode is on or off in serverList.vue */
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