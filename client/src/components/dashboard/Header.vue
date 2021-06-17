<template>
  <header>
    <div class="left">
      <div v-if="!showSearchBar && searchToggled" @click="searchToggled = false;" >
        <SquareButton icon="left-arrow" alt="" />
      </div>
      <div class="logo" v-if="!searchToggled" :class="{clickable: !isNestedRoute}" @click="isNestedRoute ? incrementSuperclass() : $router.go(-1);">
        <img v-if="isNestedRoute" :src="require('@/assets/logos/logoHeader.svg')" alt="Xornet"/>
        <Icon v-else icon="left-arrow" style="width: 24px; filter: invert(1);"/>
      </div>

      <div class="buttons" v-if="!searchToggled">
        <SquareButton icon="repository" href="https://github.com/Geoxor/Xornet/releases" />
        <SquareButton icon="darkmode" @click="toggleDarkmode" />
        <!-- <SquareButton icon="details" v-if="currentRoute == 'machines'" @click="isShowingDetails = !isShowingDetails" :isEnabled="isShowingDetails" /> -->
        <!-- <SquareButton icon="thick" v-if="currentRoute == 'machines' && thinButtons"/> -->
        <!-- <SquareButton icon="thin" v-if="currentRoute == 'machines' && !thinButtons"/> -->
      </div>
      <SquareButton v-if="(!showSearchBar && !searchToggled)" icon="search" @click="searchBTN()" />
      <SearchBar v-if="showSearchBar || searchToggled" @unClicked="searchToggled = false;" :isFocused="searchToggled"/>
    </div>

    <div class="account" v-if="!searchToggled">
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
import Icon from "@/components/misc/Icon";

export default {
  name: "Header",
  components: {
    SquareButton,
    Icon,
    SearchBar
  },
  computed: {
    username: function() {
      return localStorage.getItem("username");
    },
    isNestedRoute: function(){
      return Object.values(this.$route.params)[0] == undefined || Object.values(this.$route.params)[0] === '';
    }
  },
  data: () => {
    return {
      profile: null,
      currentRoute: null,
      superclass: 0,
      searchToggled: false,
      showSearchBar: true,
      windowWidth: window.innerWidth,
    };
  },
  async created() {
    this.profile = await this.api.user.fetchMe();
    this.currentRoute = this.$route.name;
    this.showSearchBar = (this.windowWidth > 460);
  },
  methods: {
    incrementSuperclass(){
      this.superclass++;
      if (this.superclass % 10 == 9){
        var superclass = new Audio('https://cdn.discordapp.com/attachments/851974319370010655/854730571389730826/superclass.mp3');
        superclass.play();
      }
    },
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
    },

    searchBTN(){
      this.searchToggled = true;
      //console.log(this.$refs.SearchBarRef.$el)
    }
  },
  watch: {
    $route(to, from) {
      if (to.name) this.currentRoute = to.name;
      console.log(Object.values(this.$route.params)[0]);
    }
  }
};
</script>

<style scoped>
header {
  height: 48px;
  width: 100%;
  display: flex;
  z-index: 400;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--background-color);
  overflow: visible;
}


header .left {
  display: flex;
  width: 100%;
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
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--theme-color);
  height: 48px;
  min-height: 48px;
  width: 48px;
  border-radius: 0px 0px 8px 0px;
  min-width: 48px;
}

header .logo img { transition: 100ms ease; }
header .logo img:hover { width: 40px; }
header .logo img:active { width: 32px; }
header .button.enabled { filter: invert(1); }

header .button img {
  width: 24px;
  height: 24px;
  filter: invert(var(--filter));
}

header .buttons {
  align-items: center;
  display: flex;
  border-radius: 0px 0px 0px 8px;
  overflow: hidden;
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
  user-select: none;
  object-fit: cover;
  cursor: pointer;
  border-radius: 8px;
}
header .clickable {
  cursor: pointer;
}

</style>
