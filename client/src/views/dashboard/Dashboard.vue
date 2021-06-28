<template>
  <div class="view bg-gray-200 dashboard flex items-start flex-col h-100vh">
    <LoadingScreen :isLoaded="!isLoading" />
    <Header v-if="!isLoading" />
    <div class="main">
      <Nav id="desktopNav" />
      <router-view></router-view>
    </div>
    <Nav id="mobileNav" />
  </div>
</template>

<script>
import ServerList from "@/components/dashboard/ServerList";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import Chart from "@/components/dashboard/Chart";
import Terminal from "@/components/dashboard/Terminal";
import Header from "@/components/dashboard/Header";
import Nav from "@/components/dashboard/Nav";

export default {
  name: "Dashboard",
  components: {
    Nav,
    Header,
    LoadingScreen
  },
  computed: {
    isLoading() {
      return false;
    }
  }
};
</script>

<style lang="postcss" scoped>
.main {
  @apply flex items-start w-full;
  height: calc(100vh - 48px);
}

@media only screen and (max-width: 600px) {
  .main {
    height: calc(100vh - 96px);
  }
}
</style>
