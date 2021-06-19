<template>
  <header :class="route == 'home' ? 'view-home' : 'view-login'">
    <router-link :to="{ name: 'home' }" class="logoWrapper">
      <img :src="route == 'home' ? require('@/assets/logos/logo.svg') : require('@/assets/logos/logo2.svg')" alt="Xornet" />
    </router-link>
    <div class="buttons">
      <router-link class="button" :to="{ name: 'home', params: { page: 'about' } }">
        <Icon icon="details" />
        <p>What is Xornet</p>
      </router-link>
      <a class="button" href="https://github.com/Geoxor/Xornet" target="_blank">
        <Icon icon="repository" />
        <p>Repository</p>
      </a>
      <router-link class="button" :to="{ name: 'downloads' }">
        <Icon icon="downloads" />
        <p>Downloads</p>
      </router-link>
      <router-link class="button" v-if="isLoggedIn" :to="{ name: 'machines' }">
        <Icon icon="dashboard" />
        <p>Dashboard</p>
      </router-link>
      <router-link class="button" v-if="!isLoggedIn" :to="{ name: 'login' }">
        <Icon icon="login" />
        <p>Login</p>
      </router-link>
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
}
header.view-home {
  padding: 8px 4vw;
}
header.view-login {
  padding: 8px 4vw;
}
header .buttons {
  display: flex;
  height: 100%;
  gap: 8px;
}
header .buttons .button {
  border: none;
  background-color: var(--theme-color);
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: 100ms ease;
  align-items: center;
  gap: 8px;
  display: flex;
}
header .buttons .button:hover {
  box-shadow: 0px 4px 12px var(--theme-color);
  transform: translateY(-1px);
}
header .buttons .button:active {
  transform: translateY(1px);
}

header .logoWrapper {
  height: 20px;
}

header .buttons .button img {
  filter: invert(1);
  width: 24px;
  height: 24px;
}

header .buttons .button p {
  color: white;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 175%;
  white-space: nowrap;
}

@media only screen and (max-width: 768px) {
  header.view-home {
    padding: 8px;
  }
  header .buttons .button p {
    display: none;
  }
}
</style>
