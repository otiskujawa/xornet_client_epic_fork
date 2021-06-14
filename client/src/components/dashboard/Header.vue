<template>
  <header>
    <div class="left">
      <div class="logo">
        <img :src="require('@/assets/logos/logoHeader.svg')" alt="Xornet" />
      </div>

      <div class="buttons">
        <SquareButton icon="repository" href="https://github.com/Geoxor/Xornet/releases" />
        <SquareButton icon="darkmode" @click="toggleDarkmode" />
        <!-- <SquareButton icon="details" v-if="currentRoute == 'machines'" @click="isShowingDetails = !isShowingDetails" :isEnabled="isShowingDetails" /> -->
        <!-- <SquareButton icon="thick" v-if="currentRoute == 'machines' && thinButtons"/> -->
        <!-- <SquareButton icon="thin" v-if="currentRoute == 'machines' && !thinButtons"/> -->
      </div>

      <SearchBar />
    </div>

    <div class="account">
      <SquareButton icon="logout" @click.native="logout" />

      <router-link :to="{ name: 'profile', params: { username } }">
        <img :src="profile?.profileImage?.url" class="profileImage" alt="profileImage" />
      </router-link>
    </div>
  </header>
</template>

<script>
import { isDark } from "@/services/theme.js";
import SquareButton from "@/components/dashboard/SquareButton";
import SearchBar from "@/components/dashboard/SearchBar";

export default {
  name: "Header",
  components: {
    SquareButton,
    SearchBar
  },
  computed: {
    username: function() {
      return localStorage.getItem("username");
    }
  },
  data: () => {
    return {
      profile: null,
      currentRoute: null
    };
  },
  async created() {
    this.profile = await this.api.user.fetchMe();
    this.currentRoute = this.$route.name;
  },
  methods: {
    logout() {
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
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    toggleDarkmode() {
      isDark.value = !isDark.value;
    }
  },
  watch: {
    $route(to, from) {
      if (to.name) this.currentRoute = to.name;
    }
  }
};
</script>

<style scoped>
header {
  height: 48px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--background-color);
  overflow: visible;
}

header .left {
  display: flex;
  align-items: flex-start;
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

header .logo {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--theme-color);
  height: 48px;
  min-height: 48px;
  width: 48px;
  min-width: 48px;
}

header .button.enabled {
  filter: invert(1);
}

header .button img {
  width: 24px;
  height: 24px;
  filter: invert(var(--filter));
}

header .buttons {
  align-items: center;
  display: flex;
}

header .account {
  display: flex;
  align-items: center;
  justify-content: center;
}

header .account a {
  width: 32px;
  height: 32px;
  margin: 8px;
}

header .account img.profileImage {
  width: 32px;
  height: 32px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 8px;
}
</style>
