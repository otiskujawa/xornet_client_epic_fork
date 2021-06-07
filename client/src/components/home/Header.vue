<template>
  <header :class="route == 'home' ? 'view-home' : 'view-login'">
    <router-link :to="{ name: 'home' }">
      <img :src="route == 'home' ? require('@/assets/logos/logo.svg') : require('@/assets/logos/logo2.svg')" alt="Xornet" />
    </router-link>
    <div class="buttons">
      <router-link class="button" :to="{ name: 'home', params: { page: 'about' } }"> <Icon icon="details" /> What is Xornet </router-link>
      <a class="button" href="https://github.com/Geoxor/Xornet" target="_blank"> <Icon icon="repository" /> Repository </a>
      <router-link class="button" :to="{ name: 'home', params: { page: 'downloads' } }"> <Icon icon="downloads" /> Downloads </router-link>
      <router-link class="button" v-if="isLoggedIn" :to="{ name: 'machines' }"> <Icon icon="dashboard" /> Dashboard </router-link>
      <router-link class="button" v-if="!isLoggedIn" :to="{ name: 'login' }"> <Icon icon="login" /> Login </router-link>
    </div>
  </header>
</template>

<script>
import Icon from "@/components/misc/Icon";
export default {
  name: "Header",
  components: {
    Icon
  },
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

header .buttons {
  display: flex;
  height: 100%;
  gap: 8px;
}
header .buttons .button {
  color: white;
  border: none;
  background-color: #4361ee;
  width: min-content;
  padding: 4px 12px;
  border-radius: 4px;

  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  line-height: 175%;
  transition: 100ms ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
header .buttons .button:hover {
  box-shadow: 0px 4px 12px #4361ee80;
  transform: translateY(-1px);
}
header .buttons .button:active {
  transform: translateY(1px);
}
header .buttons .button img {
  filter: invert(1);
  width: 24px;
  height: 24px;
}
.view-home {
  padding: 8px 10vw;
}
.view-login {
  padding: 8px 4vw;
}
</style>
