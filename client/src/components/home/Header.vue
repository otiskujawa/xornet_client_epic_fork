<template>
  <header :class="route == 'home' ? 'view-home' : 'view-login'">
    <router-link :to="{ name: 'home' }">
      <img :src="route == 'home' ? require('@/assets/logos/logo.svg') : require('@/assets/logos/logo2.svg')" alt="Xornet" />
    </router-link>
    <div class="buttons">
      <router-link class="button" :to="{ name: 'home', params: { page: 'about' } }"> <img :src="require('@/assets/icons/details.svg')" alt="details" /> What is Xornet </router-link>
      <a class="button" href="https://github.com/Geoxor/Xornet" target="_blank"> <img :src="require('@/assets/icons/repository.svg')" alt="repository" /> Repository </a>
      <router-link class="button" :to="{ name: 'home', params: { page: 'downloads' } }"> <img :src="require('@/assets/icons/downloads.svg')" alt="downloads" /> Downloads </router-link>
      <router-link class="button" v-if="isLoggedIn" :to="{ name: 'machines' }"> <img :src="require('@/assets/icons/dashboard.svg')" alt="dash" /> Dashboard </router-link>
      <router-link class="button" v-if="!isLoggedIn" :to="{ name: 'login' }"> <img :src="require('@/assets/icons/login.svg')" alt="login" /> Login </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  components: {},
  computed: {
    isLoggedIn: function() {
      return localStorage.getItem("token") == null ? false : true;
    },
    route: function() {
      return this.$route.name;
    }
  }
};
</script>

<style scoped>
header {
  z-index: 1000;
  position: fixed;
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: var(--white); */
}
.view-home {
  padding: 8px 10vw;
}
.view-login {
  padding: 8px 4vw;
}
</style>
