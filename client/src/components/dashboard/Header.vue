<template>
  <header class="h-12 w-full flex z-400 items-start justify-between bg-gray-300 overflow-visible">
    <div class="left flex h-full w-full items-end">
      <div v-if="!showSearchBar && searchToggled" @click="searchToggled = false">
        <SquareButton icon="left-arrow" alt="" />
      </div>
      <div
        class="logo select-none flex justify-center items-center bg-primary-200 h-12 min-h-12 w-12 min-w-12"
        v-if="!searchToggled"
        :class="{ clickable: !isNestedRoute }"
        @click="isNestedRoute ? incrementSuperclass() : $router.go(-1)"
      >
        <img
          class="transition duration-100 ease hover:w-10 active:w-8"
          v-if="isNestedRoute"
          :src="require('@/assets/logos/logoHeader.svg')"
          alt="Xornet"
        />
        <Icon v-else icon="left-arrow" style="width: 24px; filter: invert(1);" />
      </div>

      <div class="buttons items-center flex overflow-hidden" v-if="!searchToggled">
        <SquareButton icon="repository" href="https://github.com/Geoxor/Xornet/releases" />
        <!-- <SquareButton icon="darkmode" @click="toggleDarkmode" /> -->
        <!-- <SquareButton icon="details" v-if="currentRoute == 'machines'" @click="isShowingDetails = !isShowingDetails" :isEnabled="isShowingDetails" /> -->
        <!-- <SquareButton icon="thick" v-if="currentRoute == 'machines' && thinButtons"/> -->
        <!-- <SquareButton icon="thin" v-if="currentRoute == 'machines' && !thinButtons"/> -->
      </div>
      <SquareButton v-if="!showSearchBar && !searchToggled" icon="search" @click="searchBTN()" />
      <SearchBar v-if="showSearchBar || searchToggled" @unClicked="searchToggled = false" :isFocused="searchToggled" />
    </div>

    <div class="account flex items-center content-center" v-if="!searchToggled">
      <SquareButton icon="logout" @click.native="logout" />

      <router-link class="w-8 h-8 max-w-8 max-h-8 m-2" :to="{ name: 'profile', params: { username } }">
        <img
          :src="
            profile?.profileImage?.url ??
              'https://cdn.discordapp.com/attachments/816028632269979668/855437868825444372/unknown.png'
          "
          class="profileImage select-none object-cover cursor-pointer rounded-lg"
          alt="profileImage"
        />
      </router-link>
    </div>
  </header>
</template>

<script>
import { isDark } from "@/services/theme.js";
import SquareButton from "@/components/dashboard/SquareButton";
import SearchBar from "@/components/dashboard/SearchBar";
import Icon from "@/components/misc/Icon";
import { appState } from "@/states/appState";

export default {
  name: "Header",
  components: {
    SquareButton,
    Icon,
    SearchBar
  },
  computed: {
    username() {
      return localStorage.getItem("username");
    },
    isNestedRoute() {
      return Object.values(this.$route.params)[0] == undefined || Object.values(this.$route.params)[0] === "";
    }
  },
  data: () => {
    return {
      profile: null,
      currentRoute: null,
      superclass: 0,
      searchToggled: false,
      showSearchBar: true,
      windowWidth: window.innerWidth
    };
  },
  async created() {
    this.profile = appState.getMe();
    this.currentRoute = this.$route.name;
    this.showSearchBar = this.windowWidth > 460;
  },
  methods: {
    incrementSuperclass() {
      this.superclass++;
      if (this.superclass % 10 == 9) {
        var superclass = new Audio(
          "https://cdn.discordapp.com/attachments/851974319370010655/854730571389730826/superclass.mp3"
        );
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

    searchBTN() {
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

<style lang="postcss" scoped>
.clickable {
  @apply cursor-pointer;
}
</style>
