<template>
  <header>
    <div class="logo">
      <img :src="require('@/assets/logos/logoHeader.svg')" alt="Xornet" />
    </div>

    <div class="buttons">
      <SquareButton icon="repository" href="https://github.com/Geoxor/Xornet/releases"/>
      <SquareButton icon="darkmode" @click="toggleDarkmode"/>
      <SquareButton icon="details" @click="isShowingDetails = !isShowingDetails" :enabled="isShowingDetails"/>
      <SquareButton icon="thick" @click="thinButtons = false" v-if="thinButtons"/>
      <SquareButton icon="thin" @click="thinButtons = true" v-if="!thinButtons"/>
    </div>

    <div class="account">
      <SquareButton icon="logout" @click.native="logout"/>

      <router-link :to="{ name: 'profile', params: { username } }">
        <img :src="profile?.profileImage?.url" class="profileImage" alt="profileImage" />
      </router-link>
    </div>
  </header>
</template>

<script>
import { isDark } from "@/services/theme.js";
import SquareButton from '@/components/dashboard/SquareButton';

export default {
  name: "Header",
  components: {
    SquareButton,
  },
  computed: {
    username: function() {
      return localStorage.getItem("username");
    }
  },
  data: () => {
    return {
      profile: null
    };
  },
  async created() {
    this.profile = await this.api.user.fetchMe();
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
  }
};
</script>

<style scoped>
header {
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
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

header .buttons {
  width: 100%;
  align-items: center;
  display: flex;
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
  border-radius: 8px;
}
</style>
