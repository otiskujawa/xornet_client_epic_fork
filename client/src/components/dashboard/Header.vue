<template>
  <header>
    <div class="logo">
      <img :src="require('@/assets/logos/logoHeader.svg')" alt="Xornet">
    </div>

    <div class="buttons">
        <router-link :to="{name: 'dashboard'}" class="button dashboard">
            <img :src="require('@/assets/icons/home.png')" alt="">
        </router-link>
        <a href="https://github.com/Geoxor/Xornet/releases" target="_blank" class="button">
            <img :src="require('@/assets/icons/repository.png')" alt="">
        </a>
        <div class="button" @click="toggleDarkmode()">
            <img :src="require('@/assets/icons/darkmode.png')" alt="">
        </div>
        <div class="button" @click="showDetails = !showDetails" :class="{enabled: showDetails}">
            <img :src="require('@/assets/icons/details.png')" alt="">
        </div>
        <!-- <div class="button" @click="showRogues = !showRogues" v-if="machines.some(machine => machine.rogue)" :class="{enabled: showRogues}">
            <img :src="require('@/assets/icons/rogue.svg')" alt="">
        </div> -->
        <div v-if="thinButtons" class="button" @click="thinButtons = false">
            <img :src="require('@/assets/icons/thick.png')" alt="">
        </div>
        <div v-if="!thinButtons" class="button" @click="thinButtons = true">
            <img :src="require('@/assets/icons/thin.png')" alt="">
        </div>
    </div>

    <div class="account">
      <div class="button" @click="logout">
          <img :src="require('@/assets/icons/logout.png')" alt="">
      </div>
      <router-link :to="{name: 'profile'}" >
        <img :src="profile?.profileImage"  class="profileImage" alt="profileImage">
      </router-link>
    </div>

  </header> 
</template>

<script>
export default {
  name: 'Header',
  components: {
  },
  computed: {
  },
  data: () => {
    return {
      profile: null,
    }
  },
  async created(){
    this.profile = await this.api.user.fetchMe();
  },
  mounted(){
  },
  methods: {
    logout(){
      function deleteAllCookies() {
          var cookies = document.cookie.split(";");

          for (var i = 0; i < cookies.length; i++) {
              var cookie = cookies[i];
              var eqPos = cookie.indexOf("=");
              var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }
      }

      deleteAllCookies();
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    toggleDarkmode(){
      if(!this.darkmode){

        // this switches the colors on the :root of the css to the darkmode variables

        document.documentElement.style.setProperty('--background-color', 'var(--darkmode-background-color)');
        document.documentElement.style.setProperty('--white',            'var(--darkmode-white)');
        document.documentElement.style.setProperty('--black',            'var(--darkmode-black)');
        document.documentElement.style.setProperty('--slyColor',         'var(--darkmode-slyColor)');
        document.documentElement.style.setProperty('--rogue-red',        'var(--darkmode-rogue-red)');
        document.documentElement.style.setProperty('--rogue-red-active', 'var(--darkmode-rogue-red-active)');
        document.documentElement.style.setProperty('--filter',           1);
        this.darkmode = true;
      } else {

        // im sure this can be improved by persisting initial colors on 
        // the :root as well and just switching between them instead of hardcoding this
        // kinda like how it does it above with the var(--);

        document.documentElement.style.setProperty('--background-color', '#fff');
        document.documentElement.style.setProperty('--white',            '#f6f6f6');
        document.documentElement.style.setProperty('--black',            '#000');
        document.documentElement.style.setProperty('--slyColor',         '#414569');
        document.documentElement.style.setProperty('--rogue-red',        '#ffeef0');
        document.documentElement.style.setProperty('--rogue-red-active', '#fdaeb7');
        document.documentElement.style.setProperty('--filter',           0);
        this.darkmode = false;
      }
    }
  }
}
</script>

<style scoped>


header {
  height: 48px;
  width: 100%;
  display: flex;
}

header .logo {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--theme-main);
  height: 48px;
  min-height: 48px;
  width: 48px;
  min-width: 48px;
}

header .buttons {
    width: 100%;
    align-items: center;
    display: flex;
}

header .button {
    padding: 16px;
    background-color: var(--background-color);
    box-sizing: border-box;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 48px;
    height: 48px;
    cursor: pointer;
    transition: 100ms ease;
    text-decoration: none;
    user-select: none;
}

header .button:hover {
    /* border: 1px solid var(--white); */
    transform: translateY(1px);
    box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;
}

header .button:active {
    transform: translateY(-0px);
}
header .button.enabled {
    filter: invert(1);
    /* background-color: var(--rogue-red-border); */
}

header .button img {
    width: 24px;
    height: 24px;
    filter: invert(var(--filter));
}

header .account {
  display: flex;
  align-items: center;
  margin-right: 8px;
  justify-content: center;

}

header .account img.profileImage {
  width: 32px;
  height: 32px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 8px
}


</style>

