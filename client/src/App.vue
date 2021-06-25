<template>
  <div>
    <Popup />
    <router-view />
  </div>
</template>

<script>
import Popup from "@/components/misc/Popup";
export default {
  components: {
    Popup
  }
};
</script>
>

<style>
:root {
  /* Static colors that wont change */
  --dark: #0b0b15;
  --dark-light: #0f0f1e;
  --dark-lighter: #18182c;
  --rogue-red-border: #f85149;
  --theme-color: #8676ff;
  --bright-theme-color: #aca3f5;
  --terminal-background: #0b0b15;
  --green: #00ff6672;
  --blue: #4ADEFF;
  --blue-transparent: #4ADEFF44;

  /* Initial colors */
  --background-color: #0b0b15;
  --white: #0f0f1e;
  --black: #fff;
  --border-color: #26293f;
  --slyColor: #fff;
  --rogue-red: rgba(218, 54, 51, 0.2);
  --rogue-red-active: #8e1519;
  --gray: #c7c7c7;
  --shadowButton-color: #0f0f1e;
  --shadowColor: #8676ff50;

  /* Darkmode colors */
  --darkmode-background-color: #0b0b15;
  --darkmode-white: #0f0f1e;
  --darkmode-black: #fff;
  --darkmode-border-color: #26293f;
  --darkmode-slyColor: #fff;
  --darkmode-rogue-red: rgba(218, 54, 51, 0.2);
  --darkmode-rogue-red-active: #8e1519;
  --darkmode-gray: #c7c7c7;
  --darkmode-shadowButton-color: #0f0f1e;
  --darkmode-shadowColor: #8676ff50;

  /* This variable decides weither the images on the buttons will have their color inverted 
    it switches states if darkmode is on or off in serverList.vue */
  --filter: 1;
}

* {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
  text-decoration: none;
  color: var(--black);
}
*::-webkit-scrollbar {
  display: none;
}
* {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* *::selection {
  background: var(--black) !important;
  color: var(--white);
} */

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

@media only screen and (max-width: 600px) {
  #desktop {
    display: none;
  }
  #mobile {
    display: flex;
  }
}

@media only screen and (min-width: 600px) {
  #desktop {
    display: flex;
  }
  #mobile {
    display: none;
  }
}
</style>
